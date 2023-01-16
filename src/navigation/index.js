import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useFocusEffect,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigate, navigationRef } from './rootNav';
import Login from '../scenes/Login';
import Signup from '../scenes/Signup';
import Header from '../components/header';
import { useSelector, useDispatch } from 'react-redux';
import ProfileSetupOne from '../scenes/ProfileSetup/setupOne';
import ProfileSetupTwo from '../scenes/ProfileSetup/setupTwo';
import ProfileSetupThree from '../scenes/ProfileSetup/setupThree';
import ProfileSetupFour from '../scenes/ProfileSetup/setupFour';
import ProfileSetupFive from '../scenes/ProfileSetup/setupFive';
import ProfileSetupSix from '../scenes/ProfileSetup/setupSix';
import Prompt from '../scenes/Prompt';
import { LIGHT_GRAY, THEME, LIGHT_BROWN, WHITE } from '../utils/colors';
import WriteAnswer from '../scenes/WriteAnswer';
import {
  getData,
  isCustomer,
  isIOS,
  isProvider,
  SCREEN_WIDTH,
} from '../components/helper';
import MyDrawer from './myDrawer';
import { MyBottomTab, MyTopTab } from './myTab';
import { dynamicSize, getFontSize } from '../utils/responsive';
import RecentChat from '../scenes/RecentChat';
import Chat from '../scenes/Chat';
import Referral from '../scenes/Referral';
import Support from '../scenes/Support';
import MyProfile from '../scenes/MyProfile';
import EditProfile from '../scenes/EditProfile';
import SelectService from '../scenes/SelectService';
import InProgressAppointment from '../scenes/Appointments/inProgress';
import PastAppointment from '../scenes/Appointments/past';
import Upcoming from '../scenes/Appointments/upcoming';
import { montserratSemiBold } from '../utils/fontFamily';
import Settings from '../scenes/Settings';
import MyQuestions from '../scenes/MyQuestions';
import ForumList from '../scenes/ForumList';
import {
  addWhiteIcon,
  locationIcon,
  toggleOff,
  toggleOn,
} from '../components/icons';
import CreateQuestion from '../scenes/CreateQuestions';
import ProviderDetail from '../scenes/ProviderDetail';
import Booking from '../scenes/Booking';
import Deposit from '../scenes/Booking/deposit';
import ProviderList from '../scenes/ProviderList';
import ForumDetailComment from '../scenes/ForumDetailComment';
import Discover from '../scenes/Discover';
import DiscoverOne from '../scenes/Discover/stepOne';
import DiscoverTwo from '../scenes/Discover/stepTwo';
import DiscoverThree from '../scenes/Discover/stepThree';
import DiscoverFour from '../scenes/Discover/stepFour';
import Menu from '../scenes/Menu';
import OTP from '../scenes/OTP';
import ForgotPassword from '../scenes/ForgotPassword';
import ResetPassword from '../scenes/ResetPassword';
import localKey from '../utils/localKey';
import { serviceConst, apiKey } from '../services/serviceConstant';
import { MyIndicator, MyView } from '../components/customComponent';
import EditPrompt from '../scenes/Prompt/editPrompt';
import RoleSelection from '../scenes/RoleSelection';
import ProviderProfileSetupThree from '../scenes/ProfileSetup/providerSetupThree';
import ProviderProfileSetupFour from '../scenes/ProfileSetup/providerSetupFour';
import ProviderProfileSetupFive from '../scenes/ProfileSetup/providerSetupFive';
import AddCustomService from '../scenes/ProfileSetup/addCustomService';
import CustomServiceList from '../scenes/ProfileSetup/customServiceList';
import ProviderProfileSetupSix from '../scenes/ProfileSetup/profileSetupSix';
import ProviderProfile from '../scenes/MyProfile/ProviderProfile';
import NewRequest from '../scenes/Request/newRequest';
import InProgressRequest from '../scenes/Request/inProgress';
import UpcomingRequest from '../scenes/Request/upcoming';
import ProviderProfileSetupSeven from '../scenes/ProfileSetup/profileSetupSeven';
import ProviderMenu from '../scenes/Menu/providerMenu';
import Earnings from '../scenes/Earnings';
import Funds from '../scenes/Funds';
import ServiceHistory from '../scenes/ServiceHistory';
import UpdateProviderService from '../scenes/ProfileSetup/updateServices';
import ProviderCompleteProfile from '../scenes/MyProfile/ProviderCompleteProfile';
import EditProviderProfile from '../scenes/EditProfile/ProviderEditProfile';
import ProviderSetting from '../scenes/Settings/ProviderSetting';
import AllServices from '../scenes/Settings/allServices';
import ChangeCustomServiceList from '../scenes/Settings/changecustomlist';
import ChangeAddCustomService from '../scenes/Settings/changeaddmore';
import UpdatePrice from '../scenes/Settings/updatePrice';
import uploadLicense from '../scenes/ProfileSetup/uploadLicense';
import {
  getProviderAvailaibilityAction,
  markNotificationAsReadAction,
} from '../redux/action';
import ProviderBio from '../scenes/ProfileSetup/providerBio';
import ServiceDetail from '../scenes/Request/serviceDetail';
import CustomerDetail from '../scenes/Request/customerDetail';
import SpDetail from '../scenes/Appointments/spDetail';
import webView from '../scenes/Menu/webView';
import updateSubscription from '../scenes/ProfileSetup/updateSubscription';
import MySubscription from '../scenes/MySubscription';
import messaging from '@react-native-firebase/messaging';
import ValidateOTP from '../scenes/EditProfile/otp';
import Terms from '../scenes/Signup/terms';
import ChangePassword from '../scenes/ChangePassword';
import ShopSelection from '../scenes/ShopSelection';
import ProviderShopSelection from '../scenes/ShopSelection/providerShop';
import CurrentProducts from '../scenes/CurrentProduct';
import Products from '../scenes/Products';
import Brand from '../scenes/Products/brand';
import AddProducts from '../scenes/CurrentProduct/addProducts';
import NewOrders from '../scenes/NewOrders';
import PastOrders from '../scenes/PastOrders';
import ProductDetails from '../scenes/Products/productetails';
import EditProduct from '../scenes/CurrentProduct/editproduct';
import Categories from '../scenes/Products/categories';
import ProductResults from '../scenes/Products/productResult';
import MyOrders from '../scenes/MyOrders';
import AddBrand from '../scenes/CurrentProduct/addBrand';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProviderProfileSetupNine from '../scenes/ProfileSetup/providerSetupNine';
import AdView from '../components/adView';
import EditQuestion from '../scenes/EditQuestion';
import { configPushNotifications } from '../services/configPush';
import ProviderProfessionSelection from '../scenes/ProfileSetup/providerProfessionSelection';
import SelectProfession from '../scenes/Settings/selectProfession';
import FavouriteProvider from '../scenes/FavouriteProvider';

