import { StyleSheet } from 'react-native'
import { BLACK, LIGHT_WHITE, MID_GRAY, THEME } from '../../utils/colors'
import { montserrat, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    signupDescription: {
        color: MID_GRAY,
        fontFamily: montserratSemiBold,
        textAlign: 'center'
    },
    logo: {
        marginTop: SCREEN_HEIGHT * 0.04
    },
    providerText: {
        marginTop: dynamicSize(5),
        color: BLACK,
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        marginBottom: SCREEN_HEIGHT * 0.02 - dynamicSize(5)
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.03
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