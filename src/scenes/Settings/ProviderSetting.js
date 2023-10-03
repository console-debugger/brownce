import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, SecondaryButton, TouchableIcon, Button, Touchable, Loader, NormalInput, PopupMenuOption } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { cameraIcon, downArrow, imagePlaceholder, plusIcon, redCrossIcon } from '../../components/icons'
import { DARK_GRAY, GRAY, LIGHT_GRAY, TRANSPARENT_LIGHT_BLACK, WHITE } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { saveProviderPortfolioAction, deleteProviderPortfolio, getAllServicesAction, updateServicesAction, getCustomServicesAction, updateCustomServicesAction, getServicesByProfessionAction, updateProviderSettingAction, loaderAction, updateServiceProviderProfilePicAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { apiKey } from '../../services/serviceConstant'
import MultipleImagePickerSelection from '../../components/multipleImageSelection'
import ImagePickerSelection from '../../components/imagePickerSelection'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'
import moment from 'moment'

let timeout
// Provider setting
const openData = [
    {
        name: '00:00 AM'
    },
    {
        name: '01:00 AM'
    },
    {
        name: '02:00 AM'
    },
    {
        name: '03:00 AM'
    },
    {
        name: '04:00 AM'
    },
    {
        name: '05:00 AM'
    },
    {
        name: '06:00 AM'
    },
    {
        name: '07:00 AM'
    },
    {
        name: '08:00 AM'
    },
    {
        name: '09:00 AM'
    },
    {
        name: '10:00 AM'
    },
    {
        name: '11:00 AM'
    },
    {
        name: '12:00 PM'
    },
    {
        name: '01:00 PM'
    },
    {
        name: '02:00 PM'
    },
    {
        name: '03:00 PM'
    },
    {
        name: '04:00 PM'
    },
    {
        name: '05:00 PM'
    },
    {
        name: '06:00 PM'
    },
    {
        name: '07:00 PM'
    },
    {
        name: '08:00 PM'
    },
    {
        name: '09:00 PM'
    },
    {
        name: '10:00 PM'
    },
    {
        name: '11:00 PM'
    },
]

const ProviderSetting = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CHANGE_PORTFOLIO, UPDATE, WEBSITE, HOURS_CAPS, BIO, CLOSED, BIO_SMALL, HOURS_OF_OPERATION, PORTFOLIO, SERVICES, WEBSITE_SMALL } = state['localeReducer']['locale']
    const { providerprofile } = state.profileReducer
    const { ServicesProvided } = state.profileReducer.providerprofile
    const { services } = state['hairReducer']
    const { loading } = state['loaderReducer']

    const [isrefresh, setisrefresh] = useState(false)
    const [isShow, setShow] = useState(false)
    const [portfolioData, setportfolioData] = useState([{ uri: "" }])
    const [filterimageid, setfilterimageid] = useState([])
    const [showImagePicker, setShowImagePicker] = useState(false)
    const [profilePic, setProfilePic] = useState(providerprofile?.['ProfilePic'])
    const [imageData, setImageData] = useState({})
    const [uri, seturi] = useState(providerprofile?.['ProfilePic'])
    const [tabData] = useState([
        {
            name: WEBSITE,
            key: 0
        },
        {
            name: HOURS_CAPS,
            key: 1
        },
        {
            name: BIO,
            key: 2
        },
        {
            name: PORTFOLIO,
            key: 3
        },
        {
            name: SERVICES,
            key: 4
        },
    ])
    const [weekDaysData, setWeekDaysData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [websiteLink, setWebsiteLink] = useState(providerprofile?.Weblink || '')
    const [bio, setBio] = useState(providerprofile?.Bio || '')

    const scrollViewRef = useRef()

    useEffect(() => {
        getImages()
        console.log('asdasasddsad===>', JSON.stringify(providerprofile))
    }, [])

    useEffect(() => {
        if (providerprofile?.Timings) {
            providerprofile?.Timings?.forEach(each => {
                each.openTimeData = openData
            })
            setWeekDaysData(providerprofile?.Timings || [])
        }
        setRefresh(prevState => !prevState)
    }, [providerprofile?.Timings])

    useFocusEffect(
        useCallback(() => {
            dispatch(getAllServicesAction())
            const param = {
                "Search": ''
            }
            dispatch(getCustomServicesAction(param))
            const servicesList = ServicesProvided?.map(item => { return { ...item, status: true } }) || []
            const customservicesList = providerprofile?.['ServicesProvidedCustom']?.map(item => { return { ...item, status: true } }) || []
            dispatch(updateServicesAction(servicesList))
            dispatch(updateCustomServicesAction(customservicesList))
        }, [])
    )

    const getImages = async () => {
        const newData = providerprofile['Portfolios'].map(item => ({ ...item, uri: item.ImagePath }))
        await setportfolioData([...newData, { uri: '' }])
    }

    const _getImage = data => {
        if (portfolioData.length <= 1) setportfolioData([...data, ...portfolioData])
        else {
            const dataLength = portfolioData.length
            portfolioData.splice(dataLength - 1, 0, ...data)
        }
        setShow(false)
    }

    const _getSingleImage = data => {
        if (data?.['uri']) {
            seturi(data?.['uri'])
            setImageData(data)
            setProfilePic(data?.['uri'])
            _closeImagePicker()
        }
    }

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _openImagePicker = () => setShowImagePicker(true)

    const _closeImagePicker = () => setShowImagePicker(false)

    const _selectHairType = (item, index) => {
        const replica = [...services]
        replica[index]['status'] = !replica[index]['status']
        dispatch(updateServicesAction(replica))
        setisrefresh(!isrefresh)
    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _renderFooter = () => (
        <Touchable style={[styles['portfolioView'], { backgroundColor: LIGHT_GRAY }]}>
            <MyImage source={plusIcon} />
        </Touchable>
    )

    const removeImage = (uri, id) => {
        const filteredData = portfolioData.filter(item => item.uri !== uri);
        setportfolioData(filteredData)
        filterimageid.push(id)
    }
    const updatePortfolio = () => {
        const formdata = new FormData()
        const filterImage = portfolioData.filter(item => { if (item['type']) return item })

        for (let i = 0; i < filterImage.length; i++) {
            formdata.append('', {
                uri: filterImage[i].uri,
                type: filterImage[i].type,
                name: filterImage[i].name
            })
        }
        if (filterImage.length != 0) dispatch(saveProviderPortfolioAction(formdata))
        if (filterimageid.length != 0) {
            let param = {
                [apiKey['SPPortfolioId']]: filterimageid
            }
            dispatch(deleteProviderPortfolio(param))
        }
    }
    const _renderPortfolio = ({ item, index }) => {

        return (
            <>
                {item['uri'] ?
                    <MyView style={styles['portfolioView']}>
                        <TouchableIcon onPress={() => removeImage(item['uri'], item['SPPortfolioId'])} source={redCrossIcon} style={styles['crossIcon']} />
                        <MyImage
                            source={{ uri: item['uri'] }}
                            style={styles['portfolioImage']}
                        />
                    </MyView>
                    :
                    <Touchable onPress={_openPicker} style={[styles['portfolioView'], { backgroundColor: LIGHT_GRAY }]}>
                        <MyImage source={plusIcon} />
                    </Touchable>
                }
            </>
        )
    }

    const _renderHairType = ({ item, index }) => {
        return (
            <SecondaryButton
                price
                onPress={() => _selectHairType(item, index)}
                style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
                textStyle={styles['selectedText']}
                text={item['ServiceName']}
                pricetext={item['Price'] ? `${item['Price']} USD` : null}
            />
        )
    }


    const _renderHairType1 = ({ item, index }) => {
        return (
            <SecondaryButton
                price
                onPress={() => _selectHairType(item, index)}
                style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
                textStyle={styles['selectedText']}
                text={item['ServiceName']}
                pricetext={item['Price']}
            />
        )
    }

    const _validate = () => {
        navigation.navigate('selectProfession')
        // navigation.navigate('allServices')
        // const filterServiceId = services.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        // const isUpdate = true
        // const param = {
        //     [apiKey['SERVICE_ID']]: filterServiceId,
        //     [apiKey['IS_UPDATE']]: isUpdate
        // }
        // console.log('param==>', param)
        // dispatch(changeServiceAction(param))

    }

    const _validate1 = () => {
        navigation.navigate('changeCustomList')
    }

    const _saveProfile = () => {
        dispatch(loaderAction(true))
        const formData = new FormData()
        imageData?.['uri'] && formData.append(apiKey['PROFILE_PIC'], imageData)
        dispatch(updateServiceProviderProfilePicAction(formData))
    }

    const onPopupSelection = (type, popupItem, mainItem, mainIndex) => () => {
        if (type == 'open') {
            if (mainItem.EndTime && (mainItem.EndTime == popupItem.name)) {
                showToast('You cannot select same time.')
                return
            }
            mainItem.StartTime = popupItem.name
        }
        else if (type == 'close') {
            if (mainItem.StartTime && (mainItem.StartTime == popupItem.name)) {
                showToast('You cannot select same time.')
                return
            }
            mainItem.EndTime = popupItem.name
        }
        setRefresh(prevState => !prevState)
    }

    const onCloseRadioButtonPress = (item) => () => {

        if (item.IsOpen) {
            item.StartTime = ''
            item.EndTime = ''
        }
        item.IsOpen = !item.IsOpen
        setRefresh(prevState => !prevState)
    }

    const onChangeBio = text => {
        setBio(text)
    }

    const onChangeWebsite = text => {
        setWebsiteLink(text)
    }

    const _validateHoursAdProfile = () => {
        dispatch(loaderAction(true))
        const timeData = weekDaysData.map(item => {
            return {
                WeekDayId: item.WeekDayId,
                IsOpen: item.IsOpen,
                StartTime: item.IsOpen ? item.StartTime : '',
                EndTime: item.IsOpen ? item.EndTime : ''
            }
        })
        const param = {
            TimeZone: "India Standard Time",
            Bio: bio,
            Website: websiteLink,
            TimingList: timeData
        }
        dispatch(updateProviderSettingAction(param))
        console.log('param==>', JSON.stringify(param))
    }

    const scrollToIndex = (index) => () => {
        if (index == 0 || index == 1 || index == 2) {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                timeout = null
                scrollViewRef?.current?.scrollTo(0)
            }, 1);
        }
        else if (index == 3) {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                timeout = null
                scrollViewRef?.current?.scrollTo(SCREEN_WIDTH / 2)
            }, 1);
        }
        else if (index == 4) {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                timeout = null
                scrollViewRef?.current?.scrollToEnd()
            }, 1);
        }
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            {/* <Loader isVisible={loading} /> */}
            <MyView style={{ flex: 1 }}>
                <MultipleImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />

                <CurveView />
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                    <ImagePickerSelection pickerModal={showImagePicker} onCancelPress={_closeImagePicker} selectedImage={_getSingleImage} />
                    <MyView style={styles['imageContainer']}>
                        <MyImage source={uri ? { uri: uri ? uri : providerprofile['ProfilePic'] } : imagePlaceholder} style={styles['image']} />
                        <Touchable onPress={_openImagePicker} style={[styles['imageContainer'], { position: 'absolute', backgroundColor: TRANSPARENT_LIGHT_BLACK }]} >
                            <MyImage source={cameraIcon} />
                        </Touchable>
                    </MyView>
                    {!!imageData?.['uri'] && <Button style={{ alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.02 }} text={UPDATE} onPress={_saveProfile} />}
                    <MyView style={styles.topTabContainer}>
                        {tabData.map((each, index) => {
                            return (<Touchable onPress={scrollToIndex(index)} key={index.toString()} style={[styles.tabItem, { borderLeftWidth: index == 0 ? 0 : 1, borderLeftColor: GRAY }]}>
                                <MyText style={styles.tabText}>{each.name}</MyText>
                            </Touchable>)
                        })}
                    </MyView>
                    <MyView>
                        <MyText style={{ marginHorizontal: 25 }}>{`${WEBSITE_SMALL}:`}</MyText>
                        <NormalInput
                            style={{ borderRadius: 25 }}
                            containerStyle={{ marginHorizontal: 25, marginVertical: 10 }}
                            value={websiteLink}
                            onChangeText={onChangeWebsite}
                        />
                    </MyView>
                    {!!weekDaysData?.length && <MyView>
                        <MyText style={{ marginHorizontal: 25, marginBottom: 10 }}>{`${HOURS_OF_OPERATION}:`}</MyText>
                        {weekDaysData?.map((item, index) => {
                            return (
                                <MyView key={index.toString()} style={styles.hoursOfOperationContainer}>
                                    <MyView style={{ width: '20%' }}>
                                        <MyText style={{ fontFamily: montserratBold }}>{item.WeekDay}</MyText>
                                    </MyView>
                                    <MyView style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <PopupMenuOption
                                            optionData={item.openTimeData}
                                            optionsContainerStyle={{ width: '20%', paddingHorizontal: 0 }}
                                            disabled={!item.IsOpen}
                                            onSelect={(each) => onPopupSelection('open', each, item, index)}
                                        >
                                            <MyView style={[styles.dropdownContainer, { backgroundColor: !item.IsOpen ? DARK_GRAY : WHITE, }]}>
                                                <MyText style={{ width: 55, fontSize: 10 }}>{item.StartTime}</MyText>
                                                <MyImage resizeMode='contain' source={downArrow} style={{ marginHorizontal: 5, width: 7, height: 7 }} />
                                            </MyView>
                                        </PopupMenuOption>

                                        <PopupMenuOption
                                            optionData={item.openTimeData}
                                            optionsContainerStyle={{ width: '20%', paddingHorizontal: 0 }}
                                            disabled={!item.IsOpen}
                                            onSelect={(each) => onPopupSelection('close', each, item, index)}
                                        >
                                            <MyView style={[styles.dropdownContainer, { backgroundColor: !item.IsOpen ? DARK_GRAY : WHITE, }]}>
                                                <MyText style={{ width: 55, fontSize: 10 }}>{item.EndTime}</MyText>
                                                <MyImage resizeMode='contain' source={downArrow} style={{ marginHorizontal: 5, width: 7, height: 7 }} />
                                            </MyView>
                                        </PopupMenuOption>

                                    </MyView>
                                    <MyView style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
                                        <MyText>{`${CLOSED} ? `}</MyText>
                                        <Touchable onPress={onCloseRadioButtonPress(item)} style={!item.IsOpen ? styles.selectedRadio : styles.unselectedRadio} />
                                    </MyView>

                                </MyView>
                            )
                        })}
                    </MyView>
                    }
                    <MyView>
                        <MyText style={{ marginHorizontal: 25 }}>{`${BIO_SMALL}:`}</MyText>
                        <NormalInput
                            style={{ borderRadius: 25, height: 100, textAlignVertical: 'top' }}
                            containerStyle={{ marginHorizontal: 25, marginVertical: 10 }}
                            multiline={true}
                            value={bio}
                            onChangeText={onChangeBio}
                        />
                        <Button onPress={_validateHoursAdProfile} style={{ alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.02 }} text={UPDATE} />
                    </MyView>
                    <MyView>
                        <MyText style={[styles['title'], { marginBottom: SCREEN_HEIGHT * 0.02, paddingHorizontal: dynamicSize(25) }]}>{CHANGE_PORTFOLIO}</MyText>

                        <FlatList
                            key='portFolio'
                            data={portfolioData}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            renderItem={_renderPortfolio}
                            keyExtractor={_keyExtractor}
                            contentContainerStyle={styles['portfolioFlatList']}
                            ItemSeparatorComponent={_renderSeperator}
                        />

                        <Button onPress={() => updatePortfolio()} style={{ alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.03 }} text={UPDATE} />
                    </MyView>
                    <MyView>
                        <MyText style={[styles['title'], { marginTop: SCREEN_HEIGHT * 0.02 }]}>{"CHANGE SERVICES"}</MyText>
                        <FlatList
                            key='hairType'
                            data={ServicesProvided}
                            keyExtractor={_keyExtractor}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item, index) => _renderHairType(item, index)}
                            contentContainerStyle={styles['hairTypeFlatList']}
                            numColumns={2}
                            extraData={isrefresh}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                        <Button onPress={_validate} style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} />
                        <MyText style={[styles['title'], { marginTop: SCREEN_HEIGHT * 0.02 }]}>{"CUSTOM SERVICES"}</MyText>
                        <FlatList
                            key='serviceProviderCustom'
                            data={providerprofile['ServicesProvidedCustom']}
                            keyExtractor={_keyExtractor}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item, index) => _renderHairType1(item, index)}
                            contentContainerStyle={styles['hairTypeFlatList']}
                            numColumns={2}
                            extraData={isrefresh}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                        <Button onPress={_validate1} style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} />
                    </MyView>
                </ScrollView>
            </MyView>
        </SafeArea>
    )
}

export default ProviderSetting