const line = {
  borderBottomWidth: 0.4,
  borderColor: LIGHT_GRAY,
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const TopTabBar = createMaterialTopTabNavigator();

let messageId = '';

const Authentication = () => {
  const state = useSelector((state) => {
    return state;
  });
  const {
    CREATE_ACCOUNT,
    FORGOT_PASSWORD,
    PROFILE_SETUP,
    SELECT_A_PROMPT,
    WRITE_ANSWER,
    CANCEL,
    VERIFICATION,
  } = state['localeReducer']['locale'];
  return (
    <Stack.Navigator headerMode="screen">
      {/* <Stack.Screen name='providerProfileSetupSeven' component={ProviderProfileSetupSeven} options={{
                header: ({ scene, previous, navigation }) => (<Header navigation={navigation} isBack title={PROFILE_SETUP} />)
            }} /> */}

      <Stack.Screen
        name="roleSelection"
        component={RoleSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={CREATE_ACCOUNT} />
          ),
        }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              navigation={navigation}
              isTheme
              isBack
              title={'Terms & Conditions'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={FORGOT_PASSWORD} />
          ),
        }}
      />
      <Stack.Screen
        name="otpVerification"
        component={OTP}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={VERIFICATION} />
          ),
        }}
      />
      <Stack.Screen
        name="resetpassword"
        component={ResetPassword}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={'RESET PASSWORD'} />
          ),
        }}
      />
      <Stack.Screen
        name="profileSetupOne"
        component={ProfileSetupOne}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerBio"
        component={ProviderBio}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="profileSetupTwo"
        component={ProfileSetupTwo}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="profileSetupThree"
        component={ProfileSetupThree}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="profileSetupFour"
        component={ProfileSetupFour}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />

      <Stack.Screen
        name="profileSetupFive"
        component={ProfileSetupFive}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="profileSetupSix"
        component={ProfileSetupSix}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfileSetupThree"
        component={ProviderProfileSetupThree}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfileSetupFour"
        component={ProviderProfileSetupFour}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfessionSelection"
        component={ProviderProfessionSelection}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfileSetupFive"
        component={ProviderProfileSetupFive}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="addCustomServices"
        component={AddCustomService}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="customServiceList"
        component={CustomServiceList}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfileSetupSix"
        component={ProviderProfileSetupSix}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfileSetupSeven"
        component={ProviderProfileSetupSeven}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="updateProviderServices"
        component={UpdateProviderService}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="uploadLicense"
        component={uploadLicense}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="websitelink"
        component={ProviderProfileSetupNine}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={PROFILE_SETUP} />
          ),
        }}
      />
      <Stack.Screen
        name="prompt"
        component={Prompt}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              navigation={navigation}
              isBack
              title={SELECT_A_PROMPT}
              style={line}
            />
          ),
        }}
      />

      <Stack.Screen
        name="writeAnswer"
        component={WriteAnswer}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              onLeftPress={() => navigation.goBack()}
              leftText={CANCEL}
              navigation={navigation}
              title={WRITE_ANSWER}
              style={line}
            />
          ),
        }}
      />
      <Stack.Screen
        name="updateSubscription"
        component={updateSubscription}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const InProgressnavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inProgress"
        component={InProgressAppointment}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Pastnavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="past"
        component={PastAppointment}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const Upcomingnavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="upcoming"
        component={Upcoming}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MyAppointments = () => {
  return (
    <TopTabBar.Navigator
      tabBar={(props) => <MyTopTab {...props} />}
      tabBarOptions={{
        labelStyle: {
          fontSize: getFontSize(13),
          color: WHITE,
          fontFamily: montserratSemiBold,
        },
        style: { backgroundColor: THEME },
        activeTintColor: WHITE,
        indicatorStyle: { borderBottomColor: 'red', borderBottomWidth: 10 },
      }}>
      <TopTabBar.Screen name="inProgress" component={InProgressnavigator} />
      <TopTabBar.Screen name="past" component={Pastnavigator} />
      <TopTabBar.Screen name="upcoming" component={Upcomingnavigator} />
    </TopTabBar.Navigator>
  );
};

