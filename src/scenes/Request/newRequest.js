import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, Loader } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon } from '../../components/icons'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { getProviderAppointmentAction, loaderAction, approverejectAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { MyAlert } from '../../components/alert'
import { SCREEN_HEIGHT } from '../../components/helper'
import { getFontSize } from '../../utils/responsive'

// New request UI
const NewRequest = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { BOOKING_ID, REJECT, ACCEPT, ACCEPT_MESSAGE, REJECT_MESSAGE } = state['localeReducer']['locale']
    const { providerappointment } = state['profileReducer']
    const { loading } = state['loaderReducer']

    const [acceptModalVisible, setacceptModal] = useState(false)
    const [rejectModalVisible, setrejectModal] = useState(false)
    const [appointmentId, setappointmentId] = useState('')
    const [customerId, setcustomerId] = useState('')

    useFocusEffect(
        useCallback(() => {
            call()
        }, [])
    )

    const call = () => {
        dispatch(loaderAction(true))
        dispatch(getProviderAppointmentAction(2))
    }

    const dateHandler = (dateItem) => {
        const d = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const a = d.getDate()
        const b = months[d.getMonth()]
        const c = d.getFullYear()
        const e = a + " " + b + ", " + c
        return e
    }
    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    const _approve = (item) => {
        setappointmentId(item['AppointmentId'])
        setcustomerId(item['CustomerId'])
        setacceptModal(true)
    }

    const _reject = (item) => {
        setappointmentId(item['AppointmentId'])
        setcustomerId(item['CustomerId'])
        setrejectModal(true)
    }

    const _onYesPress = () => {
        const param = {
            [apiKey['AppointmentId']]: appointmentId,
            [apiKey['IsAccepted']]: true,
            [apiKey['CustomerId']]: customerId
        }
        dispatch(approverejectAction(param))
        setacceptModal(false)
        setTimeout(() => {
            call()
        }, 2000)
    }

    const _onNoPress = () => {
        setacceptModal(false)
    }

    const _onrejectYesPress = () => {
        let param = {
            [apiKey['AppointmentId']]: appointmentId,
            [apiKey['IsAccepted']]: false,
            [apiKey['CustomerId']]: customerId
        }
        dispatch(approverejectAction(param))
        setrejectModal(false)
        setTimeout(() => {
            call()
        }, 1000)

    }

    const _onrejectNoPress = () => {
        setrejectModal(false)
    }

    const _renderProgress = ({ item, index }) => {
        return (
            <Card key={index.toString()} style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item?.['AppointmentId'] ? item?.['AppointmentId'] : "LOADING"}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{dateHandler(item['AppointmentDate']) + ' ' + item['AppointmentTime']}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item?.['CustomerProfilePic'] }} style={styles['image']} />
                        <MyView style={{ flex: 1 }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }} >
                                <MyText style={styles['name']}>{item?.['CustomerFirstName'] ? `${item['CustomerFirstName']} | ` : "LOADING"}</MyText>
                                <MyText style={styles['name']}>{item?.['CustomerName'] ? item['CustomerName'] : "LOADING"}</MyText>

                            </MyView>
                            <MyView style={styles['innerContainer']}>
                                <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['CustomerId'], type: 'customer' })} source={chatIcon} style={styles['chatIcon']} />
                                <Button onPress={() => _approve(item)} style={styles['buttonContainer']} textStyle={styles['buttonText']} text={ACCEPT} />
                                <Button onPress={() => _reject(item)} style={[styles['buttonContainer'], { backgroundColor: THEME }]} textStyle={styles['buttonText']} text={REJECT} />
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
                <Loader
                    isVisible={loading} />
                <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={ACCEPT_MESSAGE} isVisible={acceptModalVisible} />
                <MyAlert onYesPress={_onrejectYesPress} onNoPress={_onrejectNoPress} message={REJECT_MESSAGE} isVisible={rejectModalVisible} />
                {providerappointment.length != 0 ?
                    <FlatList
                        key='inProgress'
                        data={providerappointment}
                        renderItem={_renderProgress}
                        ItemSeparatorComponent={_renderSeperator}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['flatList']}
                        showsVerticalScrollIndicator={false}

                    />
                    :
                    <MyView>
                        <MyText style={{ fontSize: getFontSize(14), color: THEME, alignSelf: "center", marginVertical: SCREEN_HEIGHT * 0.32 }}>
                            {loading ? null : "No New Request"}
                        </MyText>
                    </MyView>
                }
            </MyView>
        </SafeArea>
    )
}

export default NewRequest