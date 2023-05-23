import React, { useEffect, useState } from 'react'
import { FlatList, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, SecondaryButton } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { updateServicesAction, changeServiceAction, clearMessageCase, getServicesByProfessionAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'
import { GET_ALL_SERVIES_SUCCESS_ACTION, GET_SERVICES_BY_PROFESSION_SUCCESS_ACTION } from '../../redux/action/type'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'

// All services UI
const AllServices = ({ navigation, route }) => {
    const { selectedServices } = route.params
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CONTINUE } = state['localeReducer']['locale']
    const { services, customservices, messageCase, allservices, servicesByProfession } = state['hairReducer']
    const { ServicesProvided } = state.profileReducer.providerprofile
    const [servs, setServs] = useState([])

    const [selectedSubServices, setSelectedSubServices] = useState([])

    useEffect(() => {
        dispatch(getServicesByProfessionAction(selectedServices))
    }, [])

    useEffect(() => {
        setServs([...servicesByProfession])
    }, [servicesByProfession])


    useEffect(() => {
        if (messageCase === GET_SERVICES_BY_PROFESSION_SUCCESS_ACTION) {
            dispatch(clearMessageCase())
            const selectedServs = ServicesProvided.map(item => item?.ServiceMasterId)
            setSelectedSubServices([...selectedServs])
            // const temp = []
            // servicesByProfession.forEach(element => {
            //     element['Services'].forEach(s => {
            //         if(selectedServs.includes(s?.ServiceMasterId)){
            //             temp.push
            //         }
            //     });
            // });
            // // servicesByProfession.map(item => selectedServs.includes(item?.ServiceMasterId) ? { ...item, status: true } : { ...item })
            // console.log("temp => ", temp)
            // setServs([...temp])
            // setSelectedSubServices([...temp])
        }
    }, [messageCase])

    const _keyExtractor = (item, index) => item + index

    const _selectServices = (item, index, serv, servIndex) => () => {
        // const replica = [...servs]
        // replica[index]['status'] = !replica[index]['status']
        // setServs([...replica])
        // dispatch(updateServicesAction(replica))

        let temp = [...selectedSubServices]
        if (!temp.includes(serv['ServiceMasterId'])) {
            temp.push(serv['ServiceMasterId'])
        } else {
            temp.splice(temp.indexOf(serv['ServiceMasterId']), 1)
        }
        setSelectedSubServices([...temp])
    }

    // const _renderServies = ({ item, index }) => {
    //     return (
    //         <SecondaryButton
    //             style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5), height: isAndroid ? SCREEN_HEIGHT * 0.06 : SCREEN_HEIGHT * 0.05, }]}
    //             textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
    //             text={item['ServiceName']}
    //             onPress={_selectServices(item, index)}
    //         />
    //     )
    // }

    const _renderServies = ({ item, index }) => {
        return (
            <MyView>
                <MyText style={{ fontSize: getFontSize(14), color: THEME, fontFamily: montserratBold }}>{item['Name']}</MyText>
                <MyView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: dynamicSize(10) }}>
                    {
                        item['Services']?.length
                            ?
                            item['Services'].map((serv, servIndex) => {
                                const isSelected = selectedSubServices.includes(serv['ServiceMasterId'])
                                return <SecondaryButton
                                    style={[isSelected ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5), height: isAndroid ? SCREEN_HEIGHT * 0.06 : SCREEN_HEIGHT * 0.05, }]}
                                    textStyle={isSelected ? styles['selectedText'] : styles['unselectedText']}
                                    text={serv['ServiceName']}
                                    onPress={_selectServices(item, index, serv, servIndex)}
                                />
                            })
                            :
                            <MyView>
                                <MyText style={{ fontSize: getFontSize(14), color: BLACK, fontFamily: montserratMedium }}>{'No services found for this profession'}</MyText>
                            </MyView>
                    }
                </MyView>
            </MyView>
        )
    }

    const _validate = () => {
        // const filterServiceId = services.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        // const filterServiceId = servs.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterServiceId = [...selectedSubServices]
        const filterCustomServiceId = customservices.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterArray = [...filterCustomServiceId, ...filterServiceId]

        const isUpdate = true
        const param = {
            [apiKey['SERVICE_ID']]: filterArray,
            [apiKey['IS_UPDATE']]: isUpdate
        }
        if (filterServiceId.length) {
            dispatch(changeServiceAction(param))
        }
        else {
            showToast('Please select at least one service')
        }
    }


    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.01 }]}>{''}</MyText>
                <FlatList
                    key='services'
                    keyExtractor={_keyExtractor}
                    data={servs}
                    renderItem={_renderServies}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles['serviceList']}
                // numColumns={2}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                <Button onPress={_validate} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={CONTINUE} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default AllServices