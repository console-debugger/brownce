import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurveView, EmptyMessage, MyImage, MyText, MyView, SafeArea, Touchable } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { smallStar, plusadd, productImg2, dotIcon } from '../../components/icons'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/responsive'
import { FlatList } from 'react-native'
import Popup from './popup'
import { MyAlert } from '../../components/alert'
import { navigateToScreen } from '../../navigation/rootNav'
import { DELETE_PRODUCT_SUCCESS_ACTION } from '../../redux/action/type'
import { deleteProductAction, getMyProductListAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'

// Current products UI

const CurrentProducts = ({ navigation }) => {

    const state = useSelector(state => { return state })
    const { LOADING, YOURPRODUCTS, DELETE_PRODUCT_MESSAGE } = state['localeReducer']['locale']
    const { providerprofile, } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const { spProducts, messageCase } = state['productReducer']
    const dispatch = useDispatch()

    const [modalVisible, setmodalVisible] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [productId, setproductId] = useState('')

    // delete products success
    useEffect(() => {
        if (messageCase === DELETE_PRODUCT_SUCCESS_ACTION) {
            const params = {
                'PageNo': '1',
                'RecordsPerPage': '100',
                'Search': ''
            }
            dispatch(getMyProductListAction(params))
        }

    }, [messageCase])

    // get products list action
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

    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.26 }} message={"You have not added any product yet."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    const _renderSeperator = () => {
        return (
            <MyView style={{ height: 10 }}></MyView>
        )
    }

    const _popup = (item, index) => {
        const replica = [...spProducts]
        replica[index]['status'] = !replica[index]['status']
        setrefresh(!refresh)
    }

    const deletePress = (item) => {
        setmodalVisible(true)
        setproductId(item.Id)
    }

    // @ Products render
    const _renderProducts = ({ item, index }) => {
        return (
            <Touchable onPress={() => navigateToScreen('productDetails', { item: item })} style={{ marginTop: SCREEN_HEIGHT * 0.02, marginHorizontal: 12, width: '44%' }}>
                <MyView style={styles.view}>
                    <MyImage
                        style={styles['productImage']}
                        source={item?.['ProductFiles']?.[0]?.['FilePath'] ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] } : productImg2} />
                    <Touchable activeOpacity={1} onPress={() => _popup(item, index)} style={styles['dotStyle']}>
                        <MyImage style={{}} source={dotIcon} />
                    </Touchable>
                    {item['status'] ? <Popup editPress={() => navigateToScreen('editproduct', { item: item })} onPress={() => deletePress(item)} /> : null}
                </MyView>
                <MyView style={{ marginLeft: SCREEN_WIDTH * 0.02, }}>
                    <MyText style={styles['price']}>{`$${item['Price']}`}</MyText>
                    <MyText numberOfLines={2} style={styles['desc']}>{'This is a test description to check the UI responsiveness for the products page on the Brownce App' || item['ProductName']}</MyText>
                    <MyText numberOfLines={2} style={styles['desc']}>{item['BrandName']}</MyText>
                </MyView>
            </Touchable>
        )
    }

    // Yes press of alert, deletion fo products
    const _onYesPress = async () => {
        setmodalVisible(false)
        dispatch(deleteProductAction(productId))
    }

    const _onNoPress = () => setmodalVisible(false)

    return (
        <SafeArea style={{ paddingBottom: -useSafeAreaInsets().bottom, backgroundColor: THEME }}>
            <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={DELETE_PRODUCT_MESSAGE} isVisible={modalVisible} />
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
            </MyView>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
                <CurveView />
                <MyText style={[styles.shoptext, { alignSelf: 'center' }]}>{YOURPRODUCTS}</MyText>
                <MyView style={{ marginBottom: isAndroid ? SCREEN_HEIGHT * 0.09 : SCREEN_HEIGHT * 0.09, }}>
                    <FlatList
                        data={spProducts}
                        showsVerticalScrollIndicator={false}
                        renderItem={_renderProducts}
                        ItemSeparatorComponent={_renderSeperator}
                        numColumns={2}
                        extraData={refresh}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ width: '100%' }}
                        ListEmptyComponent={_renderEmpty} />
                </MyView>
                <Touchable style={styles.plusadd} onPress={() => navigation.navigate('addproducts')}>
                    <MyImage source={plusadd} style={styles.plusadd} />
                </Touchable>
            </MyView>
        </SafeArea>
    )
}

export default CurrentProducts