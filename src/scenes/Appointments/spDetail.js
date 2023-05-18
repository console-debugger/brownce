import React, { useState, useEffect } from 'react';
import { FlatList, Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import {
  Button,
  CustomDropDown,
  Loader,
  MyImage,
  MyIndicator,
  MyPagination,
  MyText,
  MyView,
  RatingWithLabel,
  SafeArea,
  SecondaryButton,
  Touchable,
  TouchableIcon,
} from '../../components/customComponent';
import {
  Base64,
  getData,
  isAndroid,
  locationMapping,
  onShare,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showToast,
  validateUrl,
} from '../../components/helper';
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors';
import { montserratBold, montserratMedium } from '../../utils/fontFamily';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import styles from './styles';
import {
  addRemoveProfileToFavourite,
  getProfessionsListAction,
  getProviderCompleteDetailAction,
  getSpDetailAction,
  loaderAction,
  refreshDataAction,
} from '../../redux/action';
import { activeFavHeartIcon, inactiveFavHeartIcon, productImg2 } from '../../components/icons';
import { navigateToScreen } from '../../navigation/rootNav';
import localKey from '../../utils/localKey';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';

const TYPES = { PORTFOLIO: 'portfolio', SERVICES: 'services', PRODUCT: 'product' }

const SpDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { LOADING, RATING, LOCATION, PORTFOLIO, SHARE } = state['localeReducer'][
    'locale'
  ];
  const { loading, refreshData } = state['loaderReducer'];
  const { otherProfile, profile, providerprofile } = state['profileReducer'];
  const { professionsList } = state['hairReducer'];
  const { ServicesProvided } = state.profileReducer.providerprofile;
  const { List } = state.profileReducer.completeproviderproducts;
  const [isRefresh, setRefresh] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [updating, setUpdating] = useState(false)
  const [portfolioData, setPortFolioData] = useState([])
  const [productData, setProductData] = useState([])
  const [servicesData, setServicesData] = useState([])
  const [portfoliopageIndex, setPortfolioPageIndex] = useState(0)
  const [productpageIndex, setProductPageIndex] = useState(0)
  const [servicespageIndex, setServicesPageIndex] = useState(0)
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });

  // @ fetch Service Provide details
  useEffect(() => {
    dispatch(loaderAction(true));
    dispatch(getSpDetailAction(route.params.id));
    dispatch(getProfessionsListAction());
    dispatch(getProviderCompleteDetailAction(route.params.id));
  }, []);

  useEffect(() => {
    isShowButton();
  }, [otherProfile, profile, providerprofile]);

  useEffect(() => {
    setCategory({ name: professionsList[0]?.Name, Id: professionsList[0]?.Id });
  }, [professionsList]);

  useEffect(() => {
    if (providerprofile?.Portfolios?.length && providerprofile?.Portfolios) {
      let newData = [], count = 0
      for (let i = 0; i < providerprofile?.Portfolios?.length; i++) {
        if (i % 6 == 0) {
          count++
          newData[count - 1] = [providerprofile?.Portfolios[i]]
        }
        else {
          newData[count - 1].push(providerprofile?.Portfolios[i])
        }
      }
      setPortFolioData(newData)
    }
  }, [providerprofile?.Portfolios])

  useEffect(() => {
    if (List?.length && List) {
      let newData = [], count = 0
      for (let i = 0; i < List?.length; i++) {
        if (i % 6 == 0) {
          count++
          newData[count - 1] = [List[i]]
        }
        else {
          newData[count - 1].push(List[i])
        }
      }
      setProductData(newData)
    }
  }, [List])

  useEffect(() => {
    if (ServicesProvided?.length && ServicesProvided) {
      let newData = [], count = 0
      for (let i = 0; i < ServicesProvided?.length; i++) {
        if (ServicesProvided[i].ProfessionId == category['Id']) {
          if (i % 4 == 0) {
            count++
            newData[count - 1] = [ServicesProvided[i]]
          }
          else {
            newData[count - 1].push(ServicesProvided[i])
          }
        }
      }
      setServicesData(newData)
    }
  }, [ServicesProvided, category])

  // useEffect(() => {
  //     console.log("filtered ==>> ", ServicesProvided.filter(item => {
  //         item['ProfessionId'] == category['id']
  //         console.log("ProfessionId: ", item['ProfessionId'])
  //         console.log("category['id']: ", category)
  //         return item
  //     }))
  // }, [category])

  const _selectHairType = (item, index, index1) => () => {
    const replica = [...servicesData];
    replica[index1][index]['status'] = !replica[index1][index]['status'];
    setRefresh(!isRefresh);
    setServicesData(replica)
  };

  const _renderPortfolio = ({ item, index }) => {
    return (
      <MyImage
        source={{ uri: item['ImagePath'] }}
        style={styles['portfolioImage']}
      />
    );
  };

  const _renderPortfolioCrousel = ({ item, index }) => {
    return (
      <FlatList
        key={index?.toString()}
        data={item}
        numColumns={3}
        scrollEnabled={false}
        renderItem={_renderPortfolio}
        keyExtractor={_keyExtractor}
        contentContainerStyle={styles['portfolioFlatList']}
        ItemSeparatorComponent={_renderSeperator}
      />
    )
  }

  const _renderServicesCrousel = ({ item, index }) => {
    return (
      <FlatList
        key={index?.toString()}
        data={item?.filter(
          (each) => each['ProfessionId'] == category['Id'],
        )}
        // data={ServicesProvided}
        scrollEnabled={false}
        keyExtractor={_keyExtractor}
        renderItem={_renderHairType}
        contentContainerStyle={styles['hairTypeFlatList']}
        numColumns={2}
        extraData={isRefresh}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    )
  }

  const _renderProductCrousel = ({ item, index }) => {
    return (
      <FlatList
        data={item}
        key={index?.toString()}
        keyExtractor={_keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={_renderProducts}
        ItemSeparatorComponent={_renderSeperator}
        contentContainerStyle={{ paddingHorizontal: dynamicSize(15) }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
      />
    )
  }

  const _renderHairType = (props) => ({ item, index }) => {
    return (
      <SecondaryButton
        price
        onPress={_selectHairType(item, index, props)}
        style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
        textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
        text={item?.['ServiceName']}
        pricetext={`${item?.['Price'] || ''} USD`}
      />
    );
  };

  const _keyExtractor = (item, index) => item + index;

  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  const _navToEditProfile = () => navigation.navigate('editProviderProfile');

  const _renderProducts = ({ item, index }) => {
    return (
      <Touchable
        disabled={item['ProductStatus'] === 1 ? false : true}
        onPress={() => navigateToScreen('productDetails', { item: item })}
        style={{ marginTop: SCREEN_HEIGHT * 0.02, width: SCREEN_WIDTH / 2 - dynamicSize(20) }}>
        <MyView style={styles.view}>
          <MyImage
            style={styles['productImage']}
            source={
              item?.['ProductFiles']?.[0]?.['FilePath']
                ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] }
                : productImg2
            }
          />
        </MyView>
        <MyView style={{ marginLeft: SCREEN_WIDTH * 0.02 }}>
          <MyView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.44,
            }}>
            <MyText style={styles['price']}>{`$${item['Price']}`}</MyText>
            {item['ProductStatus'] === 1 ? null : (
              <MyText style={styles['stock']}>{`${'Out of Stock'}`}</MyText>
            )}
          </MyView>
          <MyText style={styles['desc']}>{item['ProductName']}</MyText>
          <MyText style={styles['desc']}>{item['BrandName']}</MyText>
        </MyView>
      </Touchable>
    );
  };


  const _openLink = async () => {
    try {
      const url = validateUrl(providerprofile['Weblink'])
      if (url) Linking.openURL(url)
    } catch (error) {
      console.log('err-->', error)
    }
  }


  const isShowButton = async () => {
    const logToken = await getData(localKey['LOGIN_TOKEN']);
    let data = parseJwt(logToken);
    if (providerprofile?.UserId !== data?.UserId) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  };

  function parseJwt(token) {
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(
        Base64.atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      return JSON.parse(jsonPayload);
    }
  }

  const _changeCategory = (cat, index) => {
    setCategory({
      name: professionsList[index]?.Name,
      Id: professionsList[index]?.Id,
    });
  };

  const _onShareButton = async () => {
    const profileType = 'provider';
    const userId = providerprofile?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
    onShare(newLink)
  };

  const _onSnapToItem = type => index => {
    if (type == TYPES.PORTFOLIO) {
      setPortfolioPageIndex(index)
    }
    else if (type == TYPES.SERVICES) {
      setServicesPageIndex(index)
    }
    else if (type == TYPES.PRODUCT) {
      setProductPageIndex(index)
    }
  }

  const _addOrRemovefav = () => {
    setUpdating(true)
    const param = {
      ProviderId: route.params.id,
      IsFavorite: !providerprofile.IsFavorite
    }
    dispatch(addRemoveProfileToFavourite(param, result => {
      if (result) {
        providerprofile.IsFavorite = !providerprofile.IsFavorite
        dispatch(refreshDataAction(!refreshData))
      }
      setUpdating(false)
    }))
  }

  const _validate = () => {
    let filterServiceId = [];
    for (let i = 0; i < servicesData.length; i++) {
      filterServiceId.push(
        servicesData[i]
          .filter((item) => {
            if (item['status']) return item;
          })
          .map((each) => {
            return each['ServiceMasterId'];
          }),
      );
    }
    const newData = filterServiceId?.length ? filterServiceId?.flat(1) : []
    if (newData.length) {
      navigation.navigate('booking', { providerId: route.params.id });
    } else {
      showToast('Please select services');
    }
  };

  return (
    <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
      <MyView style={styles['mainContainer']}>
        <MyView style={[styles['outerCurver']]}>
          <MyView style={[styles['innerCurve']]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                borderTopLeftRadius: isAndroid
                  ? dynamicSize(25)
                  : dynamicSize(25),
                borderTopRightRadius: isAndroid
                  ? dynamicSize(25)
                  : dynamicSize(25),
                backgroundColor: LIGHT_WHITE,
              }}
              nestedScrollEnabled={false}
            >
              <Loader isVisible={loading} />
              <MyView style={styles['shareContainer']}>
                <MyText onPress={_onShareButton} style={styles['shareText']}>
                  {SHARE}
                </MyText>
                <MyView style={{ width: dynamicSize(30), height: dynamicSize(30), alignItems: updating ? 'center' : 'flex-end', marginRight: dynamicSize(20), marginTop: dynamicSize(20) }}>
                  {updating ? <MyIndicator />
                    :
                    <TouchableIcon
                      onPress={_addOrRemovefav}
                      source={providerprofile.IsFavorite ? activeFavHeartIcon : inactiveFavHeartIcon}
                      style={{}}
                    />
                  }
                </MyView>
              </MyView>
              <MyImage
                source={{ uri: providerprofile.ProfilePic }}
                style={styles['spimage']}
              />
              <MyText style={styles['spname']}>
                {providerprofile?.FirstName
                  ? providerprofile.FirstName
                  : LOADING}
              </MyText>

              <MyText style={[styles['spname'], { fontSize: getFontSize(14) }]}>
                {providerprofile?.Username ? providerprofile.Username : LOADING}
              </MyText>
              <MyText style={styles['detail']}>{`${LOCATION}:  ${locationMapping(providerprofile)}`}</MyText>
              {providerprofile?.['Weblink'] ? <MyText
                onPress={_openLink}
                style={[
                  styles['detail'],
                  { textDecorationLine: 'underline' },
                ]}>{providerprofile?.['Weblink'] || ''}</MyText> : null}
              <MyText style={styles['detail']}>{`${'Timing'}: ${providerprofile?.['OpeningTime'] === null
                ? '--'
                : providerprofile?.['OpeningTime']
                } To ${providerprofile?.['ClosingTime'] === null
                  ? '--'
                  : providerprofile['ClosingTime']
                }`}</MyText>
              {buttonVisible && (
                <Button
                  onPress={() =>
                    navigation.navigate('chat', {
                      id: route.params.id,
                      type: 'provider',
                    })
                  }
                  text="Message"
                  style={{
                    marginTop: SCREEN_HEIGHT * 0.01,
                    borderRadius: dynamicSize(10),
                    height: isAndroid ? dynamicSize(33) : dynamicSize(38),
                    width: SCREEN_WIDTH / 2.5,
                    marginBottom: SCREEN_HEIGHT * 0.02,
                    alignSelf: 'center',
                  }}
                />
              )}
              <MyView style={[styles['lowerInnerCurve']]}>
                <RatingWithLabel
                  style={{ marginTop: dynamicSize(7) }}
                  labelStyle={{ fontFamily: montserratBold }}
                  isRateCount
                  label={RATING}
                  mytext={`${providerprofile['OverallRating']}/5`}
                />

                {providerprofile?.['Reviews']?.map((item, index) => {
                  return (
                    <MyView>
                      <RatingWithLabel
                        key={index}
                        style={{ marginTop: dynamicSize(7) }}
                        labelStyle={{ fontFamily: montserratBold }}
                        isRateCount
                        label={item.RatingTypeName}
                        mytext={`${item.UserRating}/5`}
                      />
                    </MyView>
                  );
                })}
                {portfolioData?.length ?
                  <>
                    <MyText style={styles['portFolioText']}>{PORTFOLIO}</MyText>
                    <Carousel
                      key="portfolio"
                      data={portfolioData}
                      renderItem={_renderPortfolioCrousel}
                      keyExtractor={_keyExtractor}
                      sliderWidth={SCREEN_WIDTH}
                      removeClippedSubviews={false}
                      contentContainerStyle={styles['portfolioFlatList']}
                      itemWidth={SCREEN_WIDTH}
                      onSnapToItem={_onSnapToItem(TYPES.PORTFOLIO)}
                    />
                    <MyPagination
                      length={portfolioData.length}
                      activeSlideIndex={portfoliopageIndex}
                    />
                  </>
                  : null}
                <MyText
                  style={[
                    styles['portFolioText'],
                    { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 },
                  ]}>
                  {'SERVICES'}
                </MyText>
                <CustomDropDown
                  onChange={_changeCategory}
                  data={professionsList.map((item) => {
                    return { value: item['Name'], id: item['Id'] };
                  })}
                  value={category?.name}
                  style={{ width: SCREEN_WIDTH - dynamicSize(50) }}
                  topOffset={dynamicSize(20)}
                  containerStyle={{
                    borderBottomColor: BLACK,
                    borderBottomWidth: 2,
                  }}
                />
                <MyView style={{ height: 200, marginBottom: useSafeAreaInsets().bottom }}>
                  <Swiper
                    key={servicesData.length}
                    style={{ paddingVertical: SCREEN_HEIGHT * 0.03 }}
                    dotStyle={styles['dotStyle']}
                    activeDotColor={THEME}
                    loadMinimal={true}
                    loop={true}
                    loadMinimalSize={1}
                    removeClippedSubviews={false}
                    activeDotStyle={[styles['dotStyle'], { backgroundColor: THEME }]}>
                    {servicesData.map((item, index1) => {
                      let arr = item.filter(
                        (item) => item['ProfessionId'] == category['Id'],
                      );
                      if (arr.length) {
                        return (
                          <MyView style={{}}>
                            <FlatList
                              key="hairType"
                              showsVerticalScrollIndicator={false}
                              data={arr}
                              // data={item.filter(item => item['ProfessionId'] == category['Id'])}
                              keyExtractor={_keyExtractor}
                              renderItem={_renderHairType(index1)}
                              contentContainerStyle={styles['hairTypeFlatList']}
                              numColumns={2}
                              extraData={isRefresh}
                              columnWrapperStyle={{
                                paddingHorizontal: dynamicSize(1),
                                justifyContent: 'space-between',
                              }}
                            />
                          </MyView>
                        );
                      } else {
                        return (
                          <MyText
                            style={{
                              paddingHorizontal: dynamicSize(25),
                              fontSize: getFontSize(14),
                              color: BLACK,
                              fontFamily: montserratMedium,
                            }}>
                            {'No services found for this profession'}
                          </MyText>
                        );
                      }
                      // return (

                      // )
                    })}
                  </Swiper>
                </MyView>
                {/* {servicesData?.length ? <>
                  <Carousel
                    key="portfolio"
                    data={servicesData}
                    renderItem={_renderServicesCrousel}
                    keyExtractor={_keyExtractor}
                    sliderWidth={SCREEN_WIDTH}
                    removeClippedSubviews={false}
                    // contentContainerStyle={styles['portfolioFlatList']}
                    itemWidth={SCREEN_WIDTH}
                    onSnapToItem={_onSnapToItem(TYPES.SERVICES)}
                  />
                  <MyPagination
                    length={servicesData.length}
                    activeSlideIndex={servicespageIndex}
                  />
                </>
                  : null} */}
                {productData?.length ?
                  <>
                    <MyText
                      style={[
                        styles['portFolioText'],
                        { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 },
                      ]}>
                      {'PRODUCTS'}
                    </MyText>
                    <Carousel
                      key="portfolio"
                      data={productData}
                      renderItem={_renderProductCrousel}
                      keyExtractor={_keyExtractor}
                      sliderWidth={SCREEN_WIDTH}
                      removeClippedSubviews={false}
                      contentContainerStyle={styles['portfolioFlatList']}
                      itemWidth={SCREEN_WIDTH}
                      onSnapToItem={_onSnapToItem(TYPES.PRODUCT)}
                    />
                    <MyPagination
                      length={productData.length}
                      activeSlideIndex={productpageIndex}
                    />
                  </>
                  :
                  null}
                <Button
                  onPress={_validate}
                  style={styles['buttonStyle']}
                  text={'CONTINUE'}
                />
              </MyView>
            </ScrollView>
          </MyView>
        </MyView>
      </MyView>
    </SafeArea>
  );
};

export default SpDetail;
