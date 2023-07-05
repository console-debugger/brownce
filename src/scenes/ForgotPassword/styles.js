import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { THEME, LIGHT_GRAY, LIGHT_WHITE } from '../../utils/colors'
import { montserrat, montserratBold, montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    parentContainer: {
        paddingHorizontal: dynamicSize(35),
        alignItems: 'center'
    },
    backIcon: {
        marginVertical: SCREEN_HEIGHT * 0.02
    },
    forgotIcon: {
        alignSelf: 'center'
    },
    forgotText: {
        marginVertical: dynamicSize(10),
        alignSelf: 'center',
        color: THEME,
        fontFamily: montserratBold,
        fontSize: getFontSize(16)
    },
    input: {
        marginTop: SCREEN_HEIGHT * 0.06
    },
    notReceived: {
        paddingVertical: dynamicSize(7),
        alignSelf: 'flex-end',
        color: LIGHT_GRAY,
        fontFamily: montserratSemiBold
    },
    sendAgain: {
        color: THEME,
        fontFamily: montserratSemiBold
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.1
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH / 1.5,
        marginBottom: SCREEN_HEIGHT * 0.03
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dynamicSize(15)
    },
    selectedBorder: {
        borderBottomColor: THEME,
        borderBottomWidth: 2
    },
    unSelectedBorder: {
        borderBottomColor: LIGHT_WHITE,
        borderBottomWidth: 2
    },
    tabText: {
        fontFamily: montserratSemiBold
    },
    selectedTabText: {
        fontFamily: montserratSemiBold
    },
    unSelectedTabText: {
        fontFamily: montserrat
    }
})

export default styles