const TabZero = () => {
  const state = useSelector((state) => {
    return state;
  });
  const { BROWNCE, PROFILE } = state['localeReducer']['locale'];
  return (
    <Stack.Navigator headerMode="screen">
      {/* <Stack.Screen
        name="profileSetupThree"
        component={ProfileSetupThree}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header navigation={navigation} isBack title={'PROFILE_SETUP'} />
          ),
        }}
      /> */}
      <Stack.Screen
        name="tabZero"
        component={isCustomer() ? MyProfile : ProviderProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header isTheme navigation={navigation} title={BROWNCE} />
          ),
        }}
      />
      <Stack.Screen
        name="mySubscription"
        component={MySubscription}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Subscription Plans'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE}
            />
          ),
        }}
      />

      <Stack.Screen
        name="editProviderProfile"
        component={EditProviderProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE}
            />
          ),
        }}
      />
      <Stack.Screen
        name="validateOTP"
        component={ValidateOTP}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'OTP'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="customerDetail"
        isBack
        component={CustomerDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'CUSTOMER DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="spDetail"
        isBack
        component={SpDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'PROVIDER DETAIL'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Request = ({ navigation }) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => setFocused(true));
    navigation.addListener('blur', () => setFocused(false));
    return () => {
      navigation.removeListener('focus', () => { });
      navigation.removeListener('blur', () => { });
    };
  }, [navigation]);

  return (
    <>
      <TopTabBar.Navigator
        tabBar={(props) => <MyTopTab {...props} />}
        tabBarOptions={{
          labelStyle: {
            fontSize: getFontSize(13),
            color: WHITE,
            fontFamily: montserratSemiBold,
          },
          style: { backgroundColor: THEME },
          activeTintColor: WHITE,
          indicatorStyle: { borderBottomWidth: 10 },
        }}>
        <TopTabBar.Screen name="newRequest" component={NewRequest} />
        <TopTabBar.Screen
          name="inProgressRequest"
          component={InProgressRequest}
        />
        <TopTabBar.Screen name="upcomingRequest" component={UpcomingRequest} />
      </TopTabBar.Navigator>
      {(focused && !isCustomer()) ? <AdView /> : null}
    </>
  );
};

