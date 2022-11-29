import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { BLACK, MID_LIGHT_GRAY, THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    flatList: {
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(15),
        zIndex: 10
    },
    notiList: {
        width: SCREEN_WIDTH,
    },
    seperator: {
        borderBottomWidth: 0.5,
        borderBottomColor: MID_LIGHT_GRAY
    },
    noquestion: {
        marginVertical: SCREEN_WIDTH * 0.6,
        fontSize: getFontSize(12),
        fontFamily: montserratBold
    },
    tabContaiber: {
        marginHorizontal: dynamicSize(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: dynamicSize(4),
        borderRadius: dynamicSize(50),
        overflow: 'hidden',
        backgroundColor: WHITE
    },
    upperTab: {
        padding: dynamicSize(15),
        flex: 0.49,
        borderRadius: dynamicSize(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTabContainer: {
        backgroundColor: THEME
    },
    unSelectedtacContainer: {
        backgroundColor: WHITE
    },
    selectedTabText: {
        color: WHITE
    },
    unselectedTabText: {
        color: BLACK
    },
    notiItem: {
        flexDirection: 'row',
        paddingVertical: dynamicSize(10),
        paddingHorizontal: dynamicSize(15)
    },
    notiImage: {
        width: SCREEN_HEIGHT * 0.065,
        height: SCREEN_HEIGHT * 0.065,
        borderRadius: dynamicSize(100),
        backgroundColor: 'lightgrey'
    },
    notiContainer:{
        width: SCREEN_HEIGHT * 0.065,
        height: SCREEN_HEIGHT * 0.065,
        borderRadius: dynamicSize(100),
    },
    bold: {
        fontFamily: montserratMedium
    },
    notiFontSize: {
        fontSize: getFontSize(14)
    },
    decoration: {
        textDecorationLine: 'underline'
    },
    viewMore: {
        textAlign: 'center',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        paddingVertical: dynamicSize(15),
        width: SCREEN_WIDTH / 4.5,
        fontFamily: montserratBold,
        color: THEME
    }
})

export default styles