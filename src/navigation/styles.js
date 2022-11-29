import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, isAndroid, SCREEN_WIDTH } from '../components/helper'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { WHITE, LIGHT_WHITE, THEME, LIGHT_BROWN, BLACK } from '../utils/colors'
import { montserratSemiBold, montserratMedium } from '../utils/fontFamily'

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: THEME,
        height: SCREEN_HEIGHT * 0.18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dynamicSize(20)
    },
    profileImage: {
        width: SCREEN_HEIGHT * 0.1,
        height: SCREEN_HEIGHT * 0.1,
        borderRadius: (SCREEN_HEIGHT * 0.1) / 2
    },
    name: {
        flex: 1,
        marginLeft: dynamicSize(15),
        color: WHITE,
        fontSize: getFontSize(16),
        fontFamily: montserratMedium
    },
    drawerLowerContent: {
        flex: 1,
        height: SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.18),
        paddingVertical: dynamicSize(20),
        backgroundColor: LIGHT_WHITE
    },
    bottomTabBar: {
        width: SCREEN_WIDTH / 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHT_BROWN,
        height: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.07,
    },
    activeIcon: {
        width: isAndroid ? dynamicSize(25) : dynamicSize(30),
    },
    inactiveIcon: {
        width: isAndroid ? dynamicSize(25) : dynamicSize(30),
    },
    topTabBar: {
        backgroundColor: THEME,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 3,
        paddingTop: SCREEN_HEIGHT * 0.02,
    },
    toptabbartwo:{
        backgroundColor: THEME,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 3,
        paddingTop: SCREEN_HEIGHT * 0.02,
    },
    topTabBarText: {
        color: WHITE,
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(14)
    },
    borderView: {
        backgroundColor:THEME,
        paddingBottom: SCREEN_HEIGHT * 0.02,
        borderBottomWidth: 3,
        borderBottomColor: LIGHT_BROWN
    }
})

export default styles