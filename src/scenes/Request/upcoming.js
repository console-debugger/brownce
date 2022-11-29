import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, EmptyMessage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GRAY, LIGHT_BROWN, LIGHT_WHITE } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon } from '../../components/icons'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { getProviderAppointmentAction, loaderAction, startServiceAction } from '../../redux/action'
import { MyAlert } from '../../components/alert'
import { useState } from 'react'
import { SCREEN_HEIGHT } from '../../components/helper'

const START_MESSAGE = "Are you sure you want to start this service?"

// Upcoming UI design
const UpcomingRequest = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { upcomingappointment } = state['profileReducer']
    const { BOOKING_ID } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']

    const [ModalVisible, setModalVisible] = useState(false)
    const [currentDate, setcurrentDate] = useState(new Date());
    const [id, setId] = useState('')


    useFocusEffect(
        useCallback(() => {
            call()
        }, [])
    )

    const call = () => {
        dispatch(loaderAction(true))
        dispatch(getProviderAppointmentAction(3))
    }

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

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

    const _startService = (id) => {
        setId(id)
        setModalVisible(true)
    }

    const _onYesPress = () => {
        const formData = new FormData()
        formData.append('AppointmentId', id)
        dispatch(startServiceAction(formData))
        setModalVisible(false)
        setTimeout(() => {
            call()
        }, 2000)
    }

    const _onNoPress = () => setModalVisible(false)

    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.32 }} message={"No Upcoming Appointments."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    const _renderProgress = ({ item, index }) => {
        let disable = false
        if (currentDate.getTime() === item['AppointmentTime']) {
            disable = false
        }
        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate("serviceDetail", { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item['AppointmentId']}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{dateHandler(item['AppointmentDate']) + ' ' + item['AppointmentTime']}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item['CustomerProfilePic'] }} style={styles['image']} />
                        <MyView style={{ flex: 1 }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                <MyText style={styles['name']}>{item?.['CustomerFirstName'] ? `${item['CustomerFirstName']} | ` : "LOADING"}</MyText>
                                <MyText style={styles['name']}>{item?.['CustomerName'] ? item['CustomerName'] : "LOADING"}</MyText>
                            </MyView>
                            <MyView style={styles['innerContainer']}>
                                <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['CustomerId'] , type: 'customer'})} source={chatIcon} style={styles['chatIcon']} />
                                <Button disabled={item.CanStart ? false : true} onPress={() => _startService(item['AppointmentId'])} style={[styles['buttonContainer'], { backgroundColor: item.CanStart ? LIGHT_BROWN : GRAY }]} textStyle={styles['buttonText']} text={"START"} />
                            </MyView>
                        </MyView>
                    </MyView>
                </Touchable>
            </Card>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
                <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={START_MESSAGE} isVisible={ModalVisible} />
                <FlatList
                    key='inProgress'
                    data={upcomingappointment}
                    renderItem={_renderProgress}
                    ListEmptyComponent={_renderEmpty}
                    ItemSeparatorComponent={_renderSeperator}
                    keyExtractor={_keyExtractor}
                    contentContainerStyle={styles['flatList']}
                    showsVerticalScrollIndicator={false}
                />
            </MyView>
        </SafeArea>
    )
}

export default UpcomingRequest