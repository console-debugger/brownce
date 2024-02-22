import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  MyText,
  MyImage,
  Touchable,
  Loader,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  getNotificationCountAction,
  getProfileAction,
  getProviderProfileAction,
  loaderAction,
} from '../../redux/action';
import { getFontSize } from '../../utils/responsive';
import { SCREEN_HEIGHT, SCREEN_WIDTH, getData, isAndroid, isCustomer, locationMapping, logAnalyticEvent, onShare, storeData } from '../../components/helper';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';
import OneSignal from 'react-native-onesignal';
import { CUSTOMER_DASHBOARD } from '../../components/eventName';
import { coachmarkBeautyFinder, coachmarkHome, coachmarkMarketPlace, coachmarkMenu, coachmarkMessage, coachmarkShopTalk, crossBold, pointerFinger } from '../../components/icons';
import MyCoachMarks from '../../components/coachmarks';
import localKey from '../../utils/localKey';


// @ Customer Profile UI
let timeout

const MyProfile = ({ navigation }) => {
  // @ initailization of local and store state
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { EDIT, GENDER, LOCATION, HAIR_TYPE, SHARE, LOADING,
    WELCOME_CAPS,
    WELCOME_DESCRIPTION_CUSTOMER,
    WELCOME_SUB_DESCRIPTION,
    TAKE_THE_TOUR,
    SKIP_FOR_NOW,
    NEXT,
    DONE,
    THIS_IS_HOME_CUSTOMER,
    THIS_IS_HOME_CUSTOMER_DESCRIPTION,
    THIS_IS_BEAUTY_FINDER_CUSTOMER,
    THIS_IS_BEAUTY_FINDER_CUSTOMER_DESCRIPTION,
    THIS_IS_MESSAGE_CENTER_CUSTOMER,
    THIS_IS_MESSAGE_CENTER_CUSTOMER_DESCRIPTION,
    THIS_IS_SHOP_TALK_CUSTOMER,
    THIS_IS_SHOP_TALK_CUSTOMER_DESCRIPTION,
    THIS_IS_MARKET_PLACE_CUSTOMER,
    THIS_IS_MARKET_PLACE_CUSTOMER_DESCRIPTION,
    HERE_IS_YOUR_MENU_CUSTOMER,
    HERE_IS_YOUR_MENU_CUSTOMER_DESCRIPTION
  } = state[
  'localeReducer'
  ]['locale'];
  const { profile } = state['profileReducer'];
  const { loading } = state['loaderReducer'];

  const [visibleCoachMark, setVisibleCoachMark] = useState(false)
  const [coachMarkData] = useState([
    {
      title: THIS_IS_HOME_CUSTOMER,
      icon: coachmarkHome,
      description: THIS_IS_HOME_CUSTOMER_DESCRIPTION,
      buttonTitle: NEXT,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: 10,
      },
    },
    {
      title: THIS_IS_BEAUTY_FINDER_CUSTOMER,
      icon: coachmarkBeautyFinder,
      description: THIS_IS_BEAUTY_FINDER_CUSTOMER_DESCRIPTION,
      buttonTitle: NEXT,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: (SCREEN_WIDTH / 6) + 5,
      },
    },
    {
      title: THIS_IS_MESSAGE_CENTER_CUSTOMER,
      icon: coachmarkMessage,
      description: THIS_IS_MESSAGE_CENTER_CUSTOMER_DESCRIPTION,
      buttonTitle: NEXT,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: ((SCREEN_WIDTH / 6) * 2) + 5,
      },
    },
    {
      title: THIS_IS_SHOP_TALK_CUSTOMER,
      icon: coachmarkShopTalk,
      description: THIS_IS_SHOP_TALK_CUSTOMER_DESCRIPTION,
      buttonTitle: NEXT,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: ((SCREEN_WIDTH / 6) * 3) + 5,
      },
    },
    {
      title: THIS_IS_MARKET_PLACE_CUSTOMER,
      icon: coachmarkMarketPlace,
      description: THIS_IS_MARKET_PLACE_CUSTOMER_DESCRIPTION,
      buttonTitle: NEXT,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: ((SCREEN_WIDTH / 6) * 4) + 5,
      },
    },
    {
      title: HERE_IS_YOUR_MENU_CUSTOMER,
      icon: coachmarkMenu,
      description: HERE_IS_YOUR_MENU_CUSTOMER_DESCRIPTION,
      buttonTitle: DONE,
      position: {
        bottom: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
        left: ((SCREEN_WIDTH / 6) * 5) + 5,
      },
    },
  ])

  // @ refetch details of customer profile
  useFocusEffect(
    useCallback(() => {
      dispatch(loaderAction(true));
      dispatch(getNotificationCountAction());
      if (isCustomer()) {
        dispatch(getProfileAction());
      } else {
        dispatch(getProviderProfileAction());
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (profile?.UserId) {
        const data = {
          id: profile?.UserId,
          name: profile?.Name || '',
          username: profile?.Username || ''
        }
        getLocalTutorialDemo()
        logAnalyticEvent(CUSTOMER_DASHBOARD, data)
      }
    }, [profile])
  )

  useEffect(() => {
    // Pass in email provided by customer
    if (profile?.Email) OneSignal.setEmail(profile?.Email);
  }, [profile])

  const getLocalTutorialDemo = async () => {
    const value = await getData(localKey.CUSTOMER_TUTORIAL_DEMO)
    if (!value) {
      dispatch(loaderAction(false))
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        openCoachMark()
      }, 500);

    }
  }

  // @ render hair types
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

  const _navToEditProfile = () => navigation.navigate('settings'); // navigation.navigate('editProfile')
  const _onShareButton = async () => {
    // if (!InAppReview.isAvailable()) return
    // InAppReview.RequestInAppReview()
    //   .then(hasFlowFinishedSuccessfully => {
    //     console.log('hasFlowFinishedSuccessfully=>', hasFlowFinishedSuccessfully)
    //     if (hasFlowFinishedSuccessfully) {
    //       console.log('success=>')
    //     }
    //     else {
    //       console.log('failure=>')
    //     }
    //   })
    //   .catch(err => {
    //     console.log('error==>', JSON.stringify(err))
    //   })
    // return
    const profileType = isCustomer() ? 'customer' : 'provider';
    const userId = profile?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
    onShare(newLink)
  };

  const closeCoackMark = () => {
    storeData(localKey.CUSTOMER_TUTORIAL_DEMO, 'true')
    setVisibleCoachMark(false)
  }

  const openCoachMark = () => setVisibleCoachMark(true)

  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        paddingBottom: -useSafeAreaInsets().bottom,
      }}>
      {visibleCoachMark ? <MyCoachMarks
        visible={visibleCoachMark}
        title={WELCOME_CAPS}
        description={WELCOME_DESCRIPTION_CUSTOMER}
        subDescription={WELCOME_SUB_DESCRIPTION}
        buttonTitle={TAKE_THE_TOUR}
        skipTitle={SKIP_FOR_NOW}
        crossIcon={crossBold}
        data={coachMarkData}
        onClose={closeCoackMark}
        pointerIcon={pointerFinger}
        circularOverlayStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        isCircleMask
        onSkip={closeCoackMark}
      /> : null}
      <MyView style={styles['mainContainer']}>
        <CurveView />
        {(!visibleCoachMark && loading) ? <Loader isVisible={loading} /> : null}
        <MyView style={styles['shareContainer']}>
          <MyText onPress={_onShareButton} style={styles['shareText']}>
            {SHARE}
          </MyText>
          <MyText onPress={_navToEditProfile} style={styles['editText']}>
            {EDIT}
          </MyText>
        </MyView>
        <MyImage
          source={{ uri: profile?.['ProfilePic'] }}
          style={styles['image']}
        />
        <MyText style={styles['name']}>
          {profile?.['Name'] ? profile?.['Name'] : LOADING}
        </MyText>
        <MyText style={[styles['name'], { fontSize: getFontSize(14) }]}>
          {profile?.['Username'] ? profile?.['Username'] : LOADING}
        </MyText>
        <MyText style={styles['detail']}>{`${GENDER}: ${profile?.['Gender'] ? profile?.['Gender'] : LOADING
          }`}</MyText>
        <MyText style={styles['detail']}>{`${LOCATION}: ${locationMapping(profile)}`}</MyText>
        <CurveView
          style={styles['curveMain']}
          innerStyle={styles['innerStyle']}
        />
        <MyView style={styles['lowerContainer']}>
          <MyText style={styles['hairType']}>
            {`${HAIR_TYPE}:  `}
            <MyText style={styles['value']}>
              {profile?.['HairType'] ? profile?.['HairType'] : LOADING}
            </MyText>
          </MyText>
          <MyText style={styles['hairType']}>
            {`${'Tenderhead Level'}:  `}
            <MyText style={styles['value']}>
              {profile?.['TenderHeadLevel'] !== null
                ? profile['TenderHeadLevel']
                : 0}
            </MyText>
          </MyText>
          <FlatList
            key="hairType"
            showsVerticalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            data={profile?.['ProfileQAs']}
            renderItem={_renderItem}
            contentContainerStyle={styles['flatList']}
            ItemSeparatorComponent={_renderSeperator}
          />
        </MyView>
      </MyView>
    </SafeArea>
  );
};

export default MyProfile;
