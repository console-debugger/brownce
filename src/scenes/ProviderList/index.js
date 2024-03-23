import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  SearchInput,
  Touchable,
  MyImage,
  MyText,
  Loader,
  TouchableIcon,
  Button,
  LoaderSearch,
  EmptyMessage,
  CustomModal,
  CustomSlider,
  MultiSelectDropdown,
  CustomDropDown,
  RatingWithLabel1,
  ShowStarRating,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BLACK, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors';
import { mapPin, chatIcon, smallStar, filterIcon } from '../../components/icons';
import { FlatList, Modal, ScrollView } from 'react-native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { isIOS, logAnalyticEvent, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper';
import { useFocusEffect } from '@react-navigation/native';
import {
  loaderAction,
  getProviderListAction,
  SearchloaderAction,
  clearMessageCase,
  getFilterPriceListAction,
  getAllCityListAction,
  getAllServicesAction,
} from '../../redux/action/index';
import { apiKey } from '../../services/serviceConstant';
import { GET_PROVIDER_LIST_SUCCESS_ACTION } from '../../redux/action/type';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../services/serviceConfig';
import { getCurrentLocation } from '../../components/geolocation';
import { CUSTOMER_SEARCH_PROVIDER } from '../../components/eventName';

const MAX_FILTER_DISTANCE = 100
let timeout


