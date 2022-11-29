import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  MyView,
  MyImage,
  MyText,
  DrawerTile,
} from '../components/customComponent';
import styles from './styles';
import {imagePlaceholder} from '../components/icons';
import {useSelector} from 'react-redux';

const MyDrawer = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  const {
    PROFILE,
    APPOINTMENTS,
    REFERRALS,
    SUPPORT,
    SETTING,
    MY_QUESTIONS,
    LEGAL,
    LOGOUT,
    HOME,
  } = state['localeReducer']['locale'];

  const _navToScreen = (type) => () => {
    props.navigation.navigate(type);
    // if (type === 'tabOne') { props.navigation.popToTop(), props.navigation.closeDrawer() }
    // else props.navigation.navigate(type)
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <MyView style={styles['drawerHeader']}>
        <MyImage source={imagePlaceholder} style={styles['profileImage']} />
        <MyText style={styles['name']}>{'Cher Raye'}</MyText>
      </MyView>
      <MyView style={styles['drawerLowerContent']}>
        {/* <DrawerTile text={HOME} onPress={_navToScreen('tabOne')} /> */}
        {/* <DrawerTile text={PROFILE} onPress={_navToScreen('discovery')} /> */}
        <DrawerTile text={PROFILE} onPress={_navToScreen('tabOne')} />
        <DrawerTile
          text={APPOINTMENTS}
          onPress={_navToScreen('appointments')}
        />
        <DrawerTile text={REFERRALS} onPress={_navToScreen('referral')} />
        <DrawerTile text={SUPPORT} onPress={_navToScreen('support')} />
        <DrawerTile text={SETTING} onPress={_navToScreen('settings')} />
        <DrawerTile text={MY_QUESTIONS} onPress={_navToScreen('myQuestions')} />
        <DrawerTile text={LEGAL} />
        <DrawerTile text={LOGOUT} />
      </MyView>
    </DrawerContentScrollView>
  );
};

export default MyDrawer;
