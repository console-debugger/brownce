import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, Loader } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon } from '../../components/icons'
import styles from './styles'
import { loaderAction, getCustomerAppointementsAction, cancelAppointment } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { apiKey } from '../../services/serviceConstant'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { MyAlert } from '../../components/alert'
import { getFontSize } from '../../utils/responsive'

// @ Appointment in progress UI

const InProgressAppointment = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CANCEL, BOOKING_ID, CANCEL_MESSAGE } = state['localeReducer']['locale']
    const { customerappointment } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const [cancelModalVisible, setcancelModal] = useState(false)
    const [id, setid] = useState('')

    useFocusEffect(
        useCallback(() => {
            dispatch(loaderAction(true))
            dispatch(getCustomerAppointementsAction(1))
        }, [])
    )
    const fetchCustomerAppointment = () => {
        dispatch(getCustomerAppointementsAction(1))
    }
    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    const _cancel = (id) => {
        setid(id)
        setcancelModal(true)

    }

    // @ Cancel Appointment

    const _onYesPress = async () => {
        const formData = new FormData()
        formData.append(apiKey['AppointmentId'], id)
        dispatch(cancelAppointment(formData))
        setcancelModal(false)
        setTimeout(() => {
            fetchCustomerAppointment()
        }, 1000)
    }
    const _onNoPress = () => setcancelModal(false)

    const dateHandler = dateItem => {
        const dateTimeStamp = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const date = dateTimeStamp.getDate()
        const month = months[dateTimeStamp.getMonth()]
        const year = dateTimeStamp.getFullYear()
        const completeDate = date + " " + month + " " + year
        return completeDate
    }
    const _renderProgress = ({ item, index }) => {
        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item?.['AppointmentId'] ? item?.['AppointmentId'] : "LOADING"}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{dateHandler(item['AppointmentDate']) + ',' + item['AppointmentTime']}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item?.['SPProfilePic'] }} style={styles['image']} />
                        <MyView style={{ marginHorizontal: SCREEN_WIDTH * 0.01 }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                <MyText style={styles['name']}>{`${item['SPName']} | `}</MyText>
                                <MyText style={styles['name']}>{item['Username']}</MyText>

                            </MyView>
                            <MyView style={styles['innerContainer']}>
                                <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['SPId'], type: 'provider' })} source={chatIcon} style={styles['chatIcon']} />
                                <Button onPress={() => _cancel(item['AppointmentId'])} style={styles['buttonContainer']} textStyle={styles['buttonText']} text={CANCEL} />
                            </MyView>
                        </MyView>
                    </MyView>
                </Touchable>
            </Card>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <Loader
                isVisible={loading} />
            <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={CANCEL_MESSAGE} isVisible={cancelModalVisible} />

            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
                {customerappointment.length != 0 ?
                    <FlatList
                        key='inProgress'
                        data={customerappointment}
                        renderItem={_renderProgress}
                        ItemSeparatorComponent={_renderSeperator}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['flatList']}
                        showsVerticalScrollIndicator={false}
                    />
                    :
                    <MyText style={{ fontSize: getFontSize(14), color: THEME, alignSelf: "center", marginVertical: SCREEN_HEIGHT * 0.35 }} >
                        {loading ? "" : "No In Progress Appointments"}
                    </MyText>}
            </MyView>
        </SafeArea>
    )
}

export default InProgressAppointment