import React, { useCallback } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, SecondaryButton } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon } from '../../components/icons'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { appointmentDetailAction } from '../../redux/action'
import { dynamicSize } from '../../utils/responsive'
import { isCustomer, isProvider } from '../../components/helper'

// Service details UI
const ServiceDetail = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { appointmentdetail } = state['profileReducer']
    const { BOOKING_ID } = state['localeReducer']['locale']

    useFocusEffect(
        useCallback(() => {
            dispatch(appointmentDetailAction(route.params.id))
        }, [])
    )

    const _renderHairType = ({ item, index }) => {
        return (
            <SecondaryButton
                style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
                textStyle={styles['selectedText']}
                text={item['ServiceName']}
            />
        )
    }

    const _keyExtractor = (item, index) => item + index

    const dateHandler = (dateItem) => {
        const d = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const a = d.getDate()
        const b = months[d.getMonth()]
        const c = d.getFullYear()
        const e = a + " " + b + ", " + c
        return e
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <ScrollView>
                <MyView style={{ backgroundColor: LIGHT_WHITE }}>
                    <MyView style={styles['flatList']} >
                        <Card style={styles['itemContainer']}>
                            <Touchable onPress={() =>
                                isCustomer() ?
                                    navigation.navigate('spDetail', { id: appointmentdetail['SPId'] }) :
                                    navigation.navigate('customerDetail', { id: appointmentdetail['CustomerId'] })}>
                                <MyView style={styles['headerContent']}>
                                    <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{appointmentdetail['AppointmentId']}</MyText></MyText>
                                    <MyText style={styles['bookingId']}>{dateHandler(appointmentdetail['AppointmentDate']) + ' ' + appointmentdetail['AppointmentTime']}</MyText>
                                </MyView>
                                <MyView style={styles['itemMainContainer']}>
                                    <MyImage source={{ uri: isProvider() ? appointmentdetail['CustomerProfilePic'] : appointmentdetail['SPProfilePic'] }} style={styles['image']} />
                                    <MyView style={{ flex: 1 }}>
                                        <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                            <MyText style={styles['name']}>{isProvider() ? `${appointmentdetail['CustomerName']} | ` : `${appointmentdetail['SPName']} | `}</MyText>
                                            <MyText style={styles['name']}>{isProvider() ? appointmentdetail['CustomerUserName'] : appointmentdetail['SPUserName']}</MyText>

                                        </MyView>

                                        <MyView style={styles['innerContainer']}>
                                            <TouchableIcon onPress={() => navigation.navigate('chat', { id: isProvider() ? appointmentdetail['CustomerId'] : appointmentdetail['SPId'], type: isProvider() ? 'customer' : 'provider' })} source={chatIcon} style={styles['chatIcon']} />
                                        </MyView>
                                    </MyView>
                                </MyView>
                            </Touchable>
                        </Card>
                    </MyView>
                    <MyText style={styles['services']} >
                        {"SERVICES"}
                    </MyText>
                    <MyView style={{ marginTop: dynamicSize(10) }}>
                        <FlatList
                            key='hairType'
                            showsVerticalScrollIndicator={false}
                            data={appointmentdetail['Services']}
                            keyExtractor={_keyExtractor}
                            renderItem={(item, index) => _renderHairType(item, index)}
                            contentContainerStyle={styles['hairTypeFlatList']}
                            numColumns={2}
                            columnWrapperStyle={{ paddingHorizontal: dynamicSize(0), justifyContent: 'space-between' }}
                        />
                    </MyView>
                    <MyView style={styles['notes']} >
                        <MyText style={styles['notetitle']} >
                            {"Note"}
                        </MyText>
                        <MyText style={styles['notetext']}>
                            {appointmentdetail['Note']}
                        </MyText>
                    </MyView>
                </MyView>
            </ScrollView>
        </SafeArea>
    )
}

export default ServiceDetail