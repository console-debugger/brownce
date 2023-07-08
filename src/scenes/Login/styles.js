import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { MID_GRAY, BLACK, THEME, LIGHT_WHITE } from '../../utils/colors'
import { montserratSemiBold, montserratMedium, montserrat } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    logo: {
        marginVertical: SCREEN_HEIGHT * 0.06
    },
    providerText: {
        marginTop: dynamicSize(5),
        color: BLACK,
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        marginBottom: SCREEN_HEIGHT * 0.06 - dynamicSize(5)
    },
    rowContainer: {
        marginTop: SCREEN_HEIGHT * 0.01,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH - dynamicSize(70)
    },
    forgotText: {
        color: MID_GRAY,
        fontFamily: montserratSemiBold
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.05
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