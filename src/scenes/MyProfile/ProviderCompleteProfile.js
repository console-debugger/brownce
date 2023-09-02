// @ imports of React and custom components
import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Linking, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Loader, MyImage, MyText, MyView, RatingWithLabel, SafeArea, SecondaryButton, Touchable } from '../../components/customComponent'
import { isAndroid, locationMapping, SCREEN_HEIGHT, SCREEN_WIDTH, validateUrl } from '../../components/helper'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import { montserratBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'
import { getMyProductListAction, getProviderProfileAction } from '../../redux/action'
import { LicensePopup } from '../../components/alert'
import { useFocusEffect } from '@react-navigation/native'
import { productImg2 } from '../../components/icons'
import { navigateToScreen } from '../../navigation/rootNav'

// @ Provider Complete profile setup

const ProviderCompleteProfile = ({ navigation }) => {

    // @ initailization of local and store state
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { EDIT, LOADING, RATING, LOCATION, PORTFOLIO } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const providerprofile = state.profileReducer.providerprofile
    const { ServicesProvided } = state['profileReducer']['providerprofile']
    const { spProducts } = state['productReducer']
    const [modalVisible, setmodalVisible] = useState(false)
    const [isRefresh, setRefresh] = useState(false)

    useEffect(() => {
        dispatch(getProviderProfileAction())
    }, [])

    useFocusEffect(
        useCallback(() => {
            const params = {
                'PageNo': '1',
                'RecordsPerPage': '100',
                'Search': ''
            }
            dispatch(getMyProductListAction(params))
        }, [])
    )
    const _selectHairType = (item, index) => () => {
        const replica = [...hairTypes]
        for (let i = 0; i < hairTypes.length; i++) {
            if (item['HairTypeMasterId'] === replica[i]['HairTypeMasterId']) {
                replica[i]['status'] = true
            }
            else {
                replica[i]['status'] = false
            }
        }
        setRefresh(!isRefresh)
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

    const _navToEditProfile = () => navigation.navigate('editProviderProfile')

    // @ Render Products
    const _renderProducts = ({ item, index }) => {
        return (
            <Touchable onPress={() => navigateToScreen('productDetails', { item: item })} style={{ marginTop: SCREEN_HEIGHT * 0.02, marginHorizontal: 12 }}>
                <MyView style={styles.view}>
                    <MyImage
                        style={styles['productImage']}
                        source={item?.['ProductFiles']?.[0]?.['FilePath'] ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] } : productImg2} />
                </MyView>
                <MyView style={{ marginLeft: SCREEN_WIDTH * 0.02 }}>
                    <MyText style={styles['price']}>{`$${item['Price']}`}</MyText>
                    <MyText style={styles['desc']}>{item['ProductName']}</MyText>
                    <MyText style={styles['desc']}>{item['BrandName']}</MyText>
                </MyView>
            </Touchable>
        )
    }

    const _openLink = async () => {
        try {
            const url = validateUrl(providerprofile?.['Weblink'])
            if (url) Linking.openURL(url)
        } catch (error) {
            console.log('err-->', error)
        }
    }


    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['mainContainer']}>
                <MyView style={[styles['outerCurver']]}>
                    <MyView style={[styles['innerCurve']]}>
                        <LicensePopup
                            source={{ uri: providerprofile['DocumentPath'] }}
                            dismiss={() => setmodalVisible(false)}
                            isVisible={modalVisible} />
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                            borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
                            borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
                            backgroundColor: LIGHT_WHITE,
                        }}>
                            <MyView>
                                <Loader isVisible={loading} />
                                <MyText onPress={_navToEditProfile} style={[styles['editText'], styles['absoluteEditText']]}>{EDIT}</MyText>
                                <MyImage source={{ uri: providerprofile.ProfilePic }} style={styles['image']} />
                                <MyText style={styles['name']}>{providerprofile?.FirstName ? providerprofile.FirstName : LOADING}</MyText>

                                <MyText style={[styles['name'], { fontSize: getFontSize(14) }]}>{providerprofile?.Username ? providerprofile.Username : LOADING}</MyText>
                                <MyText onPress={() => setmodalVisible(true)} style={[styles['detail'], { textDecorationLine: "underline", color: THEME }]}>{"View License"}</MyText>
                                <MyText style={styles['detail']}>{`${LOCATION}:  ${locationMapping(providerprofile)}`}</MyText>
                                {providerprofile?.['Weblink'] ? <MyText onPress={_openLink} style={[styles['detail'], { textDecorationLine: 'underline' }]}>{providerprofile?.['Weblink'] || ''}</MyText> : null}
                                <MyText style={styles['detail']}>{`${'Hours'}: ${providerprofile?.['OpeningTime'] === null ? '--' : providerprofile['OpeningTime']} To ${providerprofile?.['ClosingTime'] === null ? '--' : providerprofile['ClosingTime']}`}</MyText>
                                <MyView style={[styles['lowerInnerCurve']]}>
                                    <RatingWithLabel style={{ marginTop: dynamicSize(7), }} labelStyle={{ fontFamily: montserratBold }} isRateCount label={RATING} mytext={`${providerprofile['OverallRating']}/5`} />

                                    {providerprofile?.['Reviews']?.map((item, index) => {
                                        return (
                                            <MyView key={index}>
                                                <RatingWithLabel style={{ marginTop: dynamicSize(7), }} labelStyle={{ fontFamily: montserratBold }} isRateCount label={item.RatingTypeName} mytext={`${item.UserRating}/5`} />
                                            </MyView>
                                        )
                                    })}
                                    <MyText style={styles['portFolioText']}>{PORTFOLIO}</MyText>
                                    {providerprofile?.Portfolios?.length > 0 && <FlatList
                                        key='portfolio'
                                        data={providerprofile.Portfolios}
                                        numColumns={3}
                                        renderItem={_renderPortfolio}
                                        keyExtractor={_keyExtractor}
                                        contentContainerStyle={styles['portfolioFlatList']}
                                        ItemSeparatorComponent={_renderSeperator}
                                    />}
                                    <MyText style={[styles['portFolioText'], { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 }]}>{"SERVICES"}</MyText>
                                    {ServicesProvided.length > 0 && <FlatList
                                        key='hairType'
                                        data={ServicesProvided}
                                        keyExtractor={_keyExtractor}
                                        renderItem={_renderHairType}
                                        contentContainerStyle={styles['hairTypeFlatList']}
                                        numColumns={2}
                                        extraData={isRefresh}
                                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    />}
                                    <MyText style={[styles['portFolioText'], { marginVertical: null, marginTop: SCREEN_HEIGHT * 0.02 }]}>{"My Products"}</MyText>

                                    {spProducts.length > 0 && <FlatList
                                        key={'serviceProviderProducts'}
                                        data={spProducts}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={_renderProducts}
                                        keyExtractor={_keyExtractor}
                                        ItemSeparatorComponent={_renderSeperator}
                                        numColumns={2}
                                    />}
                                </MyView>
                            </MyView>
                        </ScrollView>
                        <Button onPress={() => navigation.navigate('changepassword')} style={{ marginVertical: dynamicSize(10), }} text="Change Password" />
                    </MyView>
                </MyView>
            </MyView>
        </SafeArea>
    )
}

export default ProviderCompleteProfile