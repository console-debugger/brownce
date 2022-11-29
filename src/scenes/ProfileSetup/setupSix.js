import React, { useEffect } from 'react'
import { SafeArea, MyText, MyView, TouchableIcon, Button } from '../../components/customComponent'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import commonStyle from '../../components/commonStyle'
import { SCREEN_HEIGHT, showToast } from '../../components/helper'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { dynamicSize } from '../../utils/responsive'
import { FlatList, ScrollView } from 'react-native'
import { addIcon, removeIcon } from '../../components/icons'
import { getProfileQuestionAction, loaderAction, saveQuestionAnswerAction, updateProfileQuestionAnswerListAction, getCsDataStepAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'

// Profile setup UI
const ProfileSetupSix = ({ navigation }) => {

    const dispatch = useDispatch()

    const state = useSelector(state => { return state })
    const { WRITE_YOUR, PROFILE_ANSWER, CHOOSE_TEXT, COMPLETE, AND_WRITE_YOUR_OWN_ANSWER, SELECT_A_PROMPT, PLEASE_ANSWER_THREE_QUESTIONS } = state['localeReducer']['locale']
    const { profileQuestionAnswer } = state['profileReducer']

    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getProfileQuestionAction())
        // dispatch(getCsDataStepAction(10))
    }, [])

    const _prompt = (item, index) => () => {
        if (item['ProfileQuestionMasterId']) {
            const appliedQuestion = {
                question: SELECT_A_PROMPT,
                ProfileQuestionMasterId: '',
                AnswerText: ''
            }
            const replica = [...profileQuestionAnswer]
            replica[index] = appliedQuestion
            dispatch(updateProfileQuestionAnswerListAction(replica))
        }
        else navigation.navigate('prompt', { ...item, index })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <MyView style={styles['cardStyle']}>
                <TouchableIcon onPress={_prompt(item, index)} source={item['ProfileQuestionMasterId'] ? removeIcon : addIcon} style={styles['addRemove']} />
                <MyText style={[styles['uploadText'], { marginVertical: 0 }]}>{item['question']}</MyText>
                <MyText style={styles['description']}>{item['AnswerText'] ? item['AnswerText'] : AND_WRITE_YOUR_OWN_ANSWER}</MyText>
            </MyView >
        )
    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _completeSetup = () => {
        const answerCount = profileQuestionAnswer.filter(item => { if (item['ProfileQuestionMasterId']) return item }).length
        if (answerCount === 3) {
            const result = profileQuestionAnswer.map(item => {
                const quesAns = {
                    [apiKey['PROFILE_QUESTION_MASTER_ID']]: item['ProfileQuestionMasterId'],
                    [apiKey['ANSWER_TEXT']]: item['AnswerText']
                }
                return quesAns
            })
            const param = {
                [apiKey['PROFILE_ANSWERS']]: result
            }
            dispatch(saveQuestionAnswerAction(param))
        }
        else showToast(PLEASE_ANSWER_THREE_QUESTIONS)
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{WRITE_YOUR}</MyText>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle']]}>{PROFILE_ANSWER}</MyText>
                <MyText style={[styles['uploadText'], { paddingHorizontal: dynamicSize(35) }]}>{CHOOSE_TEXT}</MyText>
                <FlatList
                    key='list'
                    keyExtractor={_keyExtractor}
                    data={profileQuestionAnswer}
                    renderItem={_renderItem}
                    contentContainerStyle={styles['flatList']}
                    ItemSeparatorComponent={_renderSeperator}
                />
                <Button onPress={_completeSetup} style={[styles['buttonStyle'], { marginVertical: SCREEN_HEIGHT * 0.03 }]} text={COMPLETE} />
            </ScrollView>
        </SafeArea>
    )
}

export default ProfileSetupSix