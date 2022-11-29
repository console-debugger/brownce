import React from 'react'
import { CustomModal, Touchable, MyView, MyText } from './customComponent'
import { useSelector } from 'react-redux'
import { BLACK, THEME } from '../utils/colors'
import { getFontSize, dynamicSize } from '../utils/responsive'
import { montserratBold } from '../utils/fontFamily'
import commonStyle from './commonStyle'
import { SCREEN_WIDTH } from './helper'
import { openCamera, multipleimagePicker } from './imagePicker'

const MultipleImagePickerSelection = props => {

    const state = useSelector(state => { return state })
    const { TAKE_PHOTO, CHOOSE_FROM_LIBRARY, CANCEL } = state['localeReducer']['locale']

    const { pickerModal, onCancelPress, selectedImage } = props

    const _openCamera = async () => {
        const imageUrl = await openCamera()
        if (imageUrl?.['uri']) selectedImage(imageUrl)
    }


    const _openPicker = async () => {
        const imageUrl = await multipleimagePicker()
        if (imageUrl?.[0]?.['uri']) selectedImage(imageUrl)
    }

    return (
        <CustomModal
            isVisible={pickerModal}
            style={{ justifyContent: 'flex-end' }}
        >
            <MyView style={{ padding: dynamicSize(10), alignItems: 'center' }}>
                <Touchable style={{ flex: 1, width: SCREEN_WIDTH }} onPress={onCancelPress} />
                <Touchable onPress={_openCamera} style={commonStyle['takePhotoView']}>
                    <MyText style={{ color: BLACK, fontSize: getFontSize(20) }} >{TAKE_PHOTO}</MyText>
                </Touchable>
                <Touchable onPress={_openPicker} style={commonStyle['chooseFromLibrary']}>
                    <MyText style={{ color: BLACK, fontSize: getFontSize(20) }} >{CHOOSE_FROM_LIBRARY}</MyText>
                </Touchable>
                <Touchable onPress={onCancelPress} style={commonStyle['cancelButton']}>
                    <MyText style={{ color: THEME, fontSize: getFontSize(20), fontFamily: montserratBold }} >{CANCEL}</MyText>
                </Touchable>
            </MyView>
        </CustomModal>
    )
}

export default MultipleImagePickerSelection