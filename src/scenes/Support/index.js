import React, { useEffect, useState } from 'react'
import { MyView, SafeArea, MyImage, MyText, Touchable, TouchableIcon, MultilineTextInput, Button, KeyboardAwareScroll, Loader } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { supportIcon, darkEmail, twitterIcon } from '../../components/icons'
import { useSelector, useDispatch } from 'react-redux'
import { dynamicSize } from '../../utils/responsive'
import { SCREEN_HEIGHT, dismissKeyboard, showToast } from '../../components/helper'
import { getSupportAction, loaderAction, saveAppFeedbackAction } from '../../redux/action'

// Customer support UI
const Support = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { supportList } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const {
        SEND_FEEDBACK,
        WRITE_YOUR_COMMENT,
        PLEASE_ENTER_COMMENT_TO_SUBMIT_YOUR_FEEDBACK
    } = state['localeReducer']['locale'];

    const [comment, setComment] = useState('')

    useEffect(() => {
        dispatch(loaderAction(false))
        dispatch(getSupportAction())
    }, [])

    const saveFeedback = () => {
        if (comment.trim().length) {
            dismissKeyboard()
            dispatch(loaderAction(true))
            const param = {
                Comment: comment
            }
            dispatch(saveAppFeedbackAction(param))
        }
        else showToast(PLEASE_ENTER_COMMENT_TO_SUBMIT_YOUR_FEEDBACK)
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ paddingBottom: 20 }}>
                <Loader isVisible={loading}/>
                <MyView style={[styles['upperContainer'], { marginBottom: SCREEN_HEIGHT * 0.03 }]}>
                    <MyImage source={supportIcon} />
                </MyView>
                <MyView style={styles.feedbackContainer}>
                    <MyText style={styles.feedbackTitle}>{SEND_FEEDBACK}</MyText>
                    <MultilineTextInput
                        placeholder={WRITE_YOUR_COMMENT}
                        value={comment}
                        onChangeText={(value) => setComment(value)}
                        style={styles['textInput']}
                    />
                    <Button onPress={saveFeedback} style={styles['buttonStyle']} />
                </MyView>
                <MyView style={[styles['referContainer'], { marginTop: dynamicSize(15) }]}>
                    <MyImage source={darkEmail} style={styles['iconStyle']} />
                    <MyText style={styles['refCode']}>{supportList?.['SupportEmail'] ? supportList['SupportEmail'] : "LOADING"}</MyText>
                </MyView>
                <MyView style={[styles['referContainer'], { marginTop: dynamicSize(15) }]}>
                    <MyImage source={twitterIcon} style={styles['twitterStyle']} />
                    <MyText style={styles['refCode']}>{supportList?.['SupportContact'] ? supportList['SupportContact'] : "LOADING"}</MyText>
                </MyView>
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default Support