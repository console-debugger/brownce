import { StyleSheet } from 'react-native'
import { LIGHT_WHITE, THEME,LIGHT_GREY } from '../../utils/colors'
import { SCREEN_HEIGHT, isAndroid, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserratBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: LIGHT_WHITE
    },
    image: {
        width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2
    },
    imageContainer: {
        width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        
        width: SCREEN_WIDTH - dynamicSize(70),
        marginVertical: SCREEN_HEIGHT * 0.03
    },
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
    },
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: dynamicSize(10),
        width: SCREEN_WIDTH - dynamicSize(70),
        //backgroundColor: WHITE,
        borderBottomWidth: 1,
     
        borderRadius: dynamicSize(5),
        marginBottom: dynamicSize(20)
    },
})

export default styles