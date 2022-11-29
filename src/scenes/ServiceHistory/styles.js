import { StyleSheet, Platform } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { MID_LIGHT_GRAY, LIGHT_BROWN, THEME, BLACK } from '../../utils/colors'
import { montserratMedium, montserratBold, montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    seperator: {
        height: SCREEN_HEIGHT * 0.02
    },
    flatList: {
        paddingVertical: dynamicSize(15),
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    itemContainer: {
        width: SCREEN_WIDTH - dynamicSize(30),
        padding: dynamicSize(8),
    },
    headerContent: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    bookingId: {
        fontFamily: montserratMedium,
        color: MID_LIGHT_GRAY
    },
    idvalue: {
        fontFamily: montserratBold,
        color: BLACK
    },
    itemMainContainer: {
        marginTop: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.002 : SCREEN_HEIGHT * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        marginTop: Platform.OS == "ios" ? SCREEN_WIDTH * 0.02 : SCREEN_WIDTH * 0.0,
        marginRight: dynamicSize(10),
        borderRadius: dynamicSize(5),
        width: SCREEN_HEIGHT * 0.090,
        height: SCREEN_HEIGHT * 0.093
    },
    name: {
        marginTop: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.01 : SCREEN_HEIGHT * 0.01,
        fontSize: getFontSize(15),
        fontFamily: montserratBold
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: Platform.OS == "ios" ? dynamicSize(8) : dynamicSize(0)
    },
    chatIcon: {
        width: dynamicSize(20),
        resizeMode: 'contain',
        height: dynamicSize(20),
        bottom: 5

    },
    buttonContainer: {
        marginLeft: dynamicSize(8),
        width: null,
        backgroundColor: LIGHT_BROWN,
        paddingHorizontal: dynamicSize(13),
        paddingVertical: dynamicSize(5),
        height: null
    },
    buttonText: {
        fontSize: getFontSize(12)
    },
    service: {
        fontFamily: montserratMedium,
        color: MID_LIGHT_GRAY,
        marginTop: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.01 : 0
    },
    star: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingCount: {
        alignSelf: "center",
        marginTop: SCREEN_HEIGHT * 0.001,
        marginLeft: dynamicSize(4),
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(12)
    },
    starView: {
        marginHorizontal: SCREEN_WIDTH * 0.42,
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 3
    },
    completed: {
        marginLeft: SCREEN_WIDTH * 0.35,
        color: THEME,
        fontSize: getFontSize(15),
        fontFamily: montserratBold,
        marginBottom: 10,
        marginTop: isAndroid ? 0 : 0
    }
})

export default styles