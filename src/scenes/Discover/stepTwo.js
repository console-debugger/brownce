import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, MyText, MyView, SafeArea, SecondaryButton, TouchableIcon } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { getSearchServiceAction, loaderAction, updateMaintainanceAction } from '../../redux/action'
import { backIcon } from '../../components/icons'

// @ Discover two UI

const DiscoverTwo = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LET_US_FIND_A_HELP_FOR_YOU, ARE_YOU_LOOKING_FOR_HAIR_MAITENANCE, NEXT } = state['localeReducer']['locale']
    const { maintainance } = state['profileReducer']
    const { updatemaintainance } = state['hairReducer']
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getSearchServiceAction(2))
    }, [])

    const _selectServices = (item, index) => {
        const replica = [...maintainance[0]]
        replica[index]['status'] = !replica[index]['status']
        setRefresh(!refresh)
        dispatch(updateMaintainanceAction(replica))
    }

    const _keyExtractor = (item, index) => item + index

    // UI render of flatlist
    const _renderMaintenance = ({ item, index }) => {
        return (
            <SecondaryButton
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['ServiceName']}
                onPress={() => _selectServices(item, index)}
            />
        )
    }

    // @ Validate before navigation to next screen
    const _validate = () => {
        const filterMaintainanceId = updatemaintainance.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        if (filterMaintainanceId.length != 0) navigation.navigate('discoveryThree')
        else showToast("Please select maintainance")
    }

    return (
        <SafeArea >
            <MyView >
                <MyView style={{ flexDirection: "row", alignItems: "center", marginLeft: SCREEN_WIDTH * 0.03 }} >
                    <TouchableIcon
                        style={{ padding: dynamicSize(10), paddingLeft: 0, position: 'absolute' }}
                        source={backIcon}
                        onPress={() => navigation.goBack()} />

                    <MyText style={styles['boldTitle']}>{LET_US_FIND_A_HELP_FOR_YOU}</MyText>
                </MyView>
                <MyText style={[styles['themeTitle'], { marginVertical: SCREEN_HEIGHT * 0.05 }]}>{ARE_YOU_LOOKING_FOR_HAIR_MAITENANCE}</MyText>
                <FlatList
                    key='hairMentance'
                    scrollEnabled={false}
                    data={maintainance[0]}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderMaintenance}
                    contentContainerStyle={{ width: SCREEN_WIDTH, paddingTop: SCREEN_HEIGHT * 0.02 }}
                    numColumns={2}
                    extraData={refresh}
                    columnWrapperStyle={{ paddingHorizontal: dynamicSize(25), justifyContent: 'space-between' }}
                />
                <Button onPress={_validate} text={NEXT} style={{ width: SCREEN_WIDTH - dynamicSize(50), alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.04 }} />
            </MyView>
        </SafeArea>
    )
}

export default DiscoverTwo