// Provider list UI
const ProviderList = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { AVAILABLE, BOOK_NOW, APPLY, DISTANCE, PRICE, SERVICE, CITY } = state['localeReducer']['locale'];
  const { loading, searchloading } = state['loaderReducer'];
  const { profile } = state['profileReducer'];

  const selectedMultipleServicesRef = useRef([])
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState('');
  const [filterModal, setFilterModal] = useState(false)
  const [filterDistance, setFilteredDistance] = useState(MAX_FILTER_DISTANCE / 2)
  const [selectedMultipleServices, setSelectedMultipleServices] = useState([])
  const [filterPriceList, setFilterPriceList] = useState([])
  const [servicesList, setServicesList] = useState([])
  const [rating, setRating] = useState(0)
  const [selectedPrice, setSelectedPrice] = useState('')
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })
  const [footerIndicator, setFooterIndicator] = useState(false)

  const paginationOffset = useRef(1)
  const callNextRecordStatus = useRef(true)
  const isCallNextApi = useRef(true)

  useFocusEffect(
    useCallback(() => {
      isIOS ? _fetchLoaction() : _fetchLoactionAndroid()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (profile?.UserId) {
        const data = {
          id: profile?.UserId,
          name: profile?.Name || '',
          username: profile?.Username || ''
        }
        logAnalyticEvent(CUSTOMER_SEARCH_PROVIDER, data)
      }
    }, [profile])
  )

  const _fetchLoactionAndroid = () => {
    getCurrentLocation().then(resp => {
      if (resp.status) {
        setCoordinates(prevState => ({ ...prevState, latitude: resp.payload.latitude, longitude: resp.payload.longitude }))
      }
      else alert(resp.payload.message || resp.payload)
    }).catch(er => console.log('Error while access location', er))
  }

  const _fetchLoaction = async () => {
    const hasLocationPermission = await Geolocation.requestAuthorization('always')
    if (hasLocationPermission == 'denied' || hasLocationPermission == 'disabled' || hasLocationPermission == 'restricted') {
      return
    }
    Geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        }
        setCoordinates(prevState => ({ ...prevState, latitude: location.latitude, longitude: location.longitude }))
      },
      (error) => {
        console.log('error', error['message'])
      },
      { timeout: 20000, maximumAge: 10000 }
    )
  }

  // useEffect(() => {
  //   if (messageCase === GET_PROVIDER_LIST_SUCCESS_ACTION) {
  //     if (providerlist?.data?.length) {
  //       isCallNextApi.current = false
  //       callNextRecordStatus.current = false
  //     }
  //     else {
  //       isCallNextApi.current = true
  //       callNextRecordStatus.current = true
  //       console.log('paginationOffset.current==>', paginationOffset.current)
  //       paginationOffset.current == 1 ? setdata(providerlist['Data']) : setdata(prevState => [...prevState, ...providerlist['Data']])
  //     }
  //     dispatch(clearMessageCase());
  //   }
  // }, [messageCase]);

  // useEffect(() => {
  //   let formdata = new FormData();
  //   formdata.append(apiKey['searchString'], search ? search : '');
  //   formdata.append(apiKey['pageNo'], '1');
  //   formdata.append(apiKey['pageSize'], '6');
  //   search ? dispatch(SearchloaderAction(true)) : _handle;
  //   dispatch(getProviderListAction(formdata));
  // }, [search]);

  useFocusEffect(
    useCallback(() => {
      paginationOffset.current = 1
      _fetchList(1)
    }, []),
  );

  useEffect(() => {
    fetchFilterData()
  }, []);

  const _fetchList = (pageOffset = paginationOffset.current, searchText = search) => {
    dispatch(clearMessageCase());
    const formdata = new FormData();
    formdata.append(apiKey['searchString'], searchText);
    formdata.append(apiKey['pageNo'], pageOffset);
    formdata.append(apiKey['pageSize'], 20);
    coordinates.latitude && formdata.append('latitude', coordinates.latitude);
    coordinates.longitude && formdata.append('longitude', coordinates.longitude);
    formdata.append('Location', '');
    selectedMultipleServices?.length && formdata.append('serviceIds', selectedMultipleServices)
    selectedPrice && formdata.append('prices', [selectedPrice])
    rating && formdata.append('rating', rating)
    filterDistance && formdata.append('distance', filterDistance)
    console.log('param-<>', formdata)
    searchText ? dispatch(SearchloaderAction(true)) : _handle;
    dispatch(getProviderListAction(formdata, result => {
      console.log('result===>0', result)
      if (result) {
        paginationOffset.current == 1 ? setdata(result?.Data || []) : setdata(prevState => [...prevState, ...result?.Data])
        if (!result?.Data?.length) {
          isCallNextApi.current = false
          callNextRecordStatus.current = false
        }
        else {
          isCallNextApi.current = true
          callNextRecordStatus.current = true
          console.log('paginationOffset.current==>', paginationOffset.current)
        }
      }
    }));
  }

  const fetchFilterData = () => {
    dispatch(getAllServicesAction(result => {
      if (result) {
        setServicesList(result)
      }
      else setServicesList([])
    }))
    dispatch(getFilterPriceListAction(result => {
      console.log('result=>', result)
      if (result) {
        setFilterPriceList(result)
      }
      else setFilterPriceList([])
    }))
  }

  const _search = (value) => {
    paginationOffset.current = 1
    setsearch(value);
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      _fetchList(1, value)
    }, 500);

  };

  const _handle = () => {
    dispatch(loaderAction(true));
    dispatch(SearchloaderAction(false));
  };

  const openFilterModal = () => setFilterModal(true)

  const closeFilterModal = () => setFilterModal(false)

  const _onSlidingComplete = value => setFilteredDistance(value)

  const _onSliderChange = value => setFilteredDistance(value)

  const _renderEmpty = () => {
    if (!loading) {
      return (
        <EmptyMessage
          style={{ marginVertical: SCREEN_HEIGHT * 0.3 }}
          message={'No Provider Found.'}
        />
      );
    } else return <EmptyMessage message={''} />;
  };

  const _keyExtractor = (item, index) => item + index;

  const _seperator = () => <MyView style={styles['seperator']} />;

  const _onEndReached = () => {
    console.log('callNextRecordStatus.current==>', callNextRecordStatus.current, isCallNextApi.current)
    if (callNextRecordStatus.current && isCallNextApi.current) {
      callNextRecordStatus.current = false
      paginationOffset.current++
      setFooterIndicator(true)
      _fetchList()
    }
  }

  const clearAllFilter = () => {
    paginationOffset.current = 1
    callNextRecordStatus.current = true
    isCallNextApi.current = true
    setSelectedMultipleServices([])
    selectedMultipleServicesRef.current = []
    setRating(0)
    setFilteredDistance(MAX_FILTER_DISTANCE / 2)
    setCoordinates({ latitude: 0, longitude: 0 })
    setSelectedPrice('')
    _handle()
    const formdata = new FormData();
    formdata.append(apiKey['searchString'], search);
    formdata.append(apiKey['pageNo'], 1);
    formdata.append(apiKey['pageSize'], 20);
    console.log('formdata=======>', formdata)
    dispatch(getProviderListAction(formdata, result => {
      console.log('result===>', result)
      if (result) {
        if (!result?.Data?.length) {
          isCallNextApi.current = false
          callNextRecordStatus.current = false
        }
        else {
          isCallNextApi.current = true
          callNextRecordStatus.current = true
          console.log('paginationOffset.current==>', paginationOffset.current)
          paginationOffset.current == 1 ? setdata(result?.Data || []) : setdata(prevState => [...prevState, ...result?.Data])
        }
      }
    }));
  }

  const _getSelectedServicesItem = data => {
    setSelectedMultipleServices(data)
  }

  const _applyFilter = () => {
    closeFilterModal()
    paginationOffset.current = 1
    isCallNextApi.current = true
    callNextRecordStatus.current = true
    _fetchList(1, search)
  }

  const _getRating = rate => {
    setRating(rate)
  }

  const _selectPrice = item => () => {
    setSelectedPrice(item.Id)
  }

  const getPlaceDetail = (data, detail) => {
    setCoordinates(prevState => ({ ...prevState, latitude: detail?.geometry?.location?.lat, longitude: detail?.geometry?.location?.lng }))
  }

  const _renderItem = ({ item, index }) => {
    return (
      <Touchable
        onPress={() =>
          navigation.navigate('spDetail', { id: item['UserId'] })
        }
        style={styles['header']}>
        <MyImage
          source={{ uri: item['ProfilePic'] }}
          style={styles['imageStyle']}
        />
        <MyView style={{ flex: 1 }}>
          <MyView style={styles['rowName']}>
            <MyView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
              }}>
              <MyText
                style={styles['nameStyle']}>{`${item['Name']} | `}</MyText>
              <MyText
                style={[styles['nameStyle'], { fontSize: getFontSize(12) }]}>
                {item['Username']}
              </MyText>
            </MyView>

            {/* <MyText
              style={[styles['priceStyle']]}>{`$ ${item['Price'] || 0}`}</MyText> */}
          </MyView>
          <MyView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: dynamicSize(3),
            }}>
            <TouchableIcon source={mapPin} />
            <MyText style={styles['address']}>
              {item['CityCode'] + item['CityName']}
            </MyText>
          </MyView>
          <MyView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: dynamicSize(5),
            }}>
            <TouchableIcon
              source={chatIcon}
              onPress={() =>
                navigation.navigate('chat', {
                  id: item['UserId'],
                  type: 'provider',
                })
              }
            />
            <MyText style={styles['available']}>
              {item?.IsAvailabile ? AVAILABLE : 'Unavailable'}
            </MyText>
            <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MyImage source={smallStar} />
              <MyText style={styles['starCount']}>{`${JSON.stringify(
                item.UserRating,
              )}/5`}</MyText>
            </MyView>
            <Button
              onPress={() =>
                navigation.navigate('spDetail', { id: item['UserId'] })
              }
              text={BOOK_NOW}
              style={styles['buttonStyle']}
            />
          </MyView>
        </MyView>
      </Touchable>
    );
  };
  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        paddingBottom: -useSafeAreaInsets().bottom,
        backgroundColor: LIGHT_WHITE,
      }}>
      <MyView style={{ flex: 1, alignItems: 'center', width: SCREEN_WIDTH }}>
        <Loader isVisible={loading} />
        <CurveView innerStyle={{ justifyContent: 'center' }}>
          <MyText onPress={clearAllFilter} style={styles.decoration}>{'CLEAR FILTER'}</MyText>
        </CurveView>
        <SearchInput showFilter value={search} onChangeText={_search} onRightPress={openFilterModal} />
        <LoaderSearch isVisible={searchloading} />
        {searchloading ? null : (
          <FlatList
            key="providerList"
            keyExtractor={_keyExtractor}
            ItemSeparatorComponent={_seperator}
            data={data}
            ListEmptyComponent={_renderEmpty}
            renderItem={_renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={_onEndReached}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles['flatList']}
          />
        )}
      </MyView>
      <CustomModal
        isVisible={filterModal}
        animationType={'slide'}
        style={[styles.modal, { paddingTop: useSafeAreaInsets().top + dynamicSize(20) }]}
      >
        <ScrollView style={styles.mainScroll} keyboardShouldPersistTaps='always'>
          <MyText style={styles.label}>{SERVICE?.toUpperCase()}</MyText>
          {/* <MyView style={{ marginVertical: SCREEN_HEIGHT * 0.02, width: '100%' }}> */}
          <MultiSelectDropdown
            ref={selectedMultipleServicesRef}
            items={servicesList}
            onSelectedItemsChange={_getSelectedServicesItem}
            selectedItems={selectedMultipleServices}
            hideSelectedTag
            uniqueKey={'ServiceMasterId'}
            displayKey={'ServiceName'}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: dynamicSize(10) }}>
            {selectedMultipleServices?.length ? selectedMultipleServicesRef?.current?.getSelectedItemsExt(selectedMultipleServices) : null}
          </ScrollView>
          <MyText style={[styles.label, { marginTop: SCREEN_HEIGHT * 0.02, }]}>{'RATING'}</MyText>
          <ShowStarRating rating={rating} large isRate appliedRating={_getRating} imageStyle={{ width: dynamicSize(40), height: dynamicSize(40), marginVertical: SCREEN_HEIGHT * 0.02, }} />
          <MyText style={styles.label}>{CITY?.toUpperCase()}</MyText>
          <MyView style={{ marginVertical: SCREEN_HEIGHT * 0.02 }}>
            <GooglePlacesAutocomplete
              placeholder='Search'
              listViewDisplayed={false}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log('hey=>', data, details);
                getPlaceDetail(data, details)
              }}
              renderDescription={(row) => row.description || row.vicinity}
              currentLocation
              currentLocationLabel='Current location'
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
              }}
              onFail={(error) => console.log('error=>', error)}
              styles={{ container: { width: SCREEN_WIDTH - dynamicSize(70), borderBottomWidth: 0.5, borderBottomColor: THEME, borderRadius: 5 } }}
              fetchDetails={true}
            />
            {/* <CustomDropDown
              data={[]}
              itemCount={8}
              onChange={_onChangeCityText}
            /> */}
          </MyView>
          <MyText style={styles.label}>{DISTANCE}</MyText>
          <MyView style={{ flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.03, alignSelf: 'center' }}>
            <MyText style={[styles['value'], { textAlign: "center" }]}>{filterDistance}</MyText>
            <CustomSlider
              onSlidingComplete={_onSlidingComplete}
              value={filterDistance}
              minimumValue={0}
              maximumValue={MAX_FILTER_DISTANCE}
              step={5}
              onValueChange={_onSliderChange}
            />
            <MyText style={[styles['value'], { right: 0 }]}>{MAX_FILTER_DISTANCE}</MyText>
          </MyView>
          <MyText style={styles.label}>{PRICE}</MyText>
          <MyView style={styles.row} >
            {filterPriceList.map((item, index) => {
              return (<Touchable onPress={_selectPrice(item)} style={[styles.priceItem, { borderLeftWidth: index ? 1 : 0, borderLeftColor: THEME, backgroundColor: selectedPrice == item.Id ? THEME : WHITE }]}>
                <MyText style={{ color: selectedPrice == item.Id ? WHITE : BLACK }}>{item?.Name || ''}</MyText>
              </Touchable>)
            })}
          </MyView>
        </ScrollView>
        <Button onPress={_applyFilter} style={[styles['applyButtonStyle'], { marginVertical: dynamicSize(10) }]} text={APPLY} />
        <Button onPress={closeFilterModal} style={[styles['applyButtonStyle'], { marginVertical: dynamicSize(10), marginBottom: useSafeAreaInsets().bottom + dynamicSize(10) }]} text={'CLOSE'} />
      </CustomModal>
    </SafeArea>
  );
};

export default ProviderList;
