import React, { useEffect, useRef, useState } from 'react'
import { MyImage, MyText, MyView, SafeArea, Touchable, TouchableIcon } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { addUserIcon, bookingIcon, cancelEventIcon, clientsIcon, clockIcon, growthIcon, helpIcon, mediumStarIcon, moneyIcon, repeatClientsIcon, sortIcon, standingTime } from '../../components/icons'
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { getBrownceStatsAction, loaderAction } from '../../redux/action'
import moment from 'moment'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { dynamicSize } from '../../utils/responsive'
import { SCREEN_WIDTH } from '../../components/helper'
import { MyAlert } from '../../components/alert'
import { BLACK, THEME } from '../../utils/colors'

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
        MOST_POPULAR_SERVICES,
        NA,
        BY_WEEK,
        BY_MONTH,
        NO_DATA_FOUND
    } = state['localeReducer']['locale']
    const { providerprofile } = state['profileReducer']
    const filterData = [{
        name: BY_WEEK,
        type: 1
    },
    {
        name: BY_MONTH,
        type: 2
    }
    ]


    const data = [
        {
            icon: growthIcon,
            value: '0',
            label: REVENUE,
            key: 'revenue',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: bookingIcon,
            value: '0',
            label: COMPLETED_BOKINGS,
            key: 'completedBookings',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: standingTime,
            value: '0',
            label: STANDING_TIME,
            key: 'standingTime',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: clientsIcon,
            value: '0',
            label: TOTAL_NUMBER_OF_CLIENTS,
            key: 'totalClients',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: addUserIcon,
            value: '0',
            label: NEW_CLIENTS,
            key: 'newClients',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: repeatClientsIcon,
            value: '0',
            label: REPEAT_CLIENTS,
            key: 'repeatClients',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: cancelEventIcon,
            value: '0',
            label: CANCELLED_APPOINTMENTS,
            key: 'cancelledAppointment',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: clockIcon,
            value: '0',
            label: AVERAGE_SERVICE_TIME,
            key: 'averageServiceTime',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            icon: moneyIcon,
            value: '0',
            label: AVERAGE_BOOKING,
            key: 'averageBooking',
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
    ]

    const [statsData, setStatsData] = useState(data)
    const [refresh, setRefresh] = useState(false)
    const [brownceStatsDetail, setBrownceStatsDetail] = useState({})
    const [popupModalVisible, setPopupModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(filterData?.[0].type)
    const [sortData, setSortData] = useState(filterData)
    const [filterPopupVisible, setFilterPopupVisible] = useState(false)

    const popupDetail = useRef({})

    useEffect(() => {
        fetchStatsData(selectedFilter)
    }, [selectedFilter])

    const fetchStatsData = (filterType) => {
        dispatch(loaderAction(true))
        const param = {
            type: selectedFilter
        }
        dispatch(getBrownceStatsAction(param, response => {
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
                setBrownceStatsDetail(response)
            }
            setRefresh(prevState => !prevState)
            console.log('response=>', JSON.stringify(response))
        }))
    }

    const openPopupModal = () => setPopupModalVisible(true)

    const closePopupModal = () => setPopupModalVisible(false)

    const openFilterPopup = () => setFilterPopupVisible(true)

    const closeFilterPopup = () => setFilterPopupVisible(false)

    const onHelpPress = (item) => () => {
        popupDetail.current = item
        openPopupModal()
    }

    const selectFilter = item => () => {
        setSelectedFilter(item.type)
        closeFilterPopup()
    }

    const renderStats = ({ item, index }) => {
        return (
            <MyView style={[styles.statCardContainer, { marginHorizontal: index % 3 == 1 ? 10 : 0 }]}>
                <TouchableIcon onPress={onHelpPress(item)} source={helpIcon} style={styles.helpIconContainer} imageStyle={styles.helpIcon} />
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
            <MyView style={{ flex: 1 }}>
                <ScrollView style={styles.mainContainer} contentContainerStyle={{ alignItems: 'center' }} >
                    <MyView style={styles.topRow}>
                        <MyImage source={{ uri: providerprofile?.ProfilePic || '' }} style={styles.pic} />
                        <MyView style={styles.nameContainer}>
                            <MyText numberOfLines={2} style={styles.name}>{providerprofile?.Username || ''}</MyText>
                            <MyView>
                                <TouchableIcon onPress={openFilterPopup} source={sortIcon} imageStyle={styles.sortIcon} />
                                {filterPopupVisible && <MyView style={styles.popupView}>
                                    {sortData?.map((each, index) => {
                                        return (
                                            <Touchable key={index?.toString()} onPress={selectFilter(each)}>
                                                <MyText style={[styles.sortText, { color: each.type == selectedFilter ? THEME : BLACK }]}>{each.name}</MyText>
                                            </Touchable>
                                        )
                                    })}
                                </MyView>}
                            </MyView>
                        </MyView>
                    </MyView>
                    <MyView style={styles.sinceContainer}>
                        <MyView>
                            <MyText style={styles.bold}>{brownceStatsDetail?.SPProfile?.CreatedAt ? moment(brownceStatsDetail?.SPProfile?.CreatedAt).format('MMM DD, YYYY') : NA}</MyText>
                            <MyText style={styles.mediumText}>{BROWNCER_SINCE}</MyText>
                        </MyView>
                        <MyView style={{ alignItems: 'center' }}>
                            <MyView style={styles.startContainer}>
                                <MyText style={[styles.bold, { marginRight: 5 }]}>{brownceStatsDetail?.SPProfile?.Rating ? parseFloat(brownceStatsDetail?.SPProfile?.Rating)?.toFixed(1) : '0.0'}</MyText>
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
                    <MyView style={[styles.statCardContainer, { width: SCREEN_WIDTH - dynamicSize(20), marginHorizontalL: dynamicSize(10), marginBottom: dynamicSize(20) }]}>
                        <TouchableIcon onPress={onHelpPress({ info: 'dummy test, can be replaced in future' })} source={helpIcon} style={styles.helpIconContainer} imageStyle={styles.helpIcon} />
                        <MyView style={styles.rowAlignCenter}>
                            <MyText style={styles.belowTable}>{MOST_POPULAR_SERVICES}</MyText>
                            <MyImage source={bookingIcon} style={[styles.cardIcon, { marginLeft: dynamicSize(10) }]} />
                        </MyView>
                        <MyView style={{ width: '100%', paddingHorizontal: dynamicSize(15), paddingBottom: 15 }}>
                            {brownceStatsDetail?.PopularServices?.length ?
                                brownceStatsDetail?.PopularServices?.map((item, index) => {
                                    return (
                                        <MyText key={index?.toString()} style={[styles.statsValue, { flex: 1 }]}>{`${index + 1}. ${item.Name}`}</MyText>
                                    )
                                })
                                :
                                <MyText style={[styles.statsValue, { alignSelf: 'center' }]}>{NO_DATA_FOUND}</MyText>
                            }
                        </MyView>
                    </MyView>
                    <MyAlert
                        isPopup
                        onPress={closePopupModal}
                        message={popupDetail.current?.info || ''}
                        isVisible={popupModalVisible}
                    />
                </ScrollView>
            </MyView>
        </SafeArea>
    )
}

export default MyBrownceStats