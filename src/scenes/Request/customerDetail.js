import React, { useEffect, useState } from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  MyText,
  MyImage,
  Touchable,
  Loader,
  Button,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { getCustomerDetailAction, loaderAction } from '../../redux/action';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import {
  Base64,
  getData,
  isAndroid,
  locationMapping,
  onShare,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/helper';
import localKey from '../../utils/localKey';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';

// Customer detail UI
const CustomerDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { GENDER, LOCATION, HAIR_TYPE, LOADING, SHARE } = state['localeReducer'][
    'locale'
  ];
  const { otherProfile, profile, providerprofile } = state['profileReducer'];
  const { loading } = state['loaderReducer'];
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    dispatch(loaderAction(true));
    dispatch(getCustomerDetailAction(route.params.id));
  }, []);

  useEffect(() => {
    isShowButton();
  }, [otherProfile, profile, providerprofile]);

  const _renderItem = ({ item, index }) => {
    return (
      <Touchable style={styles['cardStyle']}>
        <MyText style={[styles['uploadText'], { marginVertical: 0 }]}>
          {item['QuestionText']}
        </MyText>
        <MyText style={styles['description']}>{item['AnswerText']}</MyText>
      </Touchable>
    );
  };

  const _keyExtractor = (item, index) => item + index;

  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  const isShowButton = async () => {
    const logToken = await getData(localKey['LOGIN_TOKEN']);
    let data = parseJwt(logToken);
    if (otherProfile?.UserId !== data?.UserId) {
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
  const _onShareButton = async () => {
    const profileType = 'customer';
    const userId = otherProfile?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
    console.log('new short link =>', newLink)
    onShare(newLink)
  };

  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        paddingBottom: -useSafeAreaInsets().bottom,
      }}>
      <MyView style={styles['mainContainer']}>
        <CurveView />
        <Loader isVisible={loading} />
        <MyView style={styles['shareContainer']}>
          <MyText onPress={_onShareButton} style={styles['shareText']}>
            {SHARE}
          </MyText>
        </MyView>
        <MyImage
          source={{ uri: otherProfile?.['ProfilePic'] }}
          style={styles['customerImage']}
        />
        <MyText style={styles['customername']}>
          {otherProfile?.['Name'] ? otherProfile?.['Name'] : LOADING}
        </MyText>
        <MyText style={[styles['customername'], { fontSize: getFontSize(14) }]}>
          {otherProfile?.['Username'] ? otherProfile?.['Username'] : LOADING}
        </MyText>
        <MyText style={styles['detail']}>{`${GENDER}: ${otherProfile?.['Gender'] ? otherProfile?.['Gender'] : LOADING
          }`}</MyText>
        <MyText style={styles['detail']}>{`${LOCATION}: ${locationMapping(otherProfile)}`}</MyText>
        {buttonVisible && (
          <Button
            onPress={() =>
              navigation.navigate('chat', {
                id: route.params.id,
                type: 'customer',
              })
            }
            text="Message"
            style={{
              marginTop: SCREEN_HEIGHT * 0.01,
              borderRadius: dynamicSize(10),
              height: isAndroid ? dynamicSize(33) : dynamicSize(38),
              width: SCREEN_WIDTH / 2.5,
              marginBottom: -SCREEN_HEIGHT * 0.02,
            }}
          />
        )}
        <CurveView
          style={styles['curveMain']}
          innerStyle={styles['innerStyle']}
        />
        <MyView style={styles['lowerContainer']}>
          <MyText style={styles['hairType']}>
            {`${HAIR_TYPE}:  `}
            <MyText style={styles['value']}>
              {otherProfile?.['HairType']
                ? otherProfile?.['HairType']
                : LOADING}
            </MyText>
          </MyText>
          <FlatList
            key="hairType"
            showsVerticalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            data={otherProfile?.['ProfileQAs']}
            renderItem={_renderItem}
            contentContainerStyle={styles['flatList']}
            ItemSeparatorComponent={_renderSeperator}
          />
        </MyView>
      </MyView>
    </SafeArea>
  );
};

export default CustomerDetail;
