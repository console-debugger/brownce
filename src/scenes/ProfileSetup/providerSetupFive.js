import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, SecondaryButton, Touchable } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { navigateToScreen } from '../../navigation/rootNav'
import { getAllServicesAction, saveServiceAction, loaderAction, getSpDataStepAction, updateProfileSetupervicesAction, getServicesByProfessionAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_BROWN, LIGHT_WHITE, THEME } from '../../utils/colors'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'


// Provider profile setup
const ProviderProfileSetupFive = ({ navigation, route }) => {
    const { selectedServices } = route.params
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SELECT, YOUR_SERVICES, CONTINUE } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const { allservices, allcustomservices, servicesByProfession } = state['hairReducer']
    const [selectedSubServices, setSelectedSubServices] = useState([])

    useEffect(() => {
        // GetServicesByProfessionIds
        // dispatch(getAllServicesAction())
        dispatch(getServicesByProfessionAction(selectedServices))
    }, [])

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getSpDataStepAction(10))
        }, [])
    )

    const _keyExtractor = (item, index) => item + index

    const _selectServices = (item, index, service, serviceIndex) => () => {
        // const replica = [...servicesByProfession]
        // replica[index]['Services'][serviceIndex]['status'] = !replica[index]['Services'][serviceIndex]['status']
        // console.log("eplica[index]['Services'][serviceIndex]['status'] => ", replica[index]['Services'][serviceIndex]['status'])
        // dispatch(updateProfileSetupervicesAction(replica))
        let temp = [...selectedSubServices]
        if (!temp.includes(service['ServiceMasterId'])) {
            temp.push(service['ServiceMasterId'])
        } else {
            temp.splice(temp.indexOf(service['ServiceMasterId']), 1)
        }
        setSelectedSubServices([...temp])
    }

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
        // const filterServiceId = servicesByProfession.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterServiceId = [...selectedSubServices]
        const filterCustomServiceId = allcustomservices.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterArray = [...filterServiceId, ...filterCustomServiceId]
        const param = {
            [apiKey['SERVICE_ID']]: filterArray
        }
        if (filterArray.length) {
            dispatch(saveServiceAction(param))
        }
        else {
            showToast("Please select services")
        }
    }

    const _complete_later = () => navigateToScreen('providerProfileSetupSix')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.04 }]}>{`${SELECT}\n${YOUR_SERVICES}`}</MyText>
                <FlatList
                    key='services'
                    keyExtractor={_keyExtractor}
                    data={servicesByProfession}
                    renderItem={_renderServies}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles['serviceList']}
                // numColumns={2}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                {loading ? null :
                    <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Touchable onPress={() => navigation.navigate('customServiceList')} style={styles['addCustomService']}>
                            <MyText style={[styles['addText'], { textAlign: 'center' }]}>{"Add Custom Service"}</MyText>

                        </Touchable>
                    </MyView>
                }

                <Button onPress={_validate} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70), backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(-10) }]} text={'COMPLETE LATER'} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProviderProfileSetupFive