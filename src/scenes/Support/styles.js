import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { THEME, WHITE } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    upperContainer: {
        paddingVertical: SCREEN_HEIGHT * 0.07,
        backgroundColor: THEME,
        alignItems: 'center',
        borderBottomLeftRadius: dynamicSize(25),
        borderBottomRightRadius: dynamicSize(25)
    },
    referText: {
        textAlign: 'center',
        marginVertical: SCREEN_HEIGHT * 0.04,
        fontFamily: montserratBold,
        fontSize: getFontSize(16)
    },
    referContainer: {
        paddingHorizontal: dynamicSize(20),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH - dynamicSize(50),
        alignSelf: 'center',
        borderRadius: dynamicSize(20),
        borderWidth: 1,
    },
    refCode: {
        flex: 1,
        alignSelf: 'center',
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(14)
    },
    copyContainer: {
        backgroundColor: THEME,
        borderRadius: dynamicSize(100),
        paddingHorizontal: dynamicSize(20),
        paddingVertical: dynamicSize(8),
    },
    copy: {
        color: WHITE,
        fontSize: getFontSize(15),
        fontFamily: montserratMedium
    },
    socialShare: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: SCREEN_WIDTH - dynamicSize(50)
    },
    iconStyle: {
        marginRight: dynamicSize(20)
    },
    twitterStyle: {
        height: SCREEN_HEIGHT * 0.04,
        width: SCREEN_WIDTH * 0.1
    },
    feedbackTitle: {
        alignSelf: 'flex-start',
        fontFamily: montserratSemiBold,
        fontSize: 14,
    },
    feedbackContainer: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
    },
    textInput: {
        width:'100%',
        textAlignVertical: 'top',
        // height: SCREEN_HEIGHT * 0.3,
        backgroundColor: WHITE,
        borderWidth: 0,
        marginVertical: SCREEN_HEIGHT * 0.01,
    },
    buttonStyle: {
        width: null,
        marginTop:10,
    }
})

export default styles