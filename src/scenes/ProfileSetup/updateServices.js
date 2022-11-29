import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, SecondaryButton } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { getAllServicesAction, updateSavedServicesAction, updateServicesAction } from '../../redux/action'
import { BLACK, LIGHT_WHITE, THEME } from '../../utils/colors'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'

// Update provider services UI
const UpdateProviderService = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SELECT, YOUR_SERVICES, CONTINUE } = state['localeReducer']['locale']
    const { services } = state['hairReducer']
    const { allservices, allcustomservices, servicesByProfession, savedServices } = state['hairReducer']
    const [selectedSubServices, setSelectedSubServices] = useState([])

    // useFocusEffect(
    //     useCallback(() => {
    //         dispatch(getAllServicesAction())
    //     }, [])
    // )

    useEffect(() => {
        let temp = []
        savedServices.forEach(element => {
            temp.push(element['ServiceMasterId'])
        });
        setSelectedSubServices([...selectedSubServices, ...temp])
    }, [savedServices])

    const _keyExtractor = (item, index) => item + index

    // const _selectServices = (item, index) => () => {
    //     const replica = [...services]
    //     replica[index]['status'] = !replica[index]['status']
    //     dispatch(updateServicesAction(replica))
    // }

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
        let selectedservicesArr = []
        let savedArr = savedServices.map(item => item['ServiceMasterId'])
        servicesByProfession.forEach(profession => {
            profession['Services'].forEach(element => {
                if (selectedSubServices.includes(element['ServiceMasterId'])) {
                    if (savedArr.includes(element['ServiceMasterId'])) {
                        let price = savedServices.filter(savedItem => savedItem['ServiceMasterId'] == element['ServiceMasterId'])[0]['Price']
                        selectedservicesArr.push({ ...element, Price: price })
                    } else {
                        selectedservicesArr.push({ ...element, Price: '' })
                    }
                }
            });
        });
        // const newResult = services.filter(item => { if (item['status'] === true) return { ...item, Price: '' } })
        // dispatch(updateSavedServicesAction(newResult))

        dispatch(updateSavedServicesAction(selectedservicesArr))
        navigation.goBack()
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{`${SELECT}\n${YOUR_SERVICES}`}</MyText>
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
                <Button onPress={_validate} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={CONTINUE} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default UpdateProviderService