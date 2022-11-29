import { StyleSheet, Platform } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'


const styles = StyleSheet.create({
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    searchInput: {
        marginTop: SCREEN_HEIGHT * 0.03
    },
    bottomView: {
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: WHITE,
        borderTopLeftRadius: dynamicSize(30),
        borderTopRightRadius: dynamicSize(30),
        paddingVertical: SCREEN_HEIGHT * 0.04
    },
    helpText: {
        fontSize: getFontSize(14),
        fontFamily: montserratBold,
        marginVertical: SCREEN_HEIGHT * 0.025
    },
    buttonStyle: {
        width: null,
        paddingHorizontal: SCREEN_WIDTH * 0.15
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
    },
    locateIcon: {
        marginRight: dynamicSize(10),
        marginBottom: SCREEN_HEIGHT * 0.02,
        backgroundColor: WHITE,
        alignSelf: 'flex-end',
        borderRadius: dynamicSize(100),
        padding: dynamicSize(8)
    },
    boldTitle: {
        marginTop: SCREEN_HEIGHT * 0.02,
        textAlign: 'center',
        fontSize: getFontSize(20),
        fontFamily: montserratSemiBold,
        marginLeft: SCREEN_WIDTH * 0.25
    },
    themeTitle: {
        marginVertical: SCREEN_HEIGHT * 0.02,
        color: THEME,
        textAlign: 'center',
        fontSize: getFontSize(20),
        fontFamily: montserratBold
    },
    crousel: {
        width: SCREEN_WIDTH,
        paddingVertical: SCREEN_HEIGHT * 0.02
    },
    selected: {
        height: null,
        paddingVertical: dynamicSize(15),
        backgroundColor: LIGHT_BROWN,
        borderColor: LIGHT_BROWN,
    },
    unselected: {
        height: null,
        paddingVertical: dynamicSize(15),
        //backgroundColor: LIGHT_BROWN,
        borderColor: LIGHT_GRAY,
    },
    selectedText: {
        fontSize: getFontSize(10),
        color: WHITE,
        fontFamily: montserratMedium
    },
    unselectedText: {
        fontSize: getFontSize(10),
        color: BLACK,
        fontFamily: montserratMedium
    },
    dotStyle: {
        backgroundColor: LIGHT_GRAY,
        width: dynamicSize(13),
        height: dynamicSize(13),
        borderRadius: dynamicSize(10)
    },
    nextButton: {
        alignSelf: 'center',
        bottom: SCREEN_HEIGHT * 0.05
    },
    value: {
        position: 'absolute',
        fontSize: getFontSize(12),
        fontFamily: montserratMedium,
        top: dynamicSize(-5)
    },
    mapMarkerStyle: {
        width: "50%",
        height: "50%",
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: -3,
        zIndex: 1,
    },
    iconText: {
        color: WHITE,
        alignSelf: 'center',
        fontSize: getFontSize(12),
    },
    customView: {
        width: 140,
        borderRadius: 100
    },
    callout: {
        backgroundColor: "red"
    },
    bubble: {
        width: 140,
        height: 140,
        alignItems: "center",
    },
    view: {
        width: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : 90,
        height: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : 90,
        borderRadius: 150,
        alignSelf: "center",
        alignItems: "center",
        marginLeft: Platform.OS == "ios" ? 5 : 40,
        top: 10
    },
    image: {
        width: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : SCREEN_WIDTH * 0.15,
        height: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : SCREEN_WIDTH * 0.15,
        borderRadius: 200,
    },
    text: {
        justifyContent: "center",
        alignSelf: 'center',
        width: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : 90,
        height: Platform.OS == "ios" ? SCREEN_WIDTH * 0.25 : 90,
        borderRadius: 200,
    },
    backView: {
        marginTop: SCREEN_WIDTH * 0.1,
        position: "absolute",
        marginLeft: SCREEN_WIDTH * 0.04,
    },
    addCustomService: {
        width: SCREEN_WIDTH * 0.55,
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: THEME,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        bottom: 100
    },
    addText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(12)
    }
})

export default styles