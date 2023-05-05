import React, { useEffect, useState } from 'react'
import { MyImage, MyText, MyView, SafeArea, TouchableIcon } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { addUserIcon, bookingIcon, cancelEventIcon, clientsIcon, clockIcon, growthIcon, mediumStarIcon, moneyIcon, repeatClientsIcon, sortIcon, standingTime } from '../../components/icons'
import { FlatList, ScrollView } from 'react-native'
import { getBrownceStatsAction, loaderAction } from '../../redux/action'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { dynamicSize } from '../../utils/responsive'

const MyBrownceStats = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const {
        BROWNCER_SINCE,
        AVERAGE_RATING,
        REVENUE,
        COMPLETED_BOKINGS,
        STANDING_TIME,
        TOTAL_NUMBER_OF_CLIENTS,
        NEW_CLIENTS,
        REPEAT_CLIENTS,
        CANCELLED_APPOINTMENTS,
        AVERAGE_SERVICE_TIME,
        AVERAGE_BOOKING,
        HOURS,
        MOST_POPULAR_SERVICES
    } = state['localeReducer']['locale']
    const { providerprofile } = state['profileReducer']

    const data = [
        {
            icon: growthIcon,
            value: '0',
            label: REVENUE,
            key: 'revenue',
            info: ''
        },
        {
            icon: bookingIcon,
            value: '0',
            label: COMPLETED_BOKINGS,
            key: 'completedBookings',
            info: ''
        },
        {
            icon: standingTime,
            value: '0',
            label: STANDING_TIME,
            key: 'standingTime',
            info: ''
        },
        {
            icon: clientsIcon,
            value: '0',
            label: TOTAL_NUMBER_OF_CLIENTS,
            key: 'totalClients',
            info: ''
        },
        {
            icon: addUserIcon,
            value: '0',
            label: NEW_CLIENTS,
            key: 'newClients',
            info: ''
        },
        {
            icon: repeatClientsIcon,
            value: '0',
            label: REPEAT_CLIENTS,
            key: 'repeatClients',
            info: ''
        },
        {
            icon: cancelEventIcon,
            value: '0',
            label: CANCELLED_APPOINTMENTS,
            key: 'cancelledAppointment',
            info: ''
        },
        {
            icon: clockIcon,
            value: '0',
            label: AVERAGE_SERVICE_TIME,
            key: 'averageServiceTime',
            info: ''
        },
        {
            icon: moneyIcon,
            value: '0',
            label: AVERAGE_BOOKING,
            key: 'averageBooking',
            info: ''
        },
    ]

    const [statsData, setStatsData] = useState(data)

    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getBrownceStatsAction({}, response => {
            if (response) {
                statsData.forEach(each => {
                    if (each.key == 'revenue') { each.value = `$${response.Revenue}` }
                    if (each.key == 'completedBookings') { each.value = response.CompletedBooking }
                    if (each.key == 'standingTime') { each.value = `${response.StandingTime} ${HOURS}` }
                    if (each.key == 'totalClients') { each.value = response.TotalNumberOfClient }
                    if (each.key == 'newClients') { each.value = response.NewClients }
                    if (each.key == 'repeatClients') { each.value = response.RepeatClients }
                    if (each.key == 'cancelledAppointment') { each.value = response.CanceledAppointments }
                    if (each.key == 'averageServiceTime') { each.value = `${response.AverageServiceTime} ${HOURS}` }
                    if (each.key == 'averageBooking') { each.value = `$${response.AverageBookingEarning}` }
                })
            }
            // setStatsData([...data])
            console.log('response=>', JSON.stringify(response))
        }))
    }, [])

    const renderStats = ({ item, index }) => {
        return (
            <MyView style={[styles.statCardContainer, { marginHorizontal: index % 3 == 1 ? 10 : 0 }]}>
                <MyView style={{ flex: 1, alignItems: 'center' }}>
                    <MyImage source={item.icon} style={styles.cardIcon} />
                    <MyText style={styles.statsValue}>{item.value}</MyText>
                </MyView>
                <MyText style={styles.statsLabel}>{item.label}</MyText>
            </MyView>
        )
    }

    const renderSeparator = () => (<MyView style={styles.separator} />)

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ alignItems: 'center' }} >
                <MyView style={styles.topRow}>
                    <MyImage source={{ uri: providerprofile?.ProfilePic || '' }} style={styles.pic} />
                    <MyView style={styles.nameContainer}>
                        <MyText numberOfLines={2} style={styles.name}>{providerprofile?.Username || ''}</MyText>
                        <MyImage source={sortIcon} style={styles.sortIcon} />
                    </MyView>
                </MyView>
                <MyView style={styles.sinceContainer}>
                    <MyView>
                        <MyText style={styles.bold}>{'Feb 26, 2021'}</MyText>
                        <MyText style={styles.mediumText}>{BROWNCER_SINCE}</MyText>
                    </MyView>
                    <MyView style={{ alignItems: 'center' }}>
                        <MyView style={styles.startContainer}>
                            <MyText style={[styles.bold, { marginRight: 5 }]}>{'4.5'}</MyText>
                            <MyImage source={mediumStarIcon} />
                        </MyView>
                        <MyText style={styles.mediumText}>{AVERAGE_RATING}</MyText>
                    </MyView>
                </MyView>
                <FlatList
                    data={statsData}
                    renderItem={renderStats}
                    numColumns={3}
                    scrollEnabled={false}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={styles.statList}
                />
                <MyView style={[styles.statCardContainer, { width: '100%', marginHorizontal: dynamicSize(10) }]}>
                    <MyView>
                        <MyText style={styles.belowTable}>{MOST_POPULAR_SERVICES}</MyText>
                        {/* <MyImage /> */}
                    </MyView>
                </MyView>
            </ScrollView>
        </SafeArea>
    )
}

export default MyBrownceStats