import React, { useCallback, useEffect } from 'react'
import { FlatList, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MyImage, MyText, MyView, SafeArea, Touchable, Loader, EmptyMessage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './style'
import { GRAY, WHITE } from '../../utils/colors'
import { montserratMedium } from '../../utils/fontFamily'
import { markAsDeliveredAction, orderStatusAction, paymentSaveAction, providerOrderAction, refreshDataAction } from '../../redux/action'
import { SCREEN_HEIGHT, SCREEN_WIDTH, convertToLocal } from '../../components/helper'
import { useFocusEffect } from '@react-navigation/native'
import { ORDER_STATUS_SUCCESS_ACTION } from '../../redux/action/type'
import { dynamicSize } from '../../utils/responsive'
import moment from 'moment'

// New order UI list
const NewOrders = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { loading, refreshData } = state['loaderReducer']
    const { List } = state['OrderReducer']['providerOrders']
    const { messageCase } = state['OrderReducer']
    const { VIEW_MORE, VIEW_LESS, CUSTOMER_DETAILS, PHONE, EMAIL, LOCATION, PAYMENT_TYPE } = state['localeReducer']['locale']

    // fetch provider order list
    useFocusEffect(
        useCallback(() => {
            const param = {
                'Status': 0,
                'PageNo': 1,
                'RecordsPerPage': '1000'
            }
            dispatch(providerOrderAction(param, true))
        }, [])
    )

    // api call on order success
    useEffect(() => {
        if (messageCase === ORDER_STATUS_SUCCESS_ACTION) {
            const param = {
                'Status': 0,
                'PageNo': 1,
                'RecordsPerPage': '1000'
            }
            dispatch(providerOrderAction(param, true))
        }
    }, [messageCase])

    const _seperator = () => {
        return (<MyView style={{ height: 10 }} ></MyView>)
    }

    // @ UI of empty list
    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.45 }} message={"No new orders."} />)
        }
        else return (<EmptyMessage message={""} />)
    }
    const dateHandler = dateItem => {
        const dateTimeStamp = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const date = dateTimeStamp.getDate()
        const currMonth = months[dateTimeStamp.getMonth()]
        const year = dateTimeStamp.getFullYear()
        const fullDate = date + " " + currMonth + " " + year
        return fullDate
    }

    // mark as delivered order
    const _markasdelivered = (item) => {
        const param = {
            'OrderId': item.Id,
            //'Status':8
        }
        const paymentparam = {
            'Orderid': item['Id'],
            'NonceId': '',
            'PayPalPaymentId': null,
            'Amount': item['Amount']
        }
        item['PaymentMethod'] === 2 ? dispatch(paymentSaveAction(paymentparam)) : null
        dispatch(markAsDeliveredAction(param))
    }

    // makr as prepared order
    const _markasprepared = (item) => {
        const param = {
            'OrderId': item.Id,
            'Status': 3
        }
        dispatch(orderStatusAction(param))
    }

    // mark as dispatch order
    const _markasdispatch = (item) => {
        const param = {
            'OrderId': item.Id,
            'Status': 5
        }
        dispatch(orderStatusAction(param))
    }

    const _toggleUserDetails = (item, index) => () => {
        List[index].selected = !item.selected
        dispatch(refreshDataAction(!refreshData))
    }

    const renderItem = ({ item, index }) => {
        console.log("item['CreatedAt']=>",item['CreatedAt'])
        return (
            <Touchable activeOpacity={1} style={styles.cardView}>
                <View style={styles.topView}>
                    <View style={styles.insideView} >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.id, { color: GRAY, fontFamily: montserratMedium }]}>{`${'Order Id: '}`}
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.id}>{item['Id']}</Text></Text>
                        <MyText style={styles.date}>{`${moment(convertToLocal(item['CreatedAt']),'YYYY-MM-DD').format('MMM Do, YYYY')}`}</MyText>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 7 }} >
                    <MyImage source={{ uri: item['ProductDetails']?.['ProductFiles']?.[0]?.['FilePath'] }} style={styles.thumbnail} />
                    <View style={styles.contentContainer}>
                        <MyText style={styles.title}>{item['ProductDetails']['ProductName']}</MyText>
                        <MyView style={styles.middleRow}>
                            <MyText onPress={() => navigation.navigate('customerDetail', { id: item.CustomerUserId })} style={{ fontWeight: '500', marginVertical: 3 }}>{'By '}
                                <MyText style={{ fontWeight: '700', fontSize: 13 }}>{item['CustomerName']}</MyText></MyText>
                            <MyText style={[styles.price, { marginLeft: item['PaymentMethod'] ? SCREEN_WIDTH * 0.0 : SCREEN_WIDTH * 0.1 }]}>{`$${item['ProductDetails']['Price']}`}</MyText>
                        </MyView>
                        <MyView style={styles.bottomRow}>
                            <MyText style={{ fontSize: 12 }}>{'Qty '}
                                <MyText style={{ fontSize: 13, fontWeight: '700' }}>{item['Quantity']}</MyText> </MyText>
                            {
                                item['Status'] === 2 ?
                                    <Touchable onPress={() => _markasprepared(item)} style={[styles.complete, { marginLeft: 50 }]}>
                                        <MyText style={{ color: WHITE, fontWeight: '500' }}>{'Mark as Prepared'}</MyText>
                                    </Touchable> :
                                    item['Status'] === 3 ?
                                        <Touchable onPress={() => _markasdispatch(item)} style={[styles.complete]}>
                                            <MyText style={{ color: WHITE, fontWeight: '500' }}>{'Mark as Dispatch'}</MyText>
                                        </Touchable> :
                                        <Touchable onPress={() => _markasdelivered(item)} style={[styles.complete, { marginLeft: item['PaymentMethod'] === 2 ? 20 : 50 }]}>
                                            <MyText style={{ color: WHITE, fontWeight: '500' }}>{item['PaymentMethod'] === 2 ? 'Cash/Mark as delivered' : 'Mark as Delivered '}</MyText>
                                        </Touchable>
                            }
                        </MyView>
                    </View>
                </View>
                <MyView style={styles.customerDetails}>
                    {item.selected ? <>
                        <MyText style={styles.customerDetailBold}>{CUSTOMER_DETAILS}</MyText>
                        <MyText style={styles.label}>{`${PHONE} : `}<MyText style={styles.value}>{item.ContactNumber}</MyText></MyText>
                        <MyText style={[styles.label, { marginVertical: dynamicSize(3) }]}>{`${EMAIL} : `}<MyText style={styles.value}>{item.CustomerEmail}</MyText></MyText>
                        <MyText style={styles.label}>{`${LOCATION} : `}<MyText style={styles.value}>{item.Address}</MyText></MyText>
                        <MyText style={[styles.label, { marginTop: dynamicSize(3) }]}>{`${PAYMENT_TYPE} : `}<MyText style={styles.value}>{item.PaymentMethodName}</MyText></MyText>
                    </>
                        :
                        null
                    }
                    <MyText onPress={_toggleUserDetails(item, index)} style={styles.detailsTxt}>{item.selected ? VIEW_LESS : VIEW_MORE}</MyText>
                </MyView>
            </Touchable>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            <Loader isVisible={loading} />
            <FlatList
                data={List}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={_seperator}
                ListEmptyComponent={_renderEmpty}
                contentContainerStyle={{ width: SCREEN_WIDTH, alignItems: 'center' }}
            />
        </SafeArea>
    )
}

export default NewOrders