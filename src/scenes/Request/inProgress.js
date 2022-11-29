import React, { useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon, editIcon, editWhiteIcon } from '../../components/icons'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { getProviderAppointmentAction, loaderAction, appointmentCompleteAction, updateServicePriceAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { getFontSize } from '../../utils/responsive'
import { SCREEN_HEIGHT } from '../../components/helper'
import { MyAlert, UpdatePrice } from '../../components/alert'
import { useState } from 'react'

const COMPLETE_MESSAGE = "Are you sure to want to complete this service?"

// In progress tab request
const InProgressRequest = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { COMPLETE, BOOKING_ID } = state['localeReducer']['locale']
    const { inprogressappointment } = state['profileReducer']
    const { loading } = state['loaderReducer']

    const [modalVisible, setModalVisible] = useState(false)
    const [updatePriceModalVisible, setUpdatePriceModalVisible] = useState(false)
    const [price, setPrice] = useState('')
    const [id, setId] = useState('')

    useFocusEffect(
        useCallback(() => {
            call()
        }, [])
    )

    const call = () => {
        dispatch(loaderAction(true))
        dispatch(getProviderAppointmentAction(1))
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

    const _complete = (id) => {
        setId(id)
        setModalVisible(true)
    }

    const _onYesPress = () => {
        const param = {
            [apiKey['AppointmentId']]: id
        }

        dispatch(appointmentCompleteAction(param))
        setModalVisible(false)
        setTimeout(() => {
            call()
        }, 1000)
    }

    const _onNoPress = () => {
        setModalVisible(false)
    }

    const updatePrice = (service) => {
        setPrice(String(service['Amount']))
        setId(service['AppointmentId'])
        setUpdatePriceModalVisible(true)
    }

    const onSubmit = () => {
        const param = {
            [apiKey['AppointmentId']]: id,
            [apiKey['Amount']]: Number(price),
        }
        setUpdatePriceModalVisible(false)
        if (Number(price) > 0) {
            dispatch(updateServicePriceAction(param))
        }
    }

    const onCancel = () => setUpdatePriceModalVisible(false)

    const _renderProgress = ({ item, index }) => {
        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item?.['AppointmentId'] })}>
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item?.['AppointmentId'] ? item?.['AppointmentId'] : "LOADING"}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{item?.['AppointmentDate'] ? dateHandler(item['AppointmentDate']) + ' ' + item['AppointmentTime'] : "LOADING"}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item['CustomerProfilePic'] }} style={styles['image']} />
                        <MyView style={{ flex: 1 }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                <MyText style={styles['name']}>{item?.['CustomerFirstName'] ? `${item['CustomerFirstName']} | ` : "LOADING"}</MyText>
                                <MyText style={styles['name']}>{item?.['CustomerName'] ? item['CustomerName'] : "LOADING"}</MyText>

                            </MyView>
                            <MyView style={styles['innerContainer']}>
                                <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['CustomerId'], type: 'customer' })} source={chatIcon} style={styles['chatIcon']} />
                                <Button onPress={() => _complete(item['AppointmentId'])} style={[styles['buttonContainer'], { backgroundColor: THEME }]} textStyle={styles['buttonText']} text={COMPLETE} />
                                <Button
                                    onPress={() => updatePrice(item)}
                                    style={[styles['buttonContainer'], { backgroundColor: THEME, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }]}
                                    textStyle={styles['buttonText']}
                                    text={`$${item?.['Amount']}`}
                                    icon={editWhiteIcon}
                                    onIconPress={() => { }}
                                    iconStyle={styles['editIcon']}
                                    iconImageStyle={{ height: '100%', width: '100%' }}
                                />
                            </MyView>
                        </MyView>
                    </MyView>
                </Touchable>
            </Card>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, paddingBottom: -useSafeAreaInsets().bottom }}>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
                <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={COMPLETE_MESSAGE} isVisible={modalVisible} />
                <UpdatePrice isVisible={updatePriceModalVisible} onCancel={onCancel} onSubmit={onSubmit} value={price} onChangeText={setPrice} />
                {inprogressappointment.length != 0 ?
                    <FlatList
                        key='inProgress'
                        data={inprogressappointment}
                        renderItem={_renderProgress}
                        ItemSeparatorComponent={_renderSeperator}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['flatList']}
                        showsVerticalScrollIndicator={false}

                    />
                    : <MyView>
                        <MyText style={{ fontSize: getFontSize(14), color: THEME, alignSelf: "center", marginVertical: SCREEN_HEIGHT * 0.32 }}>
                            {loading ? null : "No In Progress Request"}
                        </MyText>
                    </MyView>}
            </MyView>

        </SafeArea>
    )
}

export default InProgressRequest