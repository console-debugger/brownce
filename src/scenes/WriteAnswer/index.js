import React, { useState, useRef } from 'react'
import { SafeArea, KeyboardAwareScroll, MyView, TouchableIcon, MyText, MultilineTextInput, Button } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { editIcon } from '../../components/icons'
import { useDispatch, useSelector } from 'react-redux'
import { dynamicSize } from '../../utils/responsive'
import { showToast } from '../../components/helper'
import { updateMyProfileQuestionAnswer, updateProfileQuestionAction, updateProfileQuestionAnswerListAction } from '../../redux/action'

// Write answers of question UI
const WriteAnswer = ({ navigation, route }) => {

    const detail = route?.['params'] || {}
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { DESCRIPTION, DONE, PLEASE_ENTER_DESCRIPTION } = state['localeReducer']['locale']
    const { profileQuestionAnswer, myQuestionAnswerList, profileQuestions } = state['profileReducer']
    const [answer, setAnswer] = useState(detail?.['AnswerText'] ? detail?.['AnswerText'] : '')
    const [isEditable, setEditable] = useState(false)

    const textAreaRef = useRef('textAreaRef')

    const _onChangeText = text => {
        setAnswer(text)
    }

    const _validate = () => {
        answer.trim().length ?
            _saveAnswer()
            : showToast(PLEASE_ENTER_DESCRIPTION)
    }

    const _saveAnswer = () => {
        if (route?.['name'] === 'editWriteAnswer') {
            const replica = [...myQuestionAnswerList]
            replica[detail['selectedIndex']]['QuestionText'] = detail['Question']
            replica[detail['selectedIndex']]['Question'] = detail['Question']
            replica[detail['selectedIndex']]['AnswerText'] = answer
            replica[detail['selectedIndex']]['ProfileQuestionMasterId'] = detail['ProfileQuestionMasterId']
            dispatch(updateMyProfileQuestionAnswer(replica))
            navigation.navigate('settings')
        }
        else {
            const appliedQuestion = {
                question: detail?.['Question'],
                ProfileQuestionMasterId: detail?.['ProfileQuestionMasterId'],
                AnswerText: answer
            }
            const replica = [...profileQuestionAnswer]
            replica[detail['selectedIndex']] = appliedQuestion
            const newQuestions = profileQuestions.map(item => { return { ...item, status: false } })
            dispatch(updateProfileQuestionAction(newQuestions))
            dispatch(updateProfileQuestionAnswerListAction(replica))
            navigation.navigate('profileSetupSix')
        }
    }

    const _enableEditable = () => {
        setEditable(true)
        textAreaRef.current.focus()
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyView style={styles['textInputWithImageContainer']}>
                    <MyText numberOfLines={1} style={styles['answer']}>{detail?.['Question']}</MyText>
                    <TouchableIcon onPress={_enableEditable} source={editIcon} style={styles['editIcon']} />
                </MyView>
                <MultilineTextInput
                    ref={textAreaRef}
                    onChangeText={_onChangeText}
                    value={answer}
                    placeholder={`${DESCRIPTION}...`}
                    style={{ marginVertical: dynamicSize(13) }}
                />
                <Button onPress={_validate} style={styles['buttonStyle']} text={DONE} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default WriteAnswer