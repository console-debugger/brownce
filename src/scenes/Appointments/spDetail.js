import React, { useState, useEffect } from 'react';
import { FlatList, Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CustomDropDown,
  Loader,
  MyImage,
  MyText,
  MyView,
  RatingWithLabel,
  SafeArea,
  SecondaryButton,
  Touchable,
} from '../../components/customComponent';
import {
  Base64,
  getData,
  isAndroid,
  locationMapping,
  onShare,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/helper';
import { BLACK, LIGHT_WHITE } from '../../utils/colors';
import { montserratBold } from '../../utils/fontFamily';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import styles from './styles';
import {
  getProfessionsListAction,
  getSpDetailAction,
  loaderAction,
} from '../../redux/action';
import { productImg2 } from '../../components/icons';
import { navigateToScreen } from '../../navigation/rootNav';
import localKey from '../../utils/localKey';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';

const SpDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { LOADING, RATING, LOCATION, PORTFOLIO, SHARE } = state['localeReducer'][
    'locale'
  ];
  const { loading } = state['loaderReducer'];
  const { otherProfile, profile, providerprofile } = state['profileReducer'];
  const { professionsList } = state['hairReducer'];
  const { ServicesProvided } = state.profileReducer.providerprofile;
  const { List } = state.profileReducer.completeproviderproducts;
  const [isRefresh, setRefresh] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [category, setCategory] = useState({
    id: '',
    name: '',
  });

  // @ fetch Service Provide details
  useEffect(() => {
    dispatch(loaderAction(true));
    dispatch(getSpDetailAction(route.params.id));
    dispatch(getProfessionsListAction());
  }, []);

  useEffect(() => {
    isShowButton();
  }, [otherProfile, profile, providerprofile]);

  useEffect(() => {
    setCategory({ name: professionsList[0]?.Name, Id: professionsList[0]?.Id });
  }, [professionsList]);

  // useEffect(() => {
  //     console.log("filtered ==>> ", ServicesProvided.filter(item => {
  //         item['ProfessionId'] == category['id']
  //         console.log("ProfessionId: ", item['ProfessionId'])
  //         console.log("category['id']: ", category)
  //         return item
  //     }))
  // }, [category])

  const _selectHairType = (item, index) => () => {
    const replica = [...hairTypes];
    for (let i = 0; i < hairTypes.length; i++) {
      if (item['HairTypeMasterId'] === replica[i]['HairTypeMasterId']) {
        replica[i]['status'] = true;
      } else {
        replica[i]['status'] = false;
      }
    }
    setRefresh(!isRefresh);
  };

  const _renderPortfolio = ({ item, index }) => {
    return (
      <MyImage
        source={{ uri: item['ImagePath'] }}
        style={styles['portfolioImage']}
      />
    );
  };

  const _renderHairType = ({ item, index }) => {
    return (
      <SecondaryButton
        price
        //onPress={_selectHairType(item, index)}
        style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
        textStyle={styles['selectedText']}
        text={item['ServiceName']}
        pricetext={`${item['Price']} USD`}
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
        style={{ marginTop: SCREEN_HEIGHT * 0.02, marginHorizontal: 12 }}>
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
  const _openLink = () => {
    if (
      providerprofile['Weblink'] === null ||
      providerprofile['Weblink'] === ''
    )
      Linking.openURL(providerprofile['Weblink']);
  };

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
    console.log('new short link =>', newLink)
    onShare(newLink)
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
              }}>
              <Loader isVisible={loading} />
              <MyView style={styles['shareContainer']}>
                <MyText onPress={_onShareButton} style={styles['shareText']}>
                  {SHARE}
                </MyText>
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
              <MyText
                onPress={_openLink}
                style={[
                  styles['detail'],
                  { textDecorationLine: 'underline' },
                ]}>{`${'Website Link'}: ${providerprofile?.['Weblink'] === null
                  ? ''
                  : providerprofile?.['Weblink']
                  }`}</MyText>
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
                <MyText style={styles['portFolioText']}>{PORTFOLIO}</MyText>
                <FlatList
                  key="portfolio"
                  data={providerprofile.Portfolios}
                  numColumns={3}
                  renderItem={_renderPortfolio}
                  keyExtractor={_keyExtractor}
                  contentContainerStyle={styles['portfolioFlatList']}
                  ItemSeparatorComponent={_renderSeperator}
                />
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
                  topOffset={dynamicSize(20)}
                  containerStyle={{
                    borderBottomColor: BLACK,
                    borderBottomWidth: 2,
                  }}
                />
                <FlatList
                  key="hairType"
                  data={ServicesProvided?.filter(
                    (item) => item['ProfessionId'] == category['Id'],
                  )}
                  // data={ServicesProvided}
                  keyExtractor={_keyExtractor}
                  renderItem={_renderHairType}
                  contentContainerStyle={styles['hairTypeFlatList']}
                  numColumns={2}
                  extraData={isRefresh}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                <MyText
                  style={[
                    styles['portFolioText'],
                    { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 },
                  ]}>
                  {'PRODUCTS'}
                </MyText>
                <FlatList
                  data={List}
                  keyExtractor={_keyExtractor}
                  showsVerticalScrollIndicator={false}
                  renderItem={_renderProducts}
                  ItemSeparatorComponent={_renderSeperator}
                  numColumns={2}
                  contentContainerStyle={{}}
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
