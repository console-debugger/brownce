import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, SecondaryButton, Touchable } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { navigateToScreen } from '../../navigation/rootNav'
import { getAllServicesAction, saveServiceAction, loaderAction, getSpDataStepAction, updateProfileSetupervicesAction, getProfessionsListAction, addProviderProfessionAction, getProfileAction, getProviderProfileAction, getServicesListAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { LIGHT_BROWN, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from '../ProfileSetup/styles'


// Provider profile setup
const SelectProfession = ({ }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SELECT, YOUR_SERVICES, CONTINUE } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const { professionsList } = state['hairReducer']
    const { providerprofile } = state.profileReducer
    const [selectedServices, setSelectedServices] = useState([])
    const [servicesLoader, setServicesLoader] = useState(false)
    const [Professional, setProfessional] = useState([])

    useEffect(() => {
        fetchSelectedServices()
        dispatch(getProfessionsListAction())
        dispatch(getProviderProfileAction())
    }, [])

    useEffect(() => {
        if (providerprofile?.UserId) {
            setServicesLoader(true)
            dispatch(getServicesListAction({
                UserId: providerprofile?.UserId
            }, response => {
                setServicesLoader(false)
                if (response) {
                    setProfessional(response?.Professional || [])
                }
            }))
        }
    }, [providerprofile?.UserId])

    useEffect(() => {
        fetchSelectedServices()
    }, [Professional])

    const _keyExtractor = (item, index) => item + index

    const selectService = (id) => {
        let temp = [...selectedServices]
        if (selectedServices.includes(id)) {
            temp.splice(temp.indexOf(id), 1)
        } else {
            temp.push(id)
        }
        setSelectedServices([...temp])
    }

    const fetchSelectedServices = () => {
        let temp = []
        Professional.forEach(element => temp.push(element.ProfessionId));
        setSelectedServices([...temp])
    }

    const _renderServies = ({ item, index }) => {
        return (
            <Touchable onPress={() => selectService(item['Id'])} style={[styles.professionContainer, { backgroundColor: selectedServices.includes(item['Id']) ? WHITE : THEME, }]}>
                <MyText style={[styles.professionText, { color: !selectedServices.includes(item['Id']) ? WHITE : THEME }]}>{item?.Name}</MyText>
            </Touchable>
        )
    }

    const _validate = () => {
        if (selectedServices.length) {
            dispatch(addProviderProfessionAction({ services: selectedServices, isSetupComplete: true }))
        } else {
            showToast("Please select your profession")
        }
    }

    const _complete_later = () => navigateToScreen('providerProfileSetupSix')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            {/* <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}> */}
            <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.04 }]}>{`YOUR PROFESSION`}</MyText>
            <FlatList
                key='services'
                keyExtractor={_keyExtractor}
                data={professionsList}
                renderItem={_renderServies}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles['serviceList']}
            />
            <MyView style={{ alignItems: 'center', }}>
                <Button onPress={_validate} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={CONTINUE} />
            </MyView>
            {/* </KeyboardAwareScroll> */}
        </SafeArea>
    )
}

export default SelectProfession