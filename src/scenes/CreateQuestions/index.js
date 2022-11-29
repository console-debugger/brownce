import React, { useState } from 'react'
import { SafeArea, MyView, CurveView, MyText, MultilineTextInput, Button, KeyboardAwareScroll } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import { SCREEN_HEIGHT, showToast } from '../../components/helper'
import { apiKey } from '../../services/serviceConstant'
import { addQuestionAction } from '../../redux/action'
import { Keyboard } from 'react-native'
import { LIGHT_WHITE } from '../../utils/colors'

// Create Question UI
const CreateQuestion = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { WRITE_YOUR_QUESTION_AND_POST, WRITE_YOUR_QUESTION } = state['localeReducer']['locale']
    const [question, setQuestion] = useState('')

    // check validation before adding questions
    const _validate = () => {
        Keyboard.dismiss()
        question ? _addQuestion() : showToast("Please add question")
    }

    // Save questions via API
    const _addQuestion = () => {
        const param = {
            [apiKey['QuestionText']]: question
        }
        dispatch(addQuestionAction(param))
    }
    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['mainContainer']}>
                <CurveView />
                <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center', backgroundColor: LIGHT_WHITE }}>

                    <MyText style={styles['title']}>{WRITE_YOUR_QUESTION_AND_POST}</MyText>
                    <MultilineTextInput
                        onBlur={() => Keyboard.dismiss()}
                        style={{ marginVertical: SCREEN_HEIGHT * 0.04 }}
                        placeholder={WRITE_YOUR_QUESTION}
                        value={question}
                        onChangeText={(value) => setQuestion(value)}
                    />
                    <Button onPress={_validate} />
                </KeyboardAwareScroll>
            </MyView>
        </SafeArea>
    )
}

export default CreateQuestion