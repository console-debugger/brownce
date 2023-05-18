import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CustomDropDown, MyText, MyView, SafeArea, SecondaryButton, TouchableIcon } from '../../components/customComponent'
import styles from './styles'
import { SCREEN_WIDTH, showToast } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import Swiper from 'react-native-swiper'
import { FlatList } from 'react-native'
import { THEME, LIGHT_WHITE, BLACK } from '../../utils/colors'
import { loaderAction, getSearchServiceAction, updateServicesAction, getProfessionsListAction } from '../../redux/action'
import { backIcon } from '../../components/icons'
import { montserratMedium } from '../../utils/fontFamily'

// @ Discover UI

const DiscoverOne = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { searchservices } = state['profileReducer']
    const { services } = state['hairReducer']
    const { LET_US_FIND_A_HELP_FOR_YOU, WHAT_SERVICE_ARE_YOU_LOOKING_FOR, NEXT, SELECT_SERVICES } = state['localeReducer']['locale']
    const { professionsList } = state['hairReducer']
    const [category, setCategory] = useState({
        id: '',
        name: ""
    })

    useEffect(() => {
        setCategory({ name: professionsList[0]?.Name, Id: professionsList[0]?.Id })
    }, [professionsList])


    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getSearchServiceAction(1))
        dispatch(getProfessionsListAction())
    }, [])

    const _keyExtractor = (item, index) => item + index

    // @ selection of services
    const _selectServices = (item, index, index1) => () => {
        const replica = [...searchservices]
        replica[index1][index]['status'] = !replica[index1][index]['status']
        dispatch(updateServicesAction(replica))
    }

    // @ crousel UI render
    const _renderCrousel = props => ({ item, index }) => {
        return (
            <SecondaryButton
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['ServiceName']}
                onPress={_selectServices(item, index, props)}
            />
        )
    }

    // @ validate before navigation to next screen
    const _validate = () => {
        let filterServiceId = []
        for (let i = 0; i < services.length; i++) {
            filterServiceId.push(services[i].filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] }))

        }
        if (filterServiceId.length != 0) navigation.navigate('discoveryThree')
        else showToast("Please select services")
    }

    const _changeCategory = (cat, index) => {
        setCategory({ name: professionsList[index]?.Name, Id: professionsList[index]?.Id })
    }

    return (
        <SafeArea >
            <MyView style={{ flex: 1, width: SCREEN_WIDTH, backgroundColor: LIGHT_WHITE }}>
                <MyView style={{ flexDirection: "row", alignItems: "center", marginLeft: SCREEN_WIDTH * 0.03 }} >
                    <TouchableIcon
                        style={{ padding: dynamicSize(10), paddingLeft: 0, position: 'absolute' }}
                        source={backIcon}
                        onPress={() => navigation.goBack()} />
                    <MyText style={styles['boldTitle']}>{LET_US_FIND_A_HELP_FOR_YOU}</MyText>
                </MyView>
                <MyText style={styles['themeTitle']}>{`"${WHAT_SERVICE_ARE_YOU_LOOKING_FOR}"`}</MyText>

                <MyText style={[styles['title'], { marginTop: 10, paddingHorizontal: dynamicSize(25), }]}>{SELECT_SERVICES.toUpperCase()}</MyText>
                <CustomDropDown
                    onChange={_changeCategory}
                    data={professionsList.map(item => { return { value: item['Name'], id: item['Id'] } })}
                    value={category?.name}
                    topOffset={dynamicSize(20)}
                    containerStyle={{ borderBottomColor: BLACK, borderBottomWidth: 2 }}
                    style={{
                        paddingHorizontal: dynamicSize(25),
                        width: SCREEN_WIDTH
                    }}
                />

                <MyView style={{ flex: 1 }}>
                    <Swiper
                        key={searchservices.length}
                        loop={false}
                        dotStyle={styles['dotStyle']}
                        activeDotColor={THEME}
                        paginationStyle={{ top: dynamicSize(275) }}
                        activeDotStyle={[styles['dotStyle'], { backgroundColor: THEME }]}
                    >
                        {searchservices.map((item, index1) => {
                            let arr = item.filter(item => item['ProfessionId'] == category['Id'])
                            if (arr.length) {
                                return (
                                    <MyView >
                                        <FlatList
                                            key={index1.toString()}
                                            scrollEnabled={false}
                                            data={item}
                                            keyExtractor={_keyExtractor}
                                            renderItem={_renderCrousel(index1)}
                                            contentContainerStyle={styles['crousel']}
                                            numColumns={2}
                                            columnWrapperStyle={{ paddingHorizontal: dynamicSize(25), justifyContent: 'space-between' }}
                                        />
                                    </MyView>
                                )
                            } else {
                                return <MyText style={{
                                    paddingHorizontal: dynamicSize(25),
                                    fontSize: getFontSize(14),
                                    color: BLACK,
                                    fontFamily: montserratMedium
                                }}>
                                    {'No services found for this profession'}
                                </MyText>
                            }
                        })}
                    </Swiper>
                </MyView>
            </MyView>
            <Button text={NEXT} onPress={_validate} style={styles['nextButton']} />
        </SafeArea>
    )
}

export default DiscoverOne