const TabOne = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  const { providerprofile } = state['profileReducer'];
  const { BROWNCE, PROFILE, SELECT_SERVICES, NEXT, BOOKING } = state[
    'localeReducer'
  ]['locale'];

  const dispatch = useDispatch();

  const available = () => {
    if (isProvider()) {
      const param = {
        [apiKey['IsAvailable']]: !providerprofile['IsAvailable'],
      };

      dispatch(getProviderAvailaibilityAction(param));
    }
  };

  return isCustomer() ? (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="tabOne"
        component={ProviderList}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              navigation={navigation}
              title={BROWNCE}
              source={locationIcon}
              onRightPress={() => navigation.navigate('discovery')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="providerDetail"
        component={ProviderDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={BOOKING}
            />
          ),
        }}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Product Detail'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="booking"
        component={Booking}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={BOOKING}
            />
          ),
        }}
      />
      <Stack.Screen
        name="deposit"
        component={Deposit}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'DEPOSIT'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="chat"
        isBack
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE}
            />
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="myorders"
        component={MyOrders}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'My Orders'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="serviceDetail"
        isBack
        component={ServiceDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'SERVICE DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="spDetail"
        isBack
        component={SpDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'PROVIDER DETAIL'}
            />
          ),
        }}
      />

      <Stack.Screen
        name="selectService"
        component={SelectService}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={SELECT_SERVICES}
              rightText={NEXT}
            />
          ),
        }}
      />
      <Stack.Screen
        name="discovery"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="discoveryOne"
        component={DiscoverOne}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="discoveryTwo"
        component={DiscoverTwo}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="discoveryThree"
        component={DiscoverThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="discoveryFour"
        component={DiscoverFour}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="request"
        component={Request}
        options={{
          gestureEnabled: false,
          header: ({ scene, previous, navigation }) => (
            <Header
              onRightPress={() => available()}
              source={providerprofile['IsAvailable'] ? toggleOn : toggleOff}
              isTheme
              navigation={navigation}
              title={BROWNCE}
            />
          ),
        }}
      />
      <Stack.Screen
        name="chat"
        isBack
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="serviceDetail"
        isBack
        component={ServiceDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'SERVICE DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="spDetail"
        isBack
        component={SpDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'PROVIDER DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="providerDetail"
        isBack
        component={ProviderDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'PROVIDER DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Product Detail'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="customerDetail"
        isBack
        component={CustomerDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'CUSTOMER DETAIL'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabTwo = ({ navigation }) => {
  const state = useSelector((state) => {
    return state;
  });
  const { MESSAGE, CHAT } = state['localeReducer']['locale'];

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => setFocused(true));
    navigation.addListener('blur', () => setFocused(false));
    return () => {
      navigation.removeListener('focus', () => { });
      navigation.removeListener('blur', () => { });
    };
  }, [navigation]);

  return (
    <>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="tabTwo"
          component={RecentChat}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header isTheme navigation={navigation} title={MESSAGE} />
            ),
          }}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="spDetail"
          isBack
          component={SpDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'PROVIDER DETAIL'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="customerDetail"
          isBack
          component={CustomerDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'CUSTOMER DETAIL'}
              />
            ),
          }}
        />
      </Stack.Navigator>
      {(focused && !isCustomer()) ? <AdView /> : null}
    </>
  );
};

const TabThree = ({ navigation }) => {
  const state = useSelector((state) => {
    return state;
  });
  const { SHOP_TALK, CREATE_QUESTION, BOOKING, BROWNCE } = state['localeReducer'][
    'locale'
  ];

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => setFocused(true));
    navigation.addListener('blur', () => setFocused(false));
    return () => {
      navigation.removeListener('focus', () => { });
      navigation.removeListener('blur', () => { });
    };
  }, [navigation]);

  return (
    <>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="tabThree"
          component={ForumList}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                navigation={navigation}
                title={SHOP_TALK}
                source={addWhiteIcon}
                onRightPress={() => navigation.navigate('createQuestion')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="forumDetailComment"
          component={ForumDetailComment}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="spDetail"
          isBack
          component={SpDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'PROVIDER DETAIL'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="customerDetail"
          isBack
          component={CustomerDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'CUSTOMER DETAIL'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="booking"
          component={Booking}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={BOOKING}
              />
            ),
          }}
        />

        <Stack.Screen
          name="deposit"
          component={Deposit}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'DEPOSIT'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="createQuestion"
          component={CreateQuestion}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={CREATE_QUESTION}
              />
            ),
          }}
        />
        <Stack.Screen
          name="editQuestion"
          component={EditQuestion}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'EDIT QUESTION'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="providerDetail"
          component={ProviderDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={BOOKING}
              />
            ),
          }}
        />
        <Stack.Screen
          name="productDetails"
          component={ProductDetails}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'Product Detail'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {(focused && !isCustomer()) ? <AdView /> : null}
    </>
  );
};

const TabFour = () => {
  const state = useSelector((state) => {
    return state;
  });
  const {
    APPOINTMENTS,
    REFERRAL,
    SELECT_A_PROMPT,
    SUPPORT,
    EARNINGS,
    SETTINGS,
    My_QUESTIONS,
    PROFILE,
    CANCEL,
    WRITE_ANSWER,
  } = state['localeReducer']['locale'];
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="tabFour"
        component={isCustomer() ? Menu : ProviderMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="favProvider"
        component={FavouriteProvider}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'MY FAVORITES'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={/* PROFILE */ SETTINGS}
            />
          ),
        }}
      />
      <Stack.Screen
        name="appointments"
        component={MyAppointments}
        options={{
          gestureEnabled: false,
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={APPOINTMENTS}
            />
          ),
        }}
      />
      <Stack.Screen
        name="serviceDetail"
        component={ServiceDetail}
        options={{
          gestureEnabled: false,
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'SERVICE DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="spDetail"
        isBack
        component={SpDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'PROVIDER DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="referral"
        component={Referral}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={REFERRAL}
            />
          ),
        }}
      />
      <Stack.Screen
        name="support"
        component={Support}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={SUPPORT}
            />
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Change Password'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="myQuestions"
        component={MyQuestions}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={My_QUESTIONS}
            />
          ),
        }}
      />

      <Stack.Screen
        name="myorders"
        component={MyOrders}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'My Orders'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forumDetailComment"
        component={ForumDetailComment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editPrompt"
        component={EditPrompt}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              navigation={navigation}
              isBack
              title={SELECT_A_PROMPT}
              style={line}
            />
          ),
        }}
      />
      <Stack.Screen
        name="editWriteAnswer"
        component={WriteAnswer}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              onLeftPress={() => navigation.goBack()}
              leftText={CANCEL}
              navigation={navigation}
              title={WRITE_ANSWER}
              style={line}
            />
          ),
        }}
      />
      <Stack.Screen
        name="providerProfile"
        component={ProviderCompleteProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={SETTINGS /* PROFILE */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Product Detail'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="serviceHistory"
        component={ServiceHistory}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'HISTORY'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="customerDetail"
        isBack
        component={CustomerDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'CUSTOMER DETAIL'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="funds"
        component={Funds}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'FUNDS'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="webView"
        component={webView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editProviderProfile"
        component={EditProviderProfile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={SETTINGS /* PROFILE */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="providerSetting"
        component={ProviderSetting}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="allServices"
        component={AllServices}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="changeCustomList"
        component={ChangeCustomServiceList}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="changeAddCustomService"
        component={ChangeAddCustomService}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              navigation={navigation}
              isBack
              title={PROFILE /* "SETTINGS" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="updatePrice"
        component={UpdatePrice}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={PROFILE /* SETTINGS */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="earnings"
        component={Earnings}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={EARNINGS}
            />
          ),
        }}
      />
      <Stack.Screen
        name="selectProfession"
        component={SelectProfession}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'Professions'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabFive = ({ navigation }) => {
  const state = useSelector((state) => {
    return state;
  });
  const {
    APPOINTMENTS,
    REFERRAL,
    SELECT_A_PROMPT,
    SUPPORT,
    EARNINGS,
    SETTINGS,
    My_QUESTIONS,
    PROFILE,
    CANCEL,
    WRITE_ANSWER,
  } = state['localeReducer']['locale'];

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => setFocused(true));
    navigation.addListener('blur', () => setFocused(false));
    return () => {
      navigation.removeListener('focus', () => { });
      navigation.removeListener('blur', () => { });
    };
  }, [navigation]);

  return (
    <>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name="tabFive"
          component={isCustomer() ? Products : ProviderShopSelection}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="currentProducts"
          component={CurrentProducts}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="products"
          component={Products}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="productresults"
          component={ProductResults}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="brands"
          component={Brand}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="categories"
          component={Categories}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addproducts"
          component={AddProducts}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'ADD PRODUCT'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="addbrand"
          component={AddBrand}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'ADD BRAND'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="editproduct"
          component={EditProduct}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'Edit product'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="neworders"
          component={NewOrders}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'New Orders'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="pastorders"
          component={PastOrders}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'Past Orders'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="productDetails"
          component={ProductDetails}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'Product Detail'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="myorders"
          component={MyOrders}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'My Orders'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="customerDetail"
          isBack
          component={CustomerDetail}
          options={{
            header: ({ scene, previous, navigation }) => (
              <Header
                isTheme
                isBack
                navigation={navigation}
                title={'CUSTOMER DETAIL'}
              />
            ),
          }}
        />
        <Stack.Screen
          name="chat"
          isBack
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {(focused && !isCustomer()) ? <AdView /> : null}
    </>
  );
};

const getTabBarVisible = (route) => {
  if (route['name'] === 'tabZero') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabZero';
    if (routeName === 'tabZero') return true;
    else return false;
  }
  if (route['name'] === 'tabOne') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabOne' || 'request';
    if (routeName === 'tabOne' || routeName === 'request') return true;
    else return false;
  } else if (route['name'] === 'tabTwo') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabTwo';
    if (routeName === 'tabTwo') return true;
    else return false;
  } else if (route['name'] === 'tabThree') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabThree';
    if (routeName === 'tabThree') return true;
    else return false;
  } else if (route['name'] === 'tabFour') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabFour';
    if (routeName === 'tabFour') return true;
    else return false;
  } else if (route['name'] === 'tabFive') {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'tabFive';
    if (routeName === 'tabFive' || routeName === 'request') return true;
    else if (routeName === 'currentProducts') return true;
    else if (routeName === 'products') return true;
    else if (routeName === 'brands') return true;
    else if (routeName === 'categories') return true;
    else if (routeName === 'productresults') return true;
    else return false;
  }
};

const BottomtabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <MyBottomTab {...props} />}
      tabBarOptions={{
        style: {
          backgroundColor: LIGHT_BROWN,
        },
      }}>
      <BottomTab.Screen
        name="tabZero"
        component={TabZero}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <BottomTab.Screen
        name="tabOne"
        component={TabOne}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <BottomTab.Screen
        name="tabTwo"
        component={TabTwo}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <BottomTab.Screen
        name="tabThree"
        component={TabThree}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <BottomTab.Screen
        name="tabFive"
        component={TabFive}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />

      <BottomTab.Screen
        name="tabFour"
        component={TabFour}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
    </BottomTab.Navigator>
  );
};

const DrawerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bottomTab"
        component={BottomtabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="customerDetail"
        isBack
        component={CustomerDetail}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              isTheme
              isBack
              navigation={navigation}
              title={'CUSTOMER DETAIL'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const [isLoading, setLoading] = useState(true);
  const [loginToken, setToken] = useState(null);
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={(props) => <MyDrawer {...props} />}
      drawerStyle={{
        backgroundColor: THEME,
        width: SCREEN_WIDTH - dynamicSize(70),
      }}>
      <Drawer.Screen name="search" component={DrawerStackNavigator} />
    </Drawer.Navigator>
  );
};

