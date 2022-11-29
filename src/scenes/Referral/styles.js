import { StyleSheet } from 'react-native'
import { THEME, WHITE } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'

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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH - dynamicSize(50),
        alignSelf: 'center',
        borderRadius: dynamicSize(20),
        borderWidth: 2,
    },
    refCode: {
        fontFamily: montserratBold,
        fontSize: getFontSize(26)
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
    }
})

export default styles