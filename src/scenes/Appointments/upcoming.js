import React, { useEffect, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, Loader, EmptyMessage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, BLACK } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { imagePlaceholder1, chatIcon } from '../../components/icons'
import styles from './styles'
import { loaderAction, getCustomerAppointementsAction, cancelAppointment } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { apiKey } from '../../services/serviceConstant'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { MyAlert } from '../../components/alert'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import moment from 'moment'

const UpComing = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CANCEL, BOOKING_ID, CANCEL_MESSAGE } = state['localeReducer']['locale']
    const { customerappointment, customerupcomingappointment } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const [cancelModalVisible, setcancelModal] = useState(false)
    const [id, setid] = useState('')

    useFocusEffect(
        useCallback(() => {
            call()
        }, [])
    )
    const call = () => {
        dispatch(loaderAction(true))
        dispatch(getCustomerAppointementsAction(3))
    }
    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    const _cancel = (id) => {
        setid(id)
        setcancelModal(true)

    }
    const _onYesPress = async () => {
        let formData = new FormData()

        formData.append(apiKey['AppointmentId'], id)

        dispatch(cancelAppointment(formData))
        call()
        setcancelModal(false)
    }
    const _onNoPress = () => {
        setcancelModal(false)
    }

    const dateHandler = (dateItem) => {
        const d = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const a = d.getDate()
        const b = months[d.getMonth()]
        const c = d.getFullYear()
        const e = a + " " + b + " " + c
        return (e)
    }

    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.37 }} message={"No Upcoming Appointments."} />)
        }
        else return (<EmptyMessage message={""} />)
    }
    const _renderProgress = ({ item, index }) => {
        const disable = true
        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item?.['AppointmentId'] ? item?.['AppointmentId'] : "LOADING"}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{moment(item['AppointmentDate']).format('MMM Do, YYYY') + ',' + item['AppointmentTime']}</MyText>
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
                                <Button disabled={disable} onPress={() => _cancel(item['AppointmentId'])} style={styles['buttonContainer']} textStyle={styles['buttonText']} text={item['AppointmentStatus'] == 1 ? "PENDING" : "ACCEPTED"} />
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

                <FlatList
                    key='inProgress'
                    data={customerupcomingappointment}
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

export default UpComing