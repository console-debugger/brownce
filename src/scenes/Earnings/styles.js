import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { BLACK, LIGHT_BROWN, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const CIRCLE_WIDTH = SCREEN_WIDTH / 2.4

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: LIGHT_WHITE
    },
    outerCircle: {
        borderWidth: 6,
        borderColor: LIGHT_BROWN,
        width: CIRCLE_WIDTH,
        height: CIRCLE_WIDTH,
        borderRadius: CIRCLE_WIDTH / 2,
        backgroundColor: LIGHT_WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCircle: {
        backgroundColor: LIGHT_BROWN,
        width: CIRCLE_WIDTH - dynamicSize(50),
        height: CIRCLE_WIDTH - dynamicSize(50),
        borderRadius: (CIRCLE_WIDTH - dynamicSize(50)) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    earningText: {
        fontFamily: montserratBold,
        fontSize: getFontSize(25)
    },
    totalEarnings: {
        marginTop: SCREEN_HEIGHT * 0.02,
        fontFamily: montserratMedium
    },
    amount: {
        fontFamily: montserratBold,
        fontSize: getFontSize(35),
        marginBottom: SCREEN_HEIGHT * 0.02
    },
    headerView: {
        flexDirection: 'row',
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        paddingVertical: SCREEN_HEIGHT * 0.02,
        backgroundColor: THEME
    },
    item: {
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        paddingVertical: SCREEN_HEIGHT * 0.02,
        backgroundColor: LIGHT_WHITE
    },
    headerText: {
        textAlign: 'center',
        flex: 1,
        color: WHITE
    },
    bodyText: {
        textAlign: 'center',
        flex: 1,
        color: BLACK
    }
})

export default styles   