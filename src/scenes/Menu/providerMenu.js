import React, { useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { MyAlert } from '../../components/alert'
import { MyImage, MyText, MyView, SafeArea, Touchable } from '../../components/customComponent'
import { logAnalyticEvent, onShare, SCREEN_HEIGHT } from '../../components/helper'
import { arrowForeward, smallStar } from '../../components/icons'
import { logout } from '../../navigation/rootNav'
import { logoutAction, getProviderProfileAction, getAllServicesAction, getSpCustomServicesAction, loaderAction, getCustomServicesAction, deleteAccountAction } from '../../redux/action'
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { getFontSize } from '../../utils/responsive'
import { generateDynamicLink } from '../../utils/dynamicLinkHelper'
import { PROVIDER_MENU } from '../../components/eventName'

// UI of provide menu list
const ProviderMenu = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { PROFILE, DELETE_ACCOUNT, SERVICE_HISTORY, MY_BROWNCE_STATS, SETTINGS, EARNINGS, LOGOUT, LOADING, LOGOUT_MESSAGE, DELETE_MESSAGE, SUPPORT, REFERRALS } = state['localeReducer']['locale']
    const { providerprofile } = state['profileReducer']
    const [logoutModalVisible, setLogoutModal] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const menuOption = [{
        label: PROFILE
    },
    {
        label: SERVICE_HISTORY
    },
    {
        label: EARNINGS
    },
    {
        label: MY_BROWNCE_STATS
    },
    {
        label: SETTINGS
    },
    {
        label: "Funds"
    },
    {
        label: "FAQ & Community Guidelines"
    },
    {
        label: REFERRALS
    },
    {
        label: SUPPORT
    },
    {
        label: "Terms & Conditions"
    },
    {
        label: "Privacy Policy"
    },
    {
        label: DELETE_ACCOUNT
    },
    {
        label: LOGOUT
    }]

    // fetching customer and servide provide services
    useFocusEffect(
        useCallback(() => {
            const param = {
                'Search': ''
            }
            const param1 = {
                'Search': ''
            }
            dispatch(getSpCustomServicesAction(param1))
            dispatch(getCustomServicesAction(param))
            dispatch(getAllServicesAction())
            dispatch(getProviderProfileAction())
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
                logAnalyticEvent(PROVIDER_MENU, data)
            }
        }, [providerprofile])
    )


    // Navigation to particular screen
    const _navToScreens = index => () => {
        if (index === 0) navigation.navigate('providerSetting') // navigation.navigate('providerProfile')
        else if (index === 1) navigation.navigate('serviceHistory')
        else if (index === 2) navigation.navigate('earnings')
        else if (index === 3) navigation.navigate('myBrownceStats')
        else if (index === 4) navigation.navigate('providerProfile') // navigation.navigate('providerSetting')
        else if (index === 5) navigation.navigate('funds')
        else if (index === 6) navigation.navigate('webView', { id: 5, title: "Community guidelines " })
        else if (index === 7) navigation.navigate('referral')
        else if (index === 8) navigation.navigate('support')
        else if (index === 9) navigation.navigate('webView', { id: 1, title: "Terms & Conditions" })
        else if (index === 10) navigation.navigate('webView', { id: 2, title: "Privacy Policy" })
        else if (index === 11) openDeleteModal()
        else if (index === 12) _onYesPress()
    }

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    const _renderMenuList = ({ item, index }) => {
        return (
            <Touchable onPress={_navToScreens(index)} style={styles['providerMenu']}>
                <MyText style={[styles['labelStyle'], { color: index == 10 ? 'red' : BLACK }]}>{item['label']}</MyText>
                <MyImage source={arrowForeward} style={styles['arrowStyle']} />
            </Touchable>
        )
    }

    // Yes press of lofout modal
    const _onYesPress = () => {
        // setLogoutModal(false)
        setTimeout(() => {
            dispatch(logoutAction())
            logout()
        }, 500);
    }

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


    console.log('providerprofile=?', providerprofile)

    const _onShareButton = async () => {
        const profileType = 'provider';
        const userId = providerprofile?.['UserId'];
        const newLink = await generateDynamicLink(profileType, userId)
        console.log('new short link =>', newLink)
        onShare(newLink)
    };

    const _onNoPress = () => setLogoutModal(false)

    return (
        <SafeArea style={{ paddingBottom: -useSafeAreaInsets().bottom, backgroundColor: THEME }}>
            <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={LOGOUT_MESSAGE} isVisible={logoutModalVisible} />
            <MyAlert indicator={indicator} onYesPress={_onDeleteYesPress} onNoPress={closeDeleteModal} message={DELETE_MESSAGE} isVisible={deleteModalVisible} />
            <MyView style={{ backgroundColor: LIGHT_WHITE, flex: 1 }}>
                <MyView style={styles['headerView']}>
                    <MyImage source={{ uri: state.profileReducer.providerprofile?.['ProfilePic'] }} style={styles['profileImage']} />
                    <MyView style={styles['userDetails']}>
                        <MyText style={styles['userName']}>{state.profileReducer.providerprofile?.['FirstName'] ? state.profileReducer.providerprofile['FirstName'] : LOADING}</MyText>

                        <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>{state.profileReducer.providerprofile?.['Username'] ? state.profileReducer.providerprofile['Username'] : LOADING}</MyText>
                        <MyView style={styles['starView']}>
                            <MyImage source={smallStar} />
                            <MyText style={styles['ratingText']}>{`${providerprofile['OverallRating']}/5`}</MyText>
                        </MyView>
                    </MyView>
                    <MyView style={styles['shareImageCon']}>
                        <Touchable onPress={_onShareButton}>
                            <MyText style={styles['email']}>
                                {state.profileReducer.providerprofile?.['Email'] ? `Share` : LOADING}
                            </MyText>
                        </Touchable>
                        {/* <TouchableIcon
                source={shareIcon}
                indicator={false}
                imageStyle={styles['shareImage']}
               
              /> */}
                    </MyView>
                </MyView>
                <FlatList
                    key='menuList'
                    data={menuOption}
                    keyExtractor={_keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={_renderMenuList}
                    contentContainerStyle={[styles['flatList'], { paddingVertical: SCREEN_HEIGHT * 0.02 }]}
                    ItemSeparatorComponent={_renderSeperator}
                />
            </MyView>
        </SafeArea>
    )
}

export default ProviderMenu