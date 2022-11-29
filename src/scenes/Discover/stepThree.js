import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, MyText, MyView, SafeArea, SecondaryButton, TouchableIcon } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { loaderAction, getPriceRangeAction, updatePriceRangeAction } from '../../redux/action'
import { backIcon } from '../../components/icons'
import { LIGHT_WHITE } from '../../utils/colors'

// @ Discovery UI
const DiscoverThree = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LET_US_FIND_A_HELP_FOR_YOU, NEXT, THIS_IS_MY_PRICE_RANGE } = state['localeReducer']['locale']
    const { pricerange } = state['profileReducer']
    const { updatepricerange } = state['hairReducer']
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getPriceRangeAction())
    }, [])

    // @ Select6ion of services
    const _selectServices = (item, index) => {
        const replica = [...pricerange]
        for (let i = 0; i < pricerange.length; i++) {
            if (item['PriceRangeMasterId'] === replica[i]['PriceRangeMasterId']) {
                replica[i]['status'] = true
            }
            else {
                replica[i]['status'] = false
            }
        }
        setRefresh(!refresh)
        dispatch(updatePriceRangeAction(replica))
    }

    const _keyExtractor = (item, index) => item + index

    // Price Range UI render
    const _renderMaintenance = ({ item, index }) => {
        return (
            <SecondaryButton
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={`$ ${item['MinPrice']} - $ ${item['MaxPrice']}`}
                onPress={() => _selectServices(item, index)}
            />
        )
    }

    // @ validate data before navigating to next
    const _validate = () => {
        const filterpricerangeId = updatepricerange.filter(item => { if (item['status']) return item }).map(each => { return each['PriceRangeMasterId'] })
        if (filterpricerangeId.length != 0) navigation.navigate('discoveryFour')
        else showToast("Please select price range")
    }

    return (
        <SafeArea >
            <MyView style={{ backgroundColor: LIGHT_WHITE }}>
                <MyView style={{ flexDirection: "row", alignItems: "center", marginLeft: SCREEN_WIDTH * 0.03 }} >
                    <TouchableIcon
                        style={{ padding: dynamicSize(10), paddingLeft: 0, position: 'absolute' }}
                        source={backIcon}
                        onPress={() => navigation.goBack()} />

                    <MyText style={styles['boldTitle']}>{LET_US_FIND_A_HELP_FOR_YOU}</MyText>
                </MyView>
                <MyText style={[styles['themeTitle'], { marginVertical: SCREEN_HEIGHT * 0.05 }]}>{THIS_IS_MY_PRICE_RANGE}</MyText>
                <FlatList
                    key='priceRange'
                    scrollEnabled={false}
                    data={pricerange}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderMaintenance}
                    contentContainerStyle={{ width: SCREEN_WIDTH, paddingTop: SCREEN_HEIGHT * 0.02 }}
                    numColumns={2}
                    columnWrapperStyle={{ paddingHorizontal: dynamicSize(25), justifyContent: 'space-between' }}
                />
                <Button onPress={_validate} text={NEXT} style={{ width: SCREEN_WIDTH - dynamicSize(50), alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.04 }} />
            </MyView>
        </SafeArea>
    )

}

export default DiscoverThree