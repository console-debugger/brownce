import { StyleSheet } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { montserratBold, montserratMedium } from '../../utils/fontFamily'
import { MID_LIGHT_GRAY, THEME, LIGHT_GRAY, LIGHT_BROWN, WHITE } from '../../utils/colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'

const styles = StyleSheet.create({
    flatList: {
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(25),
        paddingVertical: dynamicSize(10)
    },
    seperator: {
        height: dynamicSize(2),
        borderBottomColor: LIGHT_GRAY,
        borderBottomWidth: 0.4
    },
    header: {
        flexDirection: 'row',
        paddingVertical: SCREEN_HEIGHT * 0.02
    },
    imageStyle: {
        marginRight: dynamicSize(10),
        width: dynamicSize(60),
        height: dynamicSize(60),
        borderRadius: dynamicSize(5)
    },
    rowName: {
        flexDirection: 'row',
        alignItems: "center"
    },
    nameStyle: {
        fontSize: getFontSize(14),
        fontFamily: montserratBold
    },
    priceStyle: {
        fontFamily: montserratMedium,
        fontSize: getFontSize(14),
    },
    address: {
        marginLeft: dynamicSize(5),
        fontSize: getFontSize(10),
        color: MID_LIGHT_GRAY
    },
    available: {
        marginHorizontal: dynamicSize(10),
        color: THEME,
        fontSize: getFontSize(10)
    },
    starCount: {
        marginLeft: dynamicSize(5),
        color: MID_LIGHT_GRAY,
        fontSize: getFontSize(10)
    },
    buttonStyle: {
        marginLeft: dynamicSize(8),
        width: null,
        backgroundColor: LIGHT_BROWN,
        paddingHorizontal: dynamicSize(13),
        paddingVertical: dynamicSize(5),
        height: null
    },
    noprovider: {
        marginVertical: SCREEN_WIDTH * 0.6,
        fontSize: getFontSize(12),
        fontFamily: montserratBold
    },
    filterContainer: {
        backgroundColor: THEME,
        padding: dynamicSize(10),
        borderRadius: dynamicSize(50)
    },
    applyButtonStyle: {
        width: SCREEN_WIDTH - dynamicSize(70),
        alignSelf: 'center'
    },
    modal: {
        justifyContent: 'flex-start',
        backgroundColor: WHITE,
        alignItems: 'flex-start'
    },
    label: {
        fontFamily: montserratBold
    },
    value: {
        position: 'absolute',
        fontSize: getFontSize(12),
        fontFamily: montserratMedium,
        top: dynamicSize(-5)
    },
    priceItem: {
        flex: 1,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        marginVertical: SCREEN_HEIGHT * 0.02,
        borderWidth: 1,
        borderColor: THEME,
        height: dynamicSize(40),
        flexDirection: 'row'
    },
    mainScroll: {
        width: '100%',
        paddingHorizontal: dynamicSize(35)
    },
    decoration: {
        marginHorizontal: dynamicSize(35),
        fontFamily: montserratBold,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: THEME,
        color: THEME,
        textAlign: 'right'
    }
})

export default styles