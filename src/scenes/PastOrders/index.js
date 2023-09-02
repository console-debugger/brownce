import React, { useEffect } from 'react'
import { MyImage, MyText, MyView, SafeArea, Touchable, Loader, EmptyMessage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlatList, View, Text } from 'react-native'
import styles from './style'
import { GRAY, WHITE } from '../../utils/colors'
import { montserratMedium } from '../../utils/fontFamily'
import { useDispatch, useSelector } from 'react-redux'
import { providerOrderAction, refreshDataAction } from '../../redux/action'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'

// Past order of privider UI render
const PastOrders = () => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { loading, refreshData } = state['loaderReducer']
    const { VIEW_MORE, VIEW_LESS, CUSTOMER_DETAILS, PHONE, EMAIL, LOCATION } = state['localeReducer']['locale']
    const { List } = state['OrderReducer']['providerOrders']

    useEffect(() => {
        const param = {
            'Status': 8,
            'PageNo': 1,
            'RecordsPerPage': '1000'
        }
        dispatch(providerOrderAction(param, false))
    }, [])

    const _seperator = () => {
        return (
            <MyView style={{ height: 10 }} ></MyView>
        )

    }

    // render empty list 
    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.45 }} message={"No past orders."} />)
        }

        else return (<EmptyMessage message={""} />)
    }
    
    // date format change
    const dateHandler = dateItem => {
        const dateTimeStamp = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const date = dateTimeStamp.getDate()
        const currMonth = months[dateTimeStamp.getMonth()]
        const year = dateTimeStamp.getFullYear()
        const fullDate = date + " " + currMonth + " " + year
        return fullDate
    }

    const _toggleUserDetails = (item, index) => () => {
        List[index].selected = !item.selected
        dispatch(refreshDataAction(!refreshData))
    }

    const renderItem = ({ item, index }) => {
        return (
            <Touchable activeOpacity={1} style={styles.cardView}>
                <View style={styles.topView}>
                    <View style={styles.insideView} >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.id, { color: GRAY, fontFamily: montserratMedium }]}>{`${'Order Id: '}`}
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.id}>{item['Id']}</Text></Text>
                        <MyText style={styles.date}>{`${moment(convertToLocal(item['CreatedAt']),'YYYY-MM-DD').format('MMM Do, YYYY')}`}</MyText>
                    </View>

                </View>
                <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 7 }} >
                    <MyImage source={{ uri: item['ProductDetails']?.['ProductFiles']?.[0]?.['FilePath'] }} style={styles.thumbnail} />
                    <View style={styles.contentContainer}>
                        <MyText style={styles.title}>{item['ProductDetails']['ProductName']}</MyText>
                        <MyView style={styles.middleRow}>
                            <MyText style={{ fontWeight: '500', marginVertical: 3 }}>{'By '}
                                <MyText style={{ fontWeight: '700', fontSize: 13 }}>{item['CustomerName']}</MyText></MyText>
                            <MyText style={[styles.price, { marginLeft: item['PaymentMethod'] ? SCREEN_WIDTH * 0.0 : SCREEN_WIDTH * 0.1 }]}>{`$${item['ProductDetails']['Price']}`}</MyText>
                        </MyView>
                        <MyView style={styles.bottomRow}>
                            <MyText style={{ fontSize: 12 }}>{'Qty '}
                                <MyText style={{ fontSize: 13, fontWeight: '700' }}>{item['Quantity']}</MyText> </MyText>

                            <MyView style={styles.complete}>
                                <MyText style={{ color: WHITE, fontWeight: '500' }}>{item['StatusName']}</MyText>
                            </MyView>
                        </MyView>
                    </View>
                </View>
                <MyView style={styles.customerDetails}>
                    {item.selected ? <>
                        <MyText style={styles.customerDetailBold}>{CUSTOMER_DETAILS}</MyText>
                        <MyText style={styles.label}>{`${PHONE} : `}<MyText style={styles.value}>{item.ContactNumber}</MyText></MyText>
                        <MyText style={[styles.label, { marginVertical: dynamicSize(3) }]}>{`${EMAIL} : `}<MyText style={styles.value}>{item.CustomerEmail}</MyText></MyText>
                        <MyText style={styles.label}>{`${LOCATION} : `}<MyText style={styles.value}>{item.Address}</MyText></MyText>
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

export default PastOrders