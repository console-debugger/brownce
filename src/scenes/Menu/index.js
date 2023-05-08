import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { MyAlert } from '../../components/alert';
import {
  MyView,
  SafeArea,
  MyText,
  MyImage,
  Touchable,
  TouchableIcon,
} from '../../components/customComponent';
import { imagePlaceholder, rightArrow, shareIcon } from '../../components/icons';
import { logout } from '../../navigation/rootNav';
import { deleteAccountAction, getProfileAction, loaderAction, logoutAction } from '../../redux/action';
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors';
import { getFontSize } from '../../utils/responsive';
import { isCustomer, logAnalyticEvent, onShare } from '../../components/helper';
import styles from './styles';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';
import { CUSTOMER_MENU } from '../../components/eventName';

// Menu list of customer UI design
const Menu = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const {
    PROFILE,
    LOADING,
    APPOINTMENTS,
    LOGOUT_MESSAGE,
    REFERRALS,
    SUPPORT,
    SETTING,
    MY_QUESTIONS,
    LEGAL,
    LOGOUT,
    HOME,
    DELETE_ACCOUNT,
    DELETE_MESSAGE
  } = state['localeReducer']['locale'];
  const { profile } = state['profileReducer'];

  const [logoutModalVisible, setLogoutModal] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [indicator, setIndicator] = useState(false)
  const [menuOption, setMenuOptions] = useState([
    {
      label: PROFILE,
    },
    {
      label: APPOINTMENTS,
    },

    {
      label: MY_QUESTIONS,
    },
    {
      label: 'Favorites'
    },
    {
      label: 'FAQ & Community guidelines',
    },
    {
      label: SETTING,
    },
    {
      label: 'My Orders',
    },
    {
      label: REFERRALS,
    },
    {
      label: SUPPORT,
    },
    {
      label: 'Terms & Conditions',
    },
    {
      label: 'Privacy Policy',
    },
    {
      label: DELETE_ACCOUNT
    },
    {
      label: LOGOUT,
    },
  ]);

  // fetching User profile
  useFocusEffect(
    useCallback(() => {
      // dispatch(loaderAction(true))
      dispatch(getProfileAction());
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
        logAnalyticEvent(CUSTOMER_MENU, data)
      }
    }, [profile])
  )

  // navigation to screen
  const _navToScreens = (index) => () => {
    if (index === 0) navigation.navigate('settings');
    // navigation.navigate('editProfile') //
    else if (index === 1) navigation.navigate('appointments');
    else if (index === 2) navigation.navigate('myQuestions');
    else if (index === 3) navigation.navigate('favProvider');

    else if (index === 4) navigation.navigate('webView', { id: 5, title: 'Community guidelines' });
    // navigation.navigate('settings')
    else if (index === 5) navigation.navigate('editProfile');
    else if (index === 6) navigation.navigate('myorders');
    else if (index === 7) navigation.navigate('referral');
    else if (index === 8) navigation.navigate('support');

    else if (index === 9) navigation.navigate('webView', { id: 1, title: 'Terms & Conditions' });
    else if (index == 10) navigation.navigate('webView', { id: 2, title: 'Privacy Policy' });
    else if (index === 11) openDeleteModal()
    else if (index == 12) _onYesPress()
  };

  const _renderSeperator = () => <MyView styl={styles['seperator']} />;

  // Ui of menu
  const _renderMenuList = ({ item, index }) => {
    return (
      <Touchable
        onPress={_navToScreens(index)}
        style={[
          styles['menuItem'],
          { borderBottomWidth: index === menuOption.length - 1 ? 0 : 1 },
        ]}>
        <MyText style={[styles['labelStyle'], { color: index == 11 ? 'red' : BLACK }]}>{item['label']}</MyText>
        <MyImage source={rightArrow} style={styles['arrowStyle']} />
      </Touchable>
    );
  };

  // Yes press of logout modal
  const _onYesPress = () => {
    // setLogoutModal(false);
    setTimeout(() => {
      dispatch(logoutAction());
      logout();
    }, 500);
  };

  const _onDeleteYesPress = () => {
    setIndicator(true)
    dispatch(deleteAccountAction((result) => {
      if (result) {
        setIndicator(false)
        closeDeleteModal()
        setTimeout(() => {
          dispatch(logoutAction())
          logout()
        }, 500);
      }
      else setIndicator(false)
    }))
  }

  const openDeleteModal = () => setDeleteModalVisible(true)

  const closeDeleteModal = () => setDeleteModalVisible(false)

  const _onShareButton = async () => {
    const profileType = isCustomer() ? 'customer' : 'provider';
    const userId = profile?.['UserId'];
    const newLink = await generateDynamicLink(profileType, userId)
    console.log('new short link =>', newLink)
    onShare(newLink)
  };

  const _onNoPress = () => setLogoutModal(false);

  return (
    <SafeArea
      style={{
        paddingBottom: -useSafeAreaInsets().bottom,
        backgroundColor: THEME,
      }}>
      <MyAlert
        onYesPress={_onYesPress}
        onNoPress={_onNoPress}
        message={LOGOUT_MESSAGE}
        isVisible={logoutModalVisible}
      />
      <MyAlert indicator={indicator} onYesPress={_onDeleteYesPress} onNoPress={closeDeleteModal} message={DELETE_MESSAGE} isVisible={deleteModalVisible} />
      <StatusBar backgroundColor={THEME} />
      <MyView style={{ backgroundColor: LIGHT_WHITE, flex: 1 }}>
        <MyView style={styles['headerView']}>
          <MyImage
            source={
              profile?.['ProfilePic']
                ? { uri: profile?.['ProfilePic'] }
                : imagePlaceholder
            }
            style={styles['profileImage']}
          />
          <MyView style={styles['userDetailCon']}>
            <MyView style={styles['userDetails']}>
              <MyText style={styles['userName']}>
                {profile?.['Name'] ? profile?.['Name'] : LOADING}
              </MyText>
              <MyText style={[styles['userName'], { fontSize: getFontSize(12) }]}>
                {profile?.['Username'] ? profile?.['Username'] : LOADING}
              </MyText>
              <MyText style={styles['email']}>
                {profile?.['Email'] ? profile?.['Email'] : LOADING}
              </MyText>
            </MyView>
            <MyView style={styles['shareImageCon']}>
              <Touchable onPress={_onShareButton}>
                <MyText style={styles['email']}>
                  {profile?.['Email'] ? `Share` : LOADING}
                </MyText>
              </Touchable>
              {/* <TouchableIcon
                source={shareIcon}
                indicator={false}
                imageStyle={styles['shareImage']}
               
              /> */}
            </MyView>
          </MyView>
        </MyView>
        <FlatList
          key="menuList"
          data={menuOption}
          showsVerticalScrollIndicator={false}
          renderItem={_renderMenuList}
          contentContainerStyle={styles['flatList']}
          ItemSeparatorComponent={_renderSeperator}
        />
      </MyView>
    </SafeArea>
  );
};

export default Menu;
