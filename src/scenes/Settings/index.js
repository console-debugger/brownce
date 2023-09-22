import React, { useEffect, useState } from 'react'
import { SafeArea, MyView, MyText, CurveView, SecondaryButton, EmptyMessage, Loader, Button, TouchableIcon, CustomSlider, MyImage, Touchable } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { FlatList, ScrollView } from 'react-native'
import { dynamicSize } from '../../utils/responsive'
import { getHairTypeAction, getProfileAction, getProfileQuestionAction, loaderAction, saveHairTypeAction, saveProfileAction, saveQuestionAnswerAction, updateHairTypeAction, updateTenderHeadLevelAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { cameraIcon, editIcon, imagePlaceholder } from '../../components/icons'
import { TRANSPARENT_LIGHT_BLACK } from '../../utils/colors'
import ImagePickerSelection from '../../components/imagePickerSelection'

let timeout = null

// Setting UI
const Settings = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CHANGE_HAIR_TYPE, LOADING, CHANGE_PROFILE_QUESTION, UPDATE, IT_SEEMS_THAT_THERE_ARE_NO_HAIRTYPES_FOUND } = state['localeReducer']['locale']
    const { profile, myQuestionAnswerList } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const { hariTypes } = state['hairReducer']

    const [indicator, setIndicator] = useState(true)
    const [value, setValue] = useState(profile['TenderHeadLevel'] != null ? profile['TenderHeadLevel'] : 0)
    const left = value * (SCREEN_WIDTH - 60) / 10 - 15;
    const [sliderValue, setSliderValue] = useState(profile['TenderHeadLevel'] != null ? profile['TenderHeadLevel'] : 0)
    const [profilePic, setProfilePic] = useState(profile?.['ProfilePic'])
    const [imageData, setImageData] = useState({})
    const [uri, seturi] = useState(profile?.['ProfilePic'])
    const [isShow, setShow] = useState(false)

    useEffect(() => {

        timeout = setTimeout(() => {
            setIndicator(false)
        }, 2000);

        dispatch(getProfileQuestionAction())
        if (profile?.['HairType']) {
            // dispatch(loaderAction(true))
            dispatch(getHairTypeAction(profile?.['HairType']))
            dispatch(getProfileAction())
        }
        return () => {
            const replica = [...hariTypes]
            const newResult = replica.map(item => { return { ...item, status: false } })
            dispatch(updateHairTypeAction(newResult))
        }
    }, [profile?.['HairType']])

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _selectHairType = (item, index) => () => {
        const replica = [...hariTypes]
        for (let i = 0; i < hariTypes.length; i++) {
            if (item['HairTypeMasterId'] === replica[i]['HairTypeMasterId']) {
                replica[i]['status'] = true
            }
            else {
                replica[i]['status'] = false
            }
        }
        dispatch(updateHairTypeAction([...replica]))
    }

    const _renderEmptyHairType = () => {
        if (!loading) {
            if (indicator) return (<EmptyMessage message={LOADING} />)
            return (<EmptyMessage message={IT_SEEMS_THAT_THERE_ARE_NO_HAIRTYPES_FOUND} />)
        }
        else return (<EmptyMessage message={LOADING} />)
    }

    const _renderHairType = ({ item, index }) => {
        return (
            <SecondaryButton
                onPress={_selectHairType(item, index)}
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['HairTypeName']}
            />
        )
    }

    const _selectPrompt = (item, index) => () => {
        navigation.navigate('editPrompt', { ...item, index })
    }

    const _renderQuestions = ({ item, index }) => {
        return (
            <MyView style={styles['mainRow']}>
                <MyView style={styles['cardStyle']}>
                    <MyText style={[styles['uploadText'], { marginVertical: 0 }]}>{item['QuestionText']}</MyText>
                    <MyText style={styles['description']}>{item['AnswerText']}</MyText>
                </MyView >
                <MyView style={{ borderLeftWidth: 1, height: dynamicSize(30) }} />
                <TouchableIcon source={editIcon} onPress={_selectPrompt(item, index)} style={{ padding: dynamicSize(10) }} />
            </MyView>
        )
    }

    const _saveHairType = () => {
        const selected = hariTypes.filter(item => { if (item['status']) return item }).map(each => { return each['HairTypeMasterId'] })
        const isUpdate = true
        console.log('selected==>', selected)
        const param = {
            [apiKey['HAIR_TYPE_ID']]: selected,
            [apiKey['IS_UPDATE']]: isUpdate
        }
        dispatch(saveHairTypeAction(param))
    }

    const _saveQuestions = () => {
        const selected = hariTypes.filter(item => { if (item['status']) return item }).map(each => { return each['HairTypeMasterId'] })
        const isUpdate = true
        const hairparam = {
            [apiKey['HAIR_TYPE_ID']]: selected,
            [apiKey['IS_UPDATE']]: isUpdate,
            [apiKey['TENDER_HEAD_LEVEL']]: value
        }
        dispatch(saveHairTypeAction(hairparam))
        const result = myQuestionAnswerList.map(item => {
            const quesAns = {
                [apiKey['PROFILE_QUESTION_MASTER_ID']]: item['ProfileQuestionMasterId'],
                [apiKey['ANSWER_TEXT']]: item['AnswerText'],
            }
            return quesAns
        })
        const param = {
            [apiKey['PROFILE_ANSWERS']]: result,
            [apiKey['IS_UPDATE']]: true
        }
        dispatch(saveQuestionAnswerAction(param))
        const tenderparam = {
            [apiKey['TENDER_HEAD_LEVEL']]: value
        }
        dispatch(updateTenderHeadLevelAction(tenderparam))
    }

    const _onSliderChange = value => {
        setValue(value)
    }

    const _onSlidingComplete = value => {
        setValue(value)
    }

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _getImage = data => {
        if (data?.['uri']) {
            seturi(data?.['uri'])
            setImageData(data)
            setProfilePic(data?.['uri'])
            setShow(false)
        }
    }

    const _saveProfile = () => {
        const formData = new FormData()
        imageData?.['uri'] && formData.append(apiKey['PROFILE_PIC'], imageData)
        formData.append(apiKey['user_name'], profile?.Username)
        formData.append(apiKey['FIRSTNAME'], profile?.Name)
        formData.append(apiKey['GENDER'], profile?.GenderId)
        formData.append(apiKey['CITY_NAME'], profile?.City)
        formData.append(apiKey['STATE_NAME'], profile?.State)
        formData.append(apiKey['LATITUDE'], profile?.Latitude)
        formData.append(apiKey['LONGITUDE'], profile?.Longitude)
        if (profile?.Username && imageData?.uri && profile?.Name) dispatch(saveProfileAction(formData, () => {
            navigation.goBack()
        }))
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            <ScrollView>
                <MyView style={{ flex: 1 }}>
                    <CurveView />
                    <Loader isVisible={loading} />
                    <ImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
                    <MyView style={styles['imageContainer']}>
                        <MyImage source={uri ? { uri: uri ? uri : profile['ProfilePic'] } : imagePlaceholder} style={styles['image']} />
                        <Touchable onPress={_openPicker} style={[styles['imageContainer'], { position: 'absolute', backgroundColor: TRANSPARENT_LIGHT_BLACK }]} >
                            <MyImage source={cameraIcon} />
                        </Touchable>
                    </MyView>
                    {!!imageData?.['uri'] && <Button style={{ alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.02 }} text={UPDATE} onPress={_saveProfile} />}
                    <MyText style={[styles['title'], { marginTop: 15 }]}>{CHANGE_HAIR_TYPE}</MyText>
                    <MyView>
                        <FlatList
                            key='hairType'
                            scrollEnabled={false}
                            data={hariTypes}
                            ListEmptyComponent={_renderEmptyHairType}
                            keyExtractor={_keyExtractor}
                            renderItem={_renderHairType}
                            contentContainerStyle={styles['hairTypeFlatList']}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                    </MyView>
                    <MyText style={styles['title']}>{'CHANGE TENDERHEAD LEVEL'}</MyText>
                    <MyView style={{ flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.04, alignSelf: 'center' }}>
                        <MyText style={[styles['value'], { left: 0 }]}>{0}</MyText>
                        <MyText style={[styles['value'], { textAlign: "center", left: left }]}>{value ? Math.floor(value) + '' : ''}</MyText>
                        <CustomSlider
                            onSlidingComplete={_onSlidingComplete}
                            value={sliderValue}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            onValueChange={_onSliderChange}
                        />
                        <MyText style={[styles['value'], { right: 0 }]}>{ }</MyText>
                    </MyView>

                    {/* <Button style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} onPress={_saveHairType} /> */}
                    <MyText style={[styles['title'], { marginTop: 20 }]}>{CHANGE_PROFILE_QUESTION}</MyText>
                    <MyView>
                        <FlatList
                            key='question'
                            showsVerticalScrollIndicator={false}
                            keyExtractor={_keyExtractor}
                            data={myQuestionAnswerList}
                            renderItem={_renderQuestions}
                            contentContainerStyle={styles['questionsFlatList']}
                            ItemSeparatorComponent={_renderSeperator}
                        />
                    </MyView>
                    <Button style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} onPress={_saveQuestions} />
                </MyView>
            </ScrollView>
        </SafeArea>
    )
}

export default Settings