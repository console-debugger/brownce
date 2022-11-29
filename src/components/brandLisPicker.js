import React, { useState } from 'react'
import { FlatList } from 'react-native'
import commonStyle from './commonStyle'
import { dynamicSize } from '../utils/responsive'
import { WHITE, THEME, BLACK, LIGHT_GRAY } from '../utils/colors'
import { CustomModal, MyImage, MyText, MyView, Touchable } from './customComponent'
import { SCREEN_HEIGHT, showToast } from './helper'
import { downArrow } from './icons'
import { navigateToScreen } from '../navigation/rootNav'

const BrandListPicker = props => {

    const { placeholder, selectedItem, data, style, textStyle, value, message } = props

    const [isPickerShow, setPickerModal] = useState(false)
    const [detail, setSelectedDetail] = useState({})

    const _selectItem = item => () => {
        _closeCountryPicker()
        selectedItem(item)
        setSelectedDetail(item)
    }

    const _openCountryPicker = () => {
        if (data.length) setPickerModal(true)
        else showToast(message)
    }

    const _closeCountryPicker = () => setPickerModal(false)
  
    const _addBrand = () =>{
        setPickerModal(false)
       navigateToScreen('addbrand')
    }
    const _renderList = ({ item, index }) => {
        return (
            <Touchable style={commonStyle['countryView']} onPress={_selectItem(item)}>
                <MyText style={commonStyle['countryName']}>{item['Name']}</MyText>
                <MyImage source={{ uri: item['FlagImg'] }} style={{ width: dynamicSize(20), height: dynamicSize(20) }} />
            </Touchable>
        )
    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={{ borderTopWidth: 1, borderColor: THEME }} />)

    return (
        <>
            <Touchable onPress={_openCountryPicker} style={[commonStyle['datePickerView'], { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, style]}>
                <MyText style={[commonStyle['datePlaceholder'], { color: value ? BLACK : LIGHT_GRAY }, textStyle]}>{value ? value : placeholder}</MyText>
                <MyView style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <MyImage source={{ uri: detail?.['FlagImg'] }} style={{ width: dynamicSize(20), height: dynamicSize(20), marginRight: dynamicSize(20) }} />
                    <MyImage source={downArrow} />
                </MyView>
            </Touchable>
            <CustomModal isVisible={isPickerShow}>
                <MyView style={{ maxHeight: SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.1), minHeight: SCREEN_HEIGHT / 2, backgroundColor: WHITE, borderRadius: dynamicSize(5) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        key='myCountryList'
                        data={data}
                        renderItem={_renderList}
                        keyExtractor={_keyExtractor}
                        ItemSeparatorComponent={_renderSeperator}
                        contentContainerStyle={{ paddingVertical: dynamicSize(10) }}
                    />
                    <Touchable onPress={_addBrand} style={commonStyle['addBrandBtn']}>
                    <MyText style={commonStyle['addTxt']}>{'Add Brand'}</MyText>
                    </Touchable>
                </MyView>
            
            </CustomModal>
            
        </>
    )
}

export default BrandListPicker