const RootNavigation = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const state = useSelector((state) => {
    return state;
  });
  const [isLoading, setLoading] = useState(true);
  const [loginToken, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoginToken = async () => {
      const logToken = await getData(localKey['LOGIN_TOKEN']);
      const userRole = await getData(localKey['ROLE']);
      console.log('logToken => ', logToken);
      if (logToken) {
        serviceConst['token'] = logToken;
        serviceConst['role'] = userRole;
        setToken(logToken);
        setLoading(false);
        dispatch(markNotificationAsReadAction());
      } else setLoading(false);
    };
    fetchLoginToken();
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification', remoteMessage);
      // common(remoteMessage.data.ChatId)
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          // common(remoteMessage.data.ChatId)
        }
      });
    messaging().onMessage(async (remoteMessage) => {
      console.log('newMessage==>', remoteMessage);
      if (isIOS) {
        if (messageId != remoteMessage?.['messageId']) {
          messageId = remoteMessage?.['messageId'];
          PushNotificationIOS.addNotificationRequest({
            id: remoteMessage?.['messageId'].toString(),
            body: remoteMessage?.['notification']?.['body'],
            userInfo: remoteMessage.notification,
            alertTitle: remoteMessage?.['notification']?.['body'],
            alertBody: remoteMessage?.['notification']?.['title'],
          });
        }
      }
      // if (Platform.OS === 'android') {
      //     const localNotification = new firebase.notifications.Notification()
      //         .android.setSmallIcon('R.mipmap.ic_notification') // create this icon in Android Studio
      //         .android.setPriority(firebase.notifications.Android.Priority.High);
      //     firebase.notifications()
      //         .displayNotification(localNotification)
      //         .catch(err => console.error(err));
      // }
    });
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [loginToken]);

  const common = (id) => {
    id === 0 ? navigate('tabOne') : navigate('tabTwo');
  };

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);

    if (appState.current === 'background') {
      configPushNotifications();
      messaging()
        .hasPermission()
        .then((enabled) => {
          console.log('enabled', enabled);
          if (enabled != -1) {
            getToken();
          } else {
            requestPermission();
          }
        })
        .catch((error) => {
          console.log('FCMTOKEN==<<', error);
        });
    } else if (appState.current === 'active') {
      configPushNotifications();
      messaging()
        .hasPermission()
        .then((enabled) => {
          if (enabled != -1) {
            getToken();
          } else {
            requestPermission();
          }
        })
        .catch((error) => {
          console.log('FCMTOKEN==<<', error);
        });
    }
  };

  const getToken = async () => {
    messaging()
      .getToken()
      .then(async (fcmToken) => {
        serviceConst.deviceToken = fcmToken;
        await AsyncStorage.setItem('fcmToken', fcmToken);
      });
  };

  const requestPermission = async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED)
        getToken();
      else if (authorizationStatus === messaging.AuthorizationStatus.DENIED)
        console.log('Permission denied by user');
      else getToken();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  const handleDynamicLink = (link) => {
    handleDynamicLinkNavigation(link)
    console.log('dynam,ic link=>', link)
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        handleDynamicLinkNavigation(link)
      })
    return () => unsubscribe();
  }, [])

  const handleDynamicLinkNavigation = (link) => {
    console.log('dynamic link ==>', link)
    try {
      if (link?.url?.includes('/profile-id/')) {
        const splited = link?.url?.split('/profile-id/')
        if (splited?.length > 0) {
          const splitAnotherDetail = splited?.[splited?.length - 1]?.split('/')
          const userId = splitAnotherDetail?.[1]
          const userType = splitAnotherDetail?.[0]
          console.log('userType===>', userType, 'userid==>', userId)
          if (userType == 'customer') {
            setTimeout(() => {
              navigate('customerDetail', { id: userId })
            }, 500);
          }
          else if (userType == 'provider') {
            setTimeout(() => {
              navigate('spDetail', { id: userId })
            }, 500);
          }
        }
      }
    } catch (error) {

    }

  }

  if (isLoading)
    return (
      <MyView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: WHITE,
        }}>
        <MyIndicator size={'small'} />
      </MyView>
    );
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName={loginToken ? 'bottomTab' : 'auth'}>
        <Stack.Screen
          name="auth"
          component={Authentication}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name='drawer' component={DrawerNavigator} options={{ gestureEnabled: false, animationEnabled: false, headerShown: false }} /> */}
        <Stack.Screen
          name="bottomTab"
          component={BottomtabNavigator}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
