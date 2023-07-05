import React, { useCallback, useEffect } from 'react';
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
import { isCustomer, locationMapping, logAnalyticEvent, onShare } from '../../components/helper';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';
import OneSignal from 'react-native-onesignal';
import { CUSTOMER_DASHBOARD } from '../../components/eventName';
import InAppReview from 'react-native-in-app-review';


// @ Customer Profile UI

const MyProfile = ({ navigation }) => {
  // @ initailization of local and store state
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { EDIT, GENDER, LOCATION, HAIR_TYPE, SHARE, LOADING } = state[
    'localeReducer'
  ]['locale'];
  const { profile } = state['profileReducer'];
  const { loading } = state['loaderReducer'];

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
        logAnalyticEvent(CUSTOMER_DASHBOARD, data)
      }
    }, [profile])
  )

  useEffect(() => {
    // Pass in email provided by customer
    if (profile?.Email) OneSignal.setEmail(profile?.Email);
  }, [profile])

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
    if (!InAppReview.isAvailable()) return
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        console.log('hasFlowFinishedSuccessfully=>', hasFlowFinishedSuccessfully)
        if (hasFlowFinishedSuccessfully) {
          console.log('success=>')
        }
        else {
          console.log('failure=>')
        }
      })
      .catch(err => {
        console.log('error==>', JSON.stringify(err))
      })
    return
    const profileType = isCustomer() ? 'customer' : 'provider';
    const userId = profile?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
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
