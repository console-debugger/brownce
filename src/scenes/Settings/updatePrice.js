import React, { useEffect, useState } from 'react'
import { FlatList, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, Touchable } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { getSavedServicesAction, updateSavedServicesAction, saveEditServicesPriceAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { LIGHT_WHITE } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'

// Update service prices UI
const UpdatePrice = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { ENTER_PRICE, COMPLETE, TYPE_IN_YOUR_SERVICES_ALONG_WITH_THE_ASSOCIATED_PRICE, PLEASE_ENTER_PRICE_OF_EACH_SERVICES } = state['localeReducer']['locale']
    const { savedServices } = state['hairReducer']

    useEffect(() => {
        dispatch(getSavedServicesAction())
    }, [])

    const _seperator = () => (<MyView style={styles['seperatorStyle']} />)

    const _keyExtractor = (item, index) => item + index

    const _onChnageText = index => text => {
        const replica = [...savedServices]
        replica[index]['Price'] = text
        replica[index]['status'] = text.trim().length ? true : false
        dispatch(updateSavedServicesAction(replica))
    }

    const _renderServices = ({ item, index }) => {
        return (
            <Touchable style={styles['servicesItem']} >
                <MyText style={styles['serviceName']}>{item['ServiceName']}</MyText>
                <TextInput
                    value={item['Price'] ? item['Price'].toString() : null}
                    style={styles['input']}
                    keyboardType='number-pad'
                    placeholder={ENTER_PRICE}
                    onChangeText={_onChnageText(index)}
                />
            </Touchable>
        )
    }

    const _validate = () => {
        const filteredResult = savedServices.filter(item => {
            const price = item['Price']
            if (typeof (price) == 'object') return item
            else if (typeof (price) == 'string') {
                if (price.trim().length == 0) return item
            }
        })
        if (filteredResult.length == 0) {
            const newParam = savedServices.map(item => {
                const result = {
                    [apiKey['SERVICE_MASTER_ID']]: item['ServiceMasterId'],
                    [apiKey['PRICE']]: item['Price']
                }
                return result
            })
            const param = {
                [apiKey['SP_SERVICE_MAPS']]: newParam
            }
            dispatch(saveEditServicesPriceAction(param))
        }
        else showToast(PLEASE_ENTER_PRICE_OF_EACH_SERVICES)
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.02, fontSize: getFontSize(23) }]}>{TYPE_IN_YOUR_SERVICES_ALONG_WITH_THE_ASSOCIATED_PRICE}</MyText>
                <FlatList
                    key='selectServices'
                    data={savedServices}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderServices}
                    ItemSeparatorComponent={_seperator}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ marginVertical: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH, paddingHorizontal: dynamicSize(25) }}
                />
                <Button onPress={_validate} text={COMPLETE} style={{ width: SCREEN_WIDTH - dynamicSize(50), alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.01 }} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default UpdatePrice