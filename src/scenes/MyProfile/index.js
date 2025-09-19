import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  MyText,
  MyImage,
  Touchable,
  Loader,
  TouchableIcon,
  CustomModal,
  Button,
  SecondaryButton,
  EmptyMessage,
  Input,
  CustomDropDown,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  getGenderAction,
  getHairTypeAction,
  getNotificationCountAction,
  getProfileAction,
  getProfileSuccessAction,
  getProviderProfileAction,
  loaderAction,
  saveHairTypeAction,
  updateCustomerProfilePicAction,
  updateHairTypeAction,
  updateInlineProfileAction,
} from '../../redux/action';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { SCREEN_HEIGHT, SCREEN_WIDTH, getData, isAndroid, isCustomer, locationMapping, logAnalyticEvent, onShare, storeData } from '../../components/helper';
import { generateDynamicLink } from '../../utils/dynamicLinkHelper';
import OneSignal from 'react-native-onesignal';
import { CUSTOMER_DASHBOARD } from '../../components/eventName';
import { coachmarkBeautyFinder, coachmarkHome, coachmarkMarketPlace, coachmarkMenu, coachmarkMessage, coachmarkShopTalk, crossBold, editWhiteIcon, genderIcon, imagePlaceholder, pencil, pointerFinger, profileSmallCamera, shareThemeIcon } from '../../components/icons';
import MyCoachMarks from '../../components/coachmarks';
import localKey from '../../utils/localKey';
import { BLACK, LIGHT_GRAY, THEME, WHITE } from '../../utils/colors';
import ImagePickerSelection from '../../components/imagePickerSelection';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { reverseGeocode } from '../../services';
import { apiKey } from '../../services/serviceConstant';
import { interMedium } from '../../utils/fontFamily';

// @ Customer Profile UI
let timeout

const TYPES = {
  NAME: 'name',
  USERNAME: 'username',
  QA_DESCRIPTION: 'qa_description'
}

const EDIT_FIELD_TYPE = {
  NAME: 'name',
  GENDER: 'gender'
}

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
    HERE_IS_YOUR_MENU_CUSTOMER_DESCRIPTION,
    IT_SEEMS_THAT_THERE_ARE_NO_HAIRTYPES_FOUND,
    CONTINUE,
    AGE,
    CANCEL,
    SAVE,
    NAME,
    USERNAME,
    PLEASE_ENTER_AN_USERNAME,
    PLEASE_ENTER_NAME,
    PLEASE_SELECT_YOUR_HAIR_TYPE,
    DESCRIPTION
  } = state[
  'localeReducer'
  ]['locale'];
  const { profile } = state['profileReducer'];
  const { loading } = state['loaderReducer'];
  const { hariTypes } = state['hairReducer']

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
  const [isShow, setShow] = useState(false)
  const [uri, seturi] = useState(profile?.['ProfilePic'])
  const [profilePic, setProfilePic] = useState(profile?.['ProfilePic'])
  const [imageData, setImageData] = useState({})
  const [dob, setDob] = useState(profile?.['DOB'])
  const [age, setAge] = useState(profile?.['Age'])
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [mapModalVisible, setMapModalVisible] = useState(false)
  const [latitude, setlatitude] = useState(profile?.Latitude || 40.38190380557175)
  const [longitude, setlongitude] = useState(profile?.Longitude || -75.90530281564186)
  const [hairTypeModal, setHairTypeModal] = useState(false)
  const [fieldModalVisible, setFieldModalVisible] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState({ nameError: '', userNameError: '' })
  const [genderModalPicker, setGenderModalPicker] = useState(false)
  const [selectedGender, setSelectedGender] = useState({})
  const [genderData, setGenderData] = useState([])
  const [genderId, setGenderId] = useState()
  const [qaPromptModal, setQAPromptModal] = useState(false)
  const [qaDescription, setQaDescription] = useState('')

  const selectedPromptDetail = useRef({})

  // @ refetch details of customer profile
  useFocusEffect(
    useCallback(() => {
      // dispatch(loaderAction(true));
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
        setDob(profile?.['DOB'])
        setAge(profile?.['Age'])
        setlatitude(profile?.Latitude || 40.38190380557175)
        setlongitude(profile?.Longitude || -75.90530281564186)
        logAnalyticEvent(CUSTOMER_DASHBOARD, data)
        setName(profile?.['Name'] || '')
        setUsername(profile?.['Username'] || '')
        setSelectedGender(profile?.['Gender'])
        seturi(profile?.['ProfilePic'] || '')
        setProfilePic(profile?.['ProfilePic'] || '')
      }
    }, [profile])
  )

  useEffect(() => {
    console.log("profile====>", JSON.stringify(profile))
    // Pass in email provided by customer
    if (profile?.Email) OneSignal.setEmail(profile?.Email);
    if (profile?.['HairType']) {
      dispatch(getHairTypeAction(profile?.['HairType']))
    }
    dispatch(getGenderAction((response) => {
      if (response.status == 200) {
        const newResult = response.data?.result?.map(each => { return { ...each, value: each['Name'], id: each['Id'] } }) || []
        setGenderData(newResult || [])
      }
    }))
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

  const _openPicker = () => setShow(true)

  const _closePicker = () => setShow(false)

  const _getImage = data => {
    if (data?.['uri']) {
      seturi(data?.['uri'])
      setImageData(data)
      setProfilePic(data?.['uri'])
      setShow(false)
      _saveProfile(data)
    }
  }

  const openDatePicker = () => setDatePickerVisible(true)

  const closeDatePicker = () => setDatePickerVisible(false)

  const openMapModal = () => setMapModalVisible(true)

  const closeMapModal = () => setMapModalVisible(false)

  const openHairTypeModal = () => setHairTypeModal(true)

  const closeHairTypeModal = () => setHairTypeModal(false)

  const openGenderModal = () => setGenderModalPicker(true)

  const closeGenderModal = () => setGenderModalPicker(false)

  const openQaPromptModal = () => setQAPromptModal(true)

  const closeQaPromptModal = () => setQAPromptModal(false)

  const _selectedDate = date => {
    console.log("date==>", date)
    if (date) {
      closeDatePicker()
      const formData = new FormData()
      formData.append('key', 'Dob')
      formData.append(apiKey['DOB'], moment(date).format('YYYY-MM-DD'))
      updateInlineProfile(formData)
    }
  }

  const closeAndResetHairModalType = () => {
    const replica = [...hariTypes]
    for (let i = 0; i < hariTypes.length; i++) {
      if (replica[i]['HairTypeName'] == profile['HairType']) {
        replica[i]['localStatus'] = true
      }
      else {
        replica[i]['localStatus'] = false
      }
    }
    dispatch(updateHairTypeAction([...replica]))
    closeHairTypeModal()
  }

  const _onDragEnd = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    setlatitude(latitude)
    setlongitude(longitude)
  }

  const closeMapModalFuntion = async () => {
    closeMapModal()
    const response = await reverseGeocode({ latitude: 28.5261, longitude: 77.0800 })
    if (response.status == 'OK') {
      const place = response?.result?.[0]
      console.log('place==>', place?.address_components)
      const city = (() => {
        return place?.address_components?.filter(address => address.types.includes('postal_town'))?.[0]?.short_name ||
          place?.address_components?.filter(address => address.types.includes('locality'))?.[0]?.short_name ||
          place?.address_components?.filter(address => address.types.includes('political'))?.[0]?.short_name || ''
      })()
      const userState = (() => {
        return place?.address_components?.filter(address => address.types.includes('administrative_area_level_1'))?.[0]?.short_name ||
          place?.address_components?.filter(address => address.types.includes('administrative_area_level_2'))?.[0]?.short_name ||
          place?.address_components?.filter(address => address.types.includes('political'))?.[0]?.short_name || ''
      })()
      console.log("city==>", city)
      console.log("userState==>", userState)
      const formData = new FormData()
      formData.append('key', 'Location')
      formData.append(apiKey['CITY_NAME'], city)
      formData.append(apiKey['STATE_NAME'], userState)
      formData.append(apiKey['LATITUDE'], latitude)
      formData.append(apiKey['LONGITUDE'], longitude)
      updateInlineProfile(formData)
      // setFormField(prevState => ({ ...prevState, selectedCity: city, selectedUserState: userState }))
    }
  }

  const _selectHairType = (item, index) => () => {
    const replica = [...hariTypes]
    // const filterSelected = hariTypes?.filter(each => each.localStatus)
    // if (filterSelected?.length == 4 && !item.localStatus) return
    for (let i = 0; i < hariTypes.length; i++) {
      if (item['HairTypeMasterId'] === replica[i]['HairTypeMasterId']) {
        replica[i]['localStatus'] = true
      }
      else {
        replica[i]['localStatus'] = false
      }
    }
    dispatch(updateHairTypeAction([...replica]))
  }

  const saveHairType = () => {
    const selected = hariTypes.filter(item => { if (item['localStatus']) return item }).map(each => { return each['HairTypeMasterId'] })
    if (selected.length) {
      const formData = new FormData()
      formData.append('key', 'HairType')
      formData.append(apiKey['HAIR_TYPE_ID'], selected.toString())
      updateInlineProfile(formData)
      closeHairTypeModal()
    }
    else showToast(PLEASE_SELECT_YOUR_HAIR_TYPE)
  }

  const openNamePicker = () => setFieldModalVisible(true)

  const closeNamePicker = () => setFieldModalVisible(false)

  const closeAndResetNamePicker = () => {
    closeNamePicker()
    setName(profile?.['Name'] || '')
    setUsername(profile?.['Username'] || '')
  }

  const _onChangeText = type => text => {
    console.log('tyesp=.>', type)
    if (type == TYPES.NAME) {
      setName(text)
    }
    else if (type == TYPES.USERNAME) {
      setUsername(text.replace(/\s/g, ''))
    }
    else if (type == TYPES.QA_DESCRIPTION) {
      setQaDescription(text)
    }

  }

  const saveNameAndUsername = () => {
    let isValid = true
    if (!name?.trim()) {
      isValid = false
      setError(prevState => ({ ...prevState, nameError: PLEASE_ENTER_NAME }))
    }
    if (!username?.trim()) {
      isValid = false
      setError(prevState => ({ ...prevState, userNameError: PLEASE_ENTER_AN_USERNAME }))
    }
    if (isValid) {
      setError(prevState => ({ ...prevState, nameError: '', userNameError: '' }))
      const formData = new FormData()
      formData.append('key', 'Username')
      formData.append(apiKey['FIRSTNAME'], name)
      formData.append(apiKey['user_name'], username)
      updateInlineProfile(formData)
      closeNamePicker()
    }
  }



  const updateInlineProfile = (formData) => {
    console.log("formdata==>", formData)
    dispatch(updateInlineProfileAction(formData))
  }

  const _selectPrompt = (item, index) => () => {
    setQaDescription(item?.AnswerText || '')
    openQaPromptModal()
    selectedPromptDetail.current = { ...item, index }
    // navigation.navigate('editPrompt', { ...item, index })
  }

  const _changeGender = (value, index, data) => {
    console.log("asdasdsad===>", value, index, data)
    // setFormField(prevState => ({ ...prevState, genderId: data[index]['Id'] }))
    setGenderId(data[index]['Id'])
    // setSelectedGender(data[index]['Name'])
  }

  const saveGenderInline = () => {
    const formData = new FormData()
    formData.append('key', 'Gender')
    formData.append('Gender', genderId)
    updateInlineProfile(formData)
    closeGenderModal()
  }

  const closeAndResetQa = () => {
    closeQaPromptModal()
    selectedPromptDetail.current = {}
    setQaDescription('')
  }

  const saveQaValue = () => {
    if (qaDescription?.trim()?.length && selectedPromptDetail.current?.ProfileQuestionMasterId) {
      const formData = new FormData()
      formData.append('key', 'question')
      formData.append("Question", selectedPromptDetail.current?.ProfileQuestionMasterId)
      formData.append("Answer", qaDescription)
      updateInlineProfile(formData)
      closeAndResetQa()
    }
  }

  const _saveProfile = (image) => {
    dispatch(loaderAction(true))
    const formData = new FormData()
    console.log("imags===>", image)
    image?.['uri'] && formData.append(apiKey['PROFILE_PIC'], image)
    if (image?.uri) dispatch(updateCustomerProfilePicAction(formData, () => {
      if (isCustomer()) {
        dispatch(getProfileAction());
      } else {
        dispatch(getProviderProfileAction());
      }
    }))
  }

  // @render hair types
  const _renderItem = ({ item, index }) => {
    return (
      <MyView style={styles['cardStyle']}>
        <MyView>
          <MyText style={[styles['uploadText'], { marginVertical: 0 }]}>
            {item['QuestionText']}
          </MyText>
          <MyText style={styles['description']}>{item['AnswerText']}</MyText>
        </MyView>
        <TouchableIcon onPress={_selectPrompt(item, index)} source={pencil} style={{ marginLeft: 10 }} />
      </MyView>
    );
  };

  const _renderEmptyHairType = () => {
    if (!loading) {
      return (<EmptyMessage message={IT_SEEMS_THAT_THERE_ARE_NO_HAIRTYPES_FOUND} />)
    }
    else return (<EmptyMessage message={LOADING} />)
  }

  const _renderHairType = ({ item, index }) => {
    const isSelected = item?.localStatus
    return (
      <SecondaryButton
        onPress={_selectHairType(item, index)}
        style={[isSelected ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5), marginRight: index % 2 == 1 ? 0 : 20 }]}
        textStyle={isSelected ? styles['selectedText'] : styles['unselectedText']}
        text={item['HairTypeName']}
      />
    )
  }

  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        paddingBottom: -useSafeAreaInsets().bottom,
        backgroundColor: THEME
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
        <MyView style={{ flexDirection: 'row' }}>
          <MyView style={{ flex: 1 }} />
          <MyView>
            <MyImage
              source={uri ? { uri: uri ? uri : profile['ProfilePic'] } : imagePlaceholder}
              style={styles['image']}
            />
            <TouchableIcon
              source={profileSmallCamera}
              style={styles.absoluteCamera}
              onPress={_openPicker}
            />
          </MyView>
          <MyView style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={_onShareButton} style={styles['shareContainer']}>
              <MyImage source={shareThemeIcon} />
              <MyText style={styles['editText']}>{SHARE}</MyText>
            </TouchableOpacity>
          </MyView>
        </MyView>
        <MyView style={styles.nameContainer}>
          <MyView>
            <MyText style={styles['name']}>
              {profile?.['Name'] ? profile?.['Name'] : LOADING}
            </MyText>
            <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>
              {profile?.['Username'] ? `@${profile?.['Username']}` : LOADING}
            </MyText>
          </MyView>
          <TouchableIcon onPress={() => {
            openNamePicker()

          }} source={pencil} style={{ marginLeft: 10 }} />
        </MyView>
        <MyView style={styles.eachProfileDetailCard}>
          <MyView style={{ flex: 1 }}>
            <MyText style={styles['detailLabel']}>{`${AGE}: ${age ? age : LOADING}`}</MyText>
          </MyView>
          <TouchableIcon onPress={openDatePicker} source={pencil} />
        </MyView>
        <MyView style={styles.eachProfileDetailCard}>
          <MyView style={{ flex: 1 }}>
            <MyText style={styles['detailLabel']}>{`${GENDER}: ${profile?.['Gender'] ? profile?.['Gender'] : LOADING}`}</MyText>
          </MyView>
          <TouchableIcon onPress={openGenderModal} source={pencil} />
        </MyView>
        <MyView style={[styles.eachProfileDetailCard, { borderBottomWidth: 0 }]}>
          <MyView style={{ flex: 1 }}>
            <MyText style={styles['detailLabel']}>{`${LOCATION}: ${locationMapping(profile)}`}</MyText>
          </MyView>
          <TouchableIcon onPress={openMapModal} source={pencil} />
        </MyView>
        <CurveView
          style={styles['curveMain']}
          innerStyle={styles['innerStyle']}
        />
        <MyView style={styles['lowerContainer']}>
          <MyView style={{ flexDirection: 'row' }}>
            <MyText style={styles['hairType']}>
              {`${HAIR_TYPE}:  ${profile?.['HairType'] ? profile?.['HairType'] : LOADING}`}
            </MyText>
            <TouchableIcon onPress={openHairTypeModal} source={pencil} style={{ marginLeft: 10 }} />
          </MyView>
          {/* <MyText style={styles['hairType']}>
            {`${'Tenderhead Level'}:  `}
            <MyText style={styles['value']}>
              {profile?.['TenderHeadLevel'] !== null
                ? profile['TenderHeadLevel']
                : 0}
            </MyText>
          </MyText> */}
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
      <ImagePickerSelection isCircularCrop={true} pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
      {/* <DateTimePicker maxDate={new Date()} selectedDate={_selectedDate} /> */}
      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={datePickerVisible}
        mode={'date'}
        value={dob ? moment(dob).toDate() : moment().toDate()}
        display={'spinner'}
        onConfirm={_selectedDate}
        onCancel={closeDatePicker}
      />
      <CustomModal
        isVisible={hairTypeModal}
        animationType='slide'
      >
        <MyView style={{ maxHeight: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH - dynamicSize(20), backgroundColor: WHITE, borderRadius: 10, flex: 1 }}>
          <MyText style={{ marginVertical: 10, paddingHorizontal: 20, fontFamily: interMedium }}>{HAIR_TYPE}</MyText>
          <MyView style={{ flex: 1, backgroundColor: WHITE }}>
            <FlatList
              key='hairType'
              data={hariTypes}
              ListEmptyComponent={_renderEmptyHairType}
              keyExtractor={_keyExtractor}
              renderItem={_renderHairType}
              contentContainerStyle={[styles['hairTypeFlatList'], { paddingHorizontal: 20 }]}
              numColumns={2}
            />
            <MyView style={{ flexDirection: 'row', paddingHorizontal: dynamicSize(20), justifyContent: 'space-between' }}>
              <SecondaryButton onPress={closeAndResetHairModalType} text={CANCEL} style={{ borderColor: THEME }} textStyle={{ color: THEME }} />
              <SecondaryButton onPress={saveHairType} text={SAVE} style={{ backgroundColor: THEME, borderColor: THEME }} textStyle={{ color: WHITE }} />
            </MyView>
          </MyView>
        </MyView>
      </CustomModal>
      <CustomModal
        isVisible={mapModalVisible}
        animationType='slide'
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles['mapView']}
          initialRegion={{
            latitude: latitude ? parseFloat(latitude) : 40.38190380557175,
            longitude: longitude ? parseFloat(longitude) : -75.90530281564186,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,

          }}
        >
          <MapView.Marker
            draggable
            onDragEnd={_onDragEnd}
            coordinate={{ latitude: latitude ? parseFloat(latitude) : 40.38190380557175, longitude: longitude ? parseFloat(longitude) : -75.90530281564186 }}
            pinColor={THEME}
          />
        </MapView>
        <Button onPress={closeMapModalFuntion} style={[styles['buttonStyle'], { position: 'absolute', zIndex: 10, bottom: useSafeAreaInsets().bottom + dynamicSize(10), alignSelf: 'center' }]} text={CONTINUE} textStyle={{ color: WHITE }} />
      </CustomModal>
      <CustomModal
        isVisible={fieldModalVisible}
        animationType='slide'
      >
        <MyView style={{ maxHeight: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH - dynamicSize(20), backgroundColor: WHITE, borderRadius: 10, alignItems: 'center', paddingVertical: 20 }}>
          <MyView >
            <Input
              style={{ borderBottomColor: THEME, marginVertical: SCREEN_HEIGHT * 0.02 }}
              value={name}
              placeholder={NAME}
              onChangeText={_onChangeText(TYPES.NAME)}
              returnKeyType='done'
              styleContainer={{ alignSelf: 'center' }}
              containerStyle={{ backgroundColor: WHITE }}
              errorMessage={error.nameError}
            />
            <Input
              style={{ borderBottomColor: THEME }}
              value={username}
              placeholder={USERNAME}
              onChangeText={_onChangeText(TYPES.USERNAME)}
              returnKeyType='done'
              styleContainer={{ alignSelf: 'center' }}
              containerStyle={{ backgroundColor: WHITE }}
              errorMessage={error.userNameError}
            />
            <MyView style={{ flexDirection: 'row', paddingHorizontal: dynamicSize(20), justifyContent: 'space-between', marginTop: 10 }}>
              <SecondaryButton onPress={closeAndResetNamePicker} text={CANCEL} style={{ borderColor: THEME }} textStyle={{ color: THEME }} />
              <SecondaryButton onPress={saveNameAndUsername} text={SAVE} style={{ backgroundColor: THEME, borderColor: THEME }} textStyle={{ color: WHITE }} />
            </MyView>
          </MyView>
        </MyView>
      </CustomModal>
      <CustomModal
        isVisible={genderModalPicker}
        animationType='slide'
      >
        <MyView style={{ maxHeight: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH - dynamicSize(20), backgroundColor: WHITE, borderRadius: 10, alignItems: 'center', paddingVertical: 20 }}>
          <MyView >
            <MyText style={{ marginVertical: 10, paddingHorizontal: 20, fontFamily: interMedium }}>{GENDER}</MyText>
            <CustomDropDown
              onChange={_changeGender}
              source={genderIcon}
              data={genderData}
              value={selectedGender}
              topOffset={dynamicSize(20)}
              containerStyle={{ borderBottomColor: BLACK, borderBottomWidth: 2 }}
              style={{
                alignSelf: 'center',
                width: SCREEN_WIDTH - 80,
              }}
            />
            <MyView style={{ flexDirection: 'row', paddingHorizontal: dynamicSize(20), justifyContent: 'space-between', marginTop: 10 }}>
              <SecondaryButton onPress={closeGenderModal} text={CANCEL} style={{ borderColor: THEME }} textStyle={{ color: THEME }} />
              <SecondaryButton onPress={saveGenderInline} text={SAVE} style={{ backgroundColor: THEME, borderColor: THEME }} textStyle={{ color: WHITE }} />
            </MyView>
          </MyView>
        </MyView>
      </CustomModal>
      <CustomModal
        isVisible={qaPromptModal}
        animationType='slide'
      >
        <MyView style={{ maxHeight: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH - dynamicSize(20), backgroundColor: WHITE, borderRadius: 10, alignItems: 'center', paddingVertical: 20 }}>
          <MyView >
            <MyText style={{ marginVertical: 10, paddingHorizontal: 20, fontFamily: interMedium }}>{selectedPromptDetail?.current?.QuestionText}</MyText>
            <Input
              style={{ borderBottomColor: THEME, marginVertical: SCREEN_HEIGHT * 0.02 }}
              value={qaDescription}
              placeholder={DESCRIPTION}
              onChangeText={_onChangeText(TYPES.QA_DESCRIPTION)}
              returnKeyType='enter'
              styleContainer={{ alignSelf: 'center' }}
              containerStyle={{ backgroundColor: WHITE }}
              multiline
            />
            <MyView style={{ flexDirection: 'row', paddingHorizontal: dynamicSize(20), justifyContent: 'space-between', marginTop: 10 }}>
              <SecondaryButton onPress={closeAndResetQa} text={CANCEL} style={{ borderColor: THEME }} textStyle={{ color: THEME }} />
              <SecondaryButton onPress={saveQaValue} text={SAVE} style={{ backgroundColor: THEME, borderColor: THEME }} textStyle={{ color: WHITE }} />
            </MyView>
          </MyView>
        </MyView>
      </CustomModal>
    </SafeArea>
  );
};

export default MyProfile;