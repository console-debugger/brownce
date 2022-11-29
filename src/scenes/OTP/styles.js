import { StyleSheet } from 'react-native'
import { dynamicSize } from '../../utils/responsive'
import { THEME, LIGHT_GREY } from '../../utils/colors'
import { montserratBold } from '../../utils/fontFamily'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'

const styles = StyleSheet.create({
    commonContainer: {
        width: SCREEN_WIDTH,
        backgroundColor: THEME,
        alignItems: 'center'
    },
    imageStyle: {
        alignSelf: 'center',
    },
    mediumBoldText: {
        marginVertical: SCREEN_HEIGHT * 0.01,
        alignSelf: 'center',
        fontFamily: montserratBold,
        fontSize: SCREEN_HEIGHT * 0.025,
    },
    messageText: {
        alignSelf: 'center',
        color: LIGHT_GREY,
        fontSize: SCREEN_HEIGHT * 0.018
    },
    messageTextBold: {
        color: THEME,
        fontFamily: montserratBold,
        fontSize: SCREEN_HEIGHT * 0.02
    },
    otpView: {
        alignSelf: 'center',
        marginVertical: SCREEN_HEIGHT * 0.05,
        width: SCREEN_WIDTH - dynamicSize(100),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonStyle: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - dynamicSize(150)
    }
})

export default styles