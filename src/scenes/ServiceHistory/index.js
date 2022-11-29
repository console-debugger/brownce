import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, CurveView, Loader, EmptyMessage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon, mediumStarIcon } from '../../components/icons'
import styles from './styles'
import { loaderAction, getHistoryAppointmentAction } from '../../redux/action'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'

// Services history UI
const ServiceHistory = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { loading } = state['loaderReducer']
    const { history } = state['profileReducer']
    const { BOOKING_ID } = state['localeReducer']['locale']

    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getHistoryAppointmentAction())
    }, [])

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    const _renderEmptyHistory = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.37 }} message={"You are yet to complete a service."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    const _renderProgress = ({ item, index }) => {
        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item['AppointmentId']}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{item['AppointmentTime']}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item['CustomerProfilePic'] }} style={styles['image']} />
                        <MyView style={{ marginLeft: SCREEN_WIDTH * 0.01 }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                <MyText style={styles['name']}>{`${item['CustomerName']} | `}</MyText>

                                <MyText style={styles['name']}>{item['Username']}</MyText>
                            </MyView>
                            <MyView style={styles['star']} >
                                <MyView style={styles['starView']}>
                                    <MyImage source={mediumStarIcon} />
                                    <MyText style={styles['ratingCount']}>{item['UserRating'] === null ? `0/5` : `${item['UserRating']}/5`}</MyText>
                                </MyView>
                            </MyView>
                            <MyView style={styles['innerContainer']}>
                                <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['CustomerId'], type: 'customer' })} source={chatIcon} style={styles['chatIcon']} />
                                <MyText style={styles['completed']} >{"Completed"}</MyText>
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
                <Loader isVisible={loading} />
                <CurveView style={{}} />
                <MyView style={{ marginBottom: 20, top: -20 }} >
                    <FlatList
                        key='inProgress'
                        data={history}
                        ListEmptyComponent={_renderEmptyHistory}
                        renderItem={_renderProgress}
                        ItemSeparatorComponent={_renderSeperator}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['flatList']}
                        showsVerticalScrollIndicator={false}
                    />
                </MyView>
            </MyView>
        </SafeArea>
    )
}

export default ServiceHistory