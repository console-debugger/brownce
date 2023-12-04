import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { FlatList, Linking, ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, Loader, MyImage, MyText, Button, MyView, SafeArea, WeekDayTimings, RatingWithLabel, SecondaryButton } from '../../components/customComponent'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { cancelSubscriptionAction, getNotificationCountAction, getProfileAction, getProviderProfileAction, loaderAction } from '../../redux/action'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { apiKey } from '../../services/serviceConstant'
import { MyAlert } from '../../components/alert'
import { CANCEL_SUBSCRIPTION_SUCCESS_ACTION } from '../../redux/action/type'
import { SCREEN_HEIGHT, isCustomer, isIOS, locationMapping, logAnalyticEvent, validateUrl } from '../../components/helper'
import { PROVIDER_DASHBOARD } from '../../components/eventName'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'
import { THEME, WHITE } from '../../utils/colors'

// @ provider profile UI

const ProviderProfile = ({ navigation }) => {

    // @ initailization of local and store state

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { EDIT, MY_SUBSCRIPTION, LOCATION, LOADING, RATING, PORTFOLIO, NOT_AVAILABLE, HOURS_OF_OPERATION, CANCEL_PLAN_MESSAGE } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const { providerprofile } = state['profileReducer']
    const { ServicesProvided } = state['profileReducer']['providerprofile']
    const { messageCase } = state['subscriptionPlanReducer']

    const [cancelModalVisible, setcancelModal] = useState(false)
    const [selectedWeekDayIndex, setSelectedWeekDayIndex] = useState(0)
    const [weeklyTimeTable, setWeekltTimeTable] = useState([])
    const [isRefresh, setRefresh] = useState(false)

    // @ refetch details of provider profile
    useEffect(() => {
        if (messageCase === CANCEL_SUBSCRIPTION_SUCCESS_ACTION) {
            // dispatch(loaderAction(true))
            dispatch(getProviderProfileAction())
        }
    }, [messageCase])

    // @ fetch details of provider profile
    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            if (isCustomer()) {
                dispatch(getProfileAction())
            } else {
                dispatch(getProviderProfileAction())
                dispatch(getNotificationCountAction())
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            if (providerprofile?.UserId) {
                const data = {
                    id: providerprofile?.UserId,
                    name: providerprofile?.FirstName || '',
                    username: providerprofile?.Username || ''
                }
                logAnalyticEvent(PROVIDER_DASHBOARD, data)
            }
            console.log('providerprofile?.Timings==>', JSON.stringify(providerprofile))
            if (providerprofile?.Timings?.length) {
                setWeekltTimeTable(providerprofile?.Timings || [])
            }
        }, [providerprofile])
    )

    const selectedWeekDay = useMemo(() => {
        if (weeklyTimeTable?.length) {
            const selectedData = weeklyTimeTable.filter(each => (each.StartTime || each.EndTime))
            if (selectedData.length) return `${selectedData[selectedWeekDayIndex].WeekDay} : ${selectedData[selectedWeekDayIndex].StartTime} - ${selectedData[selectedWeekDayIndex].EndTime}`
            else return NOT_AVAILABLE
        }
        else return NOT_AVAILABLE
    }, [selectedWeekDayIndex, weeklyTimeTable])

    const _cancel = () => {
        // setcancelModal(true)
        if (isIOS) {
            Linking.openURL('https://apps.apple.com/account/subscriptions')
        } else {
            Linking.openURL('https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID')
        }
    }

    const _navToEditProfile = () => navigation.navigate('providerSetting')

    const _change = () => navigation.navigate('mySubscription')

    const _buy = () => navigation.navigate('mySubscription')

    // @ cancel subscription
    const _onYesPress = async () => {
        const formdata = new FormData()
        formdata.append(apiKey['SubscriptionId'], providerprofile['SubscriptionDetail']['Id'])
        dispatch(cancelSubscriptionAction(formdata))
        setcancelModal(false)
    }
    const _onNoPress = () => setcancelModal(false)

    const _openLink = async () => {
        try {
            const url = validateUrl(providerprofile?.['Weblink'])
            if (url) Linking.openURL(url)
        } catch (error) {
            console.log('err-->', error)
        }
    }

    const getPlanTitle = () => {
        switch (providerprofile?.AdMobSubscribtion.PackageName) {
            case "com.brownce.monthly.subscription":
                return "1 MONTH"
            case "com.brownce.3monthly.subscription":
                return "3 MONTHS"
            case "com.brownce.6monthly.subscription":
                return "6 MONTHS"
            default:
                return "1 MONTH"
        }
    }

    const jumpToNextWeek = () => {
        const selectedData = weeklyTimeTable.filter(each => (each.StartTime || each.EndTime))
        if (selectedWeekDayIndex < (selectedData.length - 1)) setSelectedWeekDayIndex(prevState => prevState + 1)
    }

    const jumpToPreviousWeek = () => {
        // const selectedData = weeklyTimeTable.filter(each=> (each.StartTime || each.EndTime))
        if (selectedWeekDayIndex > 0) setSelectedWeekDayIndex(prevState => prevState - 1)
    }

    // @ Render protfolio of flatlist
    const _renderPortfolio = ({ item, index }) => {
        return (
            <MyImage
                source={{ uri: item['ImagePath'] }}
                style={styles['portfolioImage']}
            />
        )
    }

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
        )
    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, paddingBottom: -useSafeAreaInsets().bottom }}>

            <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={CANCEL_PLAN_MESSAGE} isVisible={cancelModalVisible} />

            <MyView style={styles['mainContainer']}>
                <ScrollView style={{ paddingBottom: 15 }}>
                    <CurveView />
                    <Loader isVisible={loading} />

                    <MyText onPress={_navToEditProfile} style={[styles['editText'], { alignSelf: 'flex-end' }]}>{EDIT}</MyText>
                    <MyImage source={{ uri: state.profileReducer.providerprofile?.['ProfilePic'] }} style={styles['image']} />
                    <MyText style={[styles['name'], { marginBottom: 0 }]}>{providerprofile?.['FirstName'] ? providerprofile?.['FirstName'] : LOADING}</MyText>

                    <MyText style={[styles['name'], { marginBottom: 0 }]}>{providerprofile?.['Username'] ? providerprofile?.['Username'] : LOADING}</MyText>
                    <MyText style={[styles['detail'], { marginBottom: 0 }]}>{`${LOCATION}: ${locationMapping(providerprofile)}`}</MyText>
                    {providerprofile?.['Weblink'] ? <TouchableOpacity activeOpacity={0.7} onPress={_openLink}>
                        <MyText style={[styles['detail'], { textDecorationLine: 'underline' }]}>{providerprofile?.['Weblink'] || ''}</MyText>
                    </TouchableOpacity>
                        :
                        null}
                    {/* <MyText style={styles['detail']}>{`${'Hours'}: ${providerprofile?.['OpeningTime'] === null ? '--' : providerprofile['OpeningTime']} To ${providerprofile?.['ClosingTime'] === null ? '--' : providerprofile['ClosingTime']}`}</MyText> */}
                    <MyText style={{ fontSize: 12, alignSelf: 'center', fontFamily: montserratSemiBold, marginTop: 10 }}>{HOURS_OF_OPERATION}</MyText>
                    <WeekDayTimings
                        jumpToPreviousWeek={jumpToPreviousWeek}
                        jumpToNextWeek={jumpToNextWeek}
                        text={selectedWeekDay}
                    />

                    <CurveView style={styles['curveMain']} innerStyle={styles['innerStyle']} />
                    <MyView style={styles['lowerContainer']}>
                        <RatingWithLabel style={{ backgroundColor: WHITE }} labelStyle={{ fontFamily: montserratBold }} isRateCount label={RATING} mytext={`${providerprofile['OverallRating']}/5`} />
                        {providerprofile?.['Reviews']?.map((item, index) => {
                            return (
                                <MyView key={index}>
                                    <RatingWithLabel imageStyle={{ marginHorizontal: 3 }} style={{ backgroundColor: WHITE, paddingTop: 3 }} label={item.RatingTypeName} rating={item.UserRating || 0} />
                                </MyView>
                            )
                        })}
                        <MyText style={[styles['portFolioText'], { backgroundColor: WHITE }]}>{PORTFOLIO}</MyText>
                        {providerprofile?.Portfolios?.length > 0 ? <FlatList
                            key='portfolio'
                            data={providerprofile.Portfolios}
                            numColumns={3}
                            renderItem={_renderPortfolio}
                            keyExtractor={_keyExtractor}
                            contentContainerStyle={styles['portfolioFlatList']}
                            ItemSeparatorComponent={_renderSeperator}
                        /> :
                            <MyText style={{ color: THEME, textAlign: 'center' }}>{'No Data Found.'}</MyText>
                        }
                        <MyText style={[styles['portFolioText'], { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 }]}>{"SERVICES"}</MyText>
                        {ServicesProvided?.length > 0 ? <FlatList
                            key='hairType'
                            data={ServicesProvided}
                            keyExtractor={_keyExtractor}
                            renderItem={_renderHairType}
                            contentContainerStyle={styles['hairTypeFlatList']}
                            numColumns={2}
                            extraData={isRefresh}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        /> :
                            <MyText style={{ color: THEME, textAlign: 'center', paddingVertical: 15 }}>{'No Data Found.'}</MyText>
                        }
                    </MyView>
                    {providerprofile['IsAdMobSubscribe'] ?
                        <MyView style={styles['lowerContainer']}>
                            <MyText style={styles['subscriptionTitle']}>{MY_SUBSCRIPTION}</MyText>
                            <MyView style={styles['subscriptionContainer']}>
                                <MyText style={styles['subscriptionPrice']}>{`$ ${providerprofile?.AdMobSubscribtion?.['Price']}`}</MyText>
                                <MyText style={[styles['subscriptionDescription'], {}]}>{`Trial Period- 2 Months`}</MyText>
                                <MyText style={styles['subscriptionPeriod']}>{getPlanTitle() || 'Loading'}</MyText>
                                <MyText style={styles['subscriptionDescription']}>Removal of in-app ads</MyText>
                            </MyView>
                            <MyView style={styles['buttonRow']} >
                                <Button onPress={_cancel} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"CANCEL PLAN"} />
                                <Button onPress={_change} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"CHANGE PLAN"} />

                            </MyView>
                        </MyView> :
                        <MyView style={[styles['lowerContainer'], { paddingBottom: 10 }]}>
                            <MyText style={styles['subscriptionBuyDescription']}>{"Upgrade your plan!"}</MyText>
                            <MyView style={styles['button']} >
                                <Button onPress={_buy} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"BUY PLAN"} />
                            </MyView>
                        </MyView>}
                </ScrollView>
            </MyView>
        </SafeArea>
    )
}

export default ProviderProfile