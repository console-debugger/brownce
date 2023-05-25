import React, { useEffect, useState } from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  MyImage,
  MyText,
  TouchableIcon,
  Touchable,
  SecondaryButton,
  Button,
  CustomDropDown,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { mapPin, chatIcon, smallStar } from '../../components/icons';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, ScrollView, Linking } from 'react-native';
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors';
import {
  getProfessionsListAction,
  getProviderCompleteDetailAction,
  loaderAction,
  updateServicesAction,
} from '../../redux/action';
import {
  showToast,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  onShare,
  validateUrl,
} from '../../components/helper';
import Swiper from 'react-native-swiper';
import { LicensePopup } from '../../components/alert';
import { productImg2 } from '../../components/icons';
import { navigateToScreen } from '../../navigation/rootNav';
import { montserratMedium } from '../../utils/fontFamily';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';

// Provider detail UI
const ProviderDetail = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const {
    AVAILABLE,
    SELECT_SERVICES,
    LOADING,
    PORTFOLIO,
    VIEW_LICENSE,
    SHARE,
  } = state['localeReducer']['locale'];
  const { completeprovider, completeproviderproducts, completeproviderservices } = state['profileReducer'];
  const { professionsList } = state['hairReducer'];
  const { List } = state['profileReducer']['completeproviderproducts'];
  const [modalVisible, setmodalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });

  const _keyExtractor = (item, index) => item + index;

  useEffect(() => {
    setCategory({ name: professionsList[0]?.Name, Id: professionsList[0]?.Id });
  }, [professionsList]);

  useEffect(() => {
    dispatch(loaderAction(true));
    dispatch(getProviderCompleteDetailAction(props.route.params.id));
    dispatch(getProfessionsListAction());
  }, []);

  const _selectServices = (item, index, index1) => {
    const replica = [...completeproviderservices];
    replica[index1][index]['status'] = !replica[index1][index]['status'];
    setRefresh(!refresh);
    dispatch(updateServicesAction(replica));
  };

  const _renderHairType = (props) => ({ item, index }) => {
    return (
      <SecondaryButton
        style={[
          item['status'] ? styles['selected'] : styles['unselected'],
          { borderRadius: dynamicSize(5) },
        ]}
        textStyle={
          item['status'] ? styles['selectedText'] : styles['unselectedText']
        }
        text={item['ServiceName']}
        onPress={() => _selectServices(item, index, props)}
        price
        pricetext={`${item['Price']} USD`}
      />
    );
  };

  const _validate = () => {
    let filterServiceId = [];
    for (let i = 0; i < completeproviderservices.length; i++) {
      filterServiceId.push(
        completeproviderservices[i]
          .filter((item) => {
            if (item['status']) return item;
          })
          .map((each) => {
            return each['ServiceMasterId'];
          }),
      );
    }
    if (filterServiceId[0].length != 0) {
      props.navigation.navigate('booking', { providerId: props.route.params.id });
    } else {
      showToast('Please select services');
    }
  };
  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  const _renderPortfolio = ({ item, index }) => {
    return (
      <MyImage
        source={{ uri: item['ImagePath'] }}
        style={styles['portfolioImage']}
      />
    );
  };

  const _renderProducts = ({ item, index }) => {
    return (
      <Touchable
        disabled={item['ProductStatus'] === 1 ? false : true}
        onPress={() => navigateToScreen('productDetails', { item: item })}
        style={{ marginTop: SCREEN_HEIGHT * 0.02, width: '48%' }}>
        <MyImage
          style={styles['productImage']}
          source={
            item?.['ProductFiles']?.[0]?.['FilePath']
              ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] }
              : productImg2
          }
        />
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
      const url = validateUrl(completeprovider?.['Weblink'])
      if (url) Linking.openURL(url)
    } catch (error) {
      console.log('err-->', error)
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
    const userId = completeprovider?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
    console.log('new short link =>', newLink)
    onShare(newLink)
  };

  return (
    <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
      <MyView style={{ alignItems: 'center', backgroundColor: LIGHT_WHITE }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <LicensePopup
            source={{ uri: completeprovider['DocumentPath'] }}
            dismiss={() => setmodalVisible(false)}
            isVisible={modalVisible}
          />

          <CurveView />
          <MyView style={{ flex: 1 }}>
            <MyView style={styles['header']}>
              <MyImage
                source={{ uri: completeprovider?.['ProfilePic'] }}
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
                    <MyText style={styles['nameStyle']}>
                      {completeprovider?.['Name']
                        ? `${completeprovider['Name']} | `
                        : LOADING}
                    </MyText>

                    <MyText
                      style={[
                        styles['nameStyle'],
                        { fontSize: getFontSize(12) },
                      ]}>
                      {completeprovider?.['Username']
                        ? completeprovider['Username']
                        : LOADING}
                    </MyText>
                  </MyView>

                  <MyText style={styles['priceStyle']}>
                    {completeprovider?.['UserId']
                      ? `$ ${completeprovider['DepositFee'] ? completeprovider['DepositFee'] : 0}`
                      : LOADING}
                  </MyText>
                </MyView>
                <MyView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: dynamicSize(3),
                  }}>
                  <TouchableIcon source={mapPin} />
                  <MyText style={styles['address']}>
                    {completeprovider?.['CityName']
                      ? completeprovider['CityName']
                      : LOADING}
                  </MyText>
                </MyView>
                <MyView
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: dynamicSize(5),
                  }}>
                  <TouchableIcon
                    source={chatIcon}
                    onPress={() =>
                      props.navigation.navigate('chat', {
                        id: completeprovider['UserId'],
                        type: 'provider',
                      })
                    }
                  />
                  <MyText style={styles['available']}>{AVAILABLE}</MyText>
                  <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MyImage source={smallStar} />
                    <MyText style={styles['starCount']}>
                      {`${completeprovider['UserRating']}`
                        ? `${completeprovider['UserRating']}/5`
                        : '0/5'}
                    </MyText>
                  </MyView>
                  <Touchable
                    onPress={() => setmodalVisible(true)}
                    style={{ marginLeft: dynamicSize(55) }}>
                    <MyText style={{ textDecorationLine: 'underline' }}>
                      {VIEW_LICENSE}
                    </MyText>
                  </Touchable>
                </MyView>
                <MyView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: dynamicSize(5),
                  }}>
                  <Touchable
                    onPress={_onShareButton}
                    style={{ marginLeft: dynamicSize(55) }}>
                    <MyText style={{ textDecorationLine: 'underline' }}>
                      {SHARE}
                    </MyText>
                  </Touchable>
                </MyView>
              </MyView>
            </MyView>
            <MyText style={styles['description']}>
              {completeprovider['Bio']}
            </MyText>
            {completeprovider?.['Weblink'] ? <MyText
              onPress={_openLink}
              style={[
                styles['title'],
                { textDecorationLine: 'underline' },
              ]}>{completeprovider?.['Weblink']}</MyText>
              : null}

            <MyText style={[styles['title'], { marginTop: 10 }]}>{`${'Timing'}: ${completeprovider?.['OpeningTime'] === null
              ? '--'
              : completeprovider?.['OpeningTime']
              } To ${completeprovider?.['ClosingTime'] === null
                ? '--'
                : completeprovider?.['ClosingTime']
              }`}</MyText>
            <MyText style={[styles['title'], { marginTop: 10 }]}>
              {PORTFOLIO.toUpperCase()}
            </MyText>

            <FlatList
              key="portfolio"
              data={completeprovider.Portfolios}
              numColumns={3}
              renderItem={_renderPortfolio}
              keyExtractor={_keyExtractor}
              contentContainerStyle={styles['portfolioFlatList']}
              ItemSeparatorComponent={_renderSeperator}
            />
            <MyText style={[styles['title'], { marginTop: 10 }]}>
              {SELECT_SERVICES.toUpperCase()}
            </MyText>
            <CustomDropDown
              onChange={_changeCategory}
              data={professionsList.map((item) => {
                return { value: item['Name'], id: item['Id'] };
              })}
              value={category?.name}
              topOffset={dynamicSize(20)}
              containerStyle={{ borderBottomColor: BLACK, borderBottomWidth: 2 }}
              style={{
                paddingHorizontal: dynamicSize(25),
                width: SCREEN_WIDTH,
              }}
            />
            <MyView style={{ height: 200 }}>
              <Swiper
                key={completeproviderservices.length}
                style={{ paddingVertical: SCREEN_HEIGHT * 0.03 }}
                dotStyle={styles['dotStyle']}
                activeDotColor={THEME}
                activeDotStyle={[styles['dotStyle'], { backgroundColor: THEME }]}>
                {completeproviderservices.map((item, index1) => {
                  let arr = item.filter(
                    (item) => item['ProfessionId'] == category['Id'],
                  );
                  if (arr.length) {
                    return (
                      <MyView style={{}}>
                        <FlatList
                          key="hairType"
                          showsVerticalScrollIndicator={false}
                          data={item}
                          // data={item.filter(item => item['ProfessionId'] == category['Id'])}
                          keyExtractor={_keyExtractor}
                          renderItem={_renderHairType(index1)}
                          contentContainerStyle={styles['hairTypeFlatList']}
                          numColumns={2}
                          extraData={refresh}
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
            <MyText style={[styles['title'], { marginTop: 10 }]}>
              {'Products'}
            </MyText>

            <FlatList
              data={completeproviderproducts?.List?.length ? completeproviderproducts?.List : []}
              showsVerticalScrollIndicator={false}
              renderItem={_renderProducts}
              ItemSeparatorComponent={_renderSeperator}
              numColumns={2}
              contentContainerStyle={{
                width: '100%',
                paddingHorizontal: dynamicSize(12),
              }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              extraData={refresh}
            />
            <Button
              onPress={_validate}
              style={styles['buttonStyle']}
              text={'CONTINUE'}
            />
          </MyView>
        </ScrollView>
      </MyView>
    </SafeArea>
  );
};

export default ProviderDetail;
