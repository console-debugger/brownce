import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  MyImage,
  MyText,
  MyView,
  SafeArea,
  Touchable,
} from '../../components/customComponent';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../components/helper';
import {logo} from '../../components/icons';
import {serviceConst} from '../../services/serviceConstant';
import {LIGHT_WHITE, THEME, WHITE} from '../../utils/colors';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {ROLE_TYPES} from '../../utils/roleType';

const TYPES = {CUSTOMER: 'customer', PROVIDER: 'provider'};

// Landing screen Role selection
const RoleSelection = ({navigation}) => {
  const state = useSelector((state) => {
    return state;
  });
  const {CUSTOMER, PROVIDER} = state['localeReducer']['locale'];
  const [selectedRole, setSelectredRole] = useState(0);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('firsttimestatus').then(async (data) => {
      data = JSON.parse(data);
      console.log('firsttimestatus => ', data?.status);
      setStatus(data?.status);
    });
  }, []);

  const _chooseRole = (type) => () => {
    if (type === TYPES['CUSTOMER']) {
      setSelectredRole(0);
      serviceConst['role'] = ROLE_TYPES.CUSTOMER;
    } else if (type === TYPES['PROVIDER']) {
      setSelectredRole(1);
      serviceConst['role'] = ROLE_TYPES.PROVIDER;
    }
  };

  const _navToNext = () =>
    status ? navigation.navigate('signup') : navigation.navigate('login');

  return (
    <SafeArea>
      <MyView
        style={{flex: 1, backgroundColor: LIGHT_WHITE, alignItems: 'center'}}>
        <MyImage source={logo} style={styles['logo']} />
        <Touchable
          onPress={_navToNext}
          onPressIn={_chooseRole(TYPES['CUSTOMER'])}
          style={[
            styles['button'],
            styles['customerButton'],
            {backgroundColor: selectedRole === 0 ? THEME : LIGHT_WHITE},
          ]}>
          <MyText
            style={[
              styles['customerText'],
              {color: selectedRole === 0 ? WHITE : THEME},
            ]}>
            {CUSTOMER}
          </MyText>
        </Touchable>
        <Touchable
          onPress={_navToNext}
          onPressIn={_chooseRole(TYPES['PROVIDER'])}
          style={[
            styles['button'],
            {
              marginTop: SCREEN_HEIGHT * 0.03,
              backgroundColor: selectedRole === 1 ? THEME : LIGHT_WHITE,
            },
          ]}>
          <MyText
            style={[
              styles['providerText'],
              {color: selectedRole === 1 ? WHITE : THEME},
            ]}>
            {PROVIDER}
          </MyText>
        </Touchable>
      </MyView>
    </SafeArea>
  );
};

export default RoleSelection;
