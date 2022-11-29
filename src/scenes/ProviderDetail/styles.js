import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { montserratSemiBold, montserratBold, montserratMedium } from '../../utils/fontFamily'
import { MID_LIGHT_GRAY, THEME, LIGHT_BROWN, LIGHT_WHITE, LIGHT_GRAY, WHITE, MID_GRAY, BACKGROUND, BLACK } from '../../utils/colors'

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: dynamicSize(25)
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
    description: {
        paddingHorizontal: dynamicSize(25),
        marginVertical: SCREEN_HEIGHT * 0.025,
        fontSize: getFontSize(12),
        lineHeight: 20
    },
    hairTypeFlatList: {
        paddingHorizontal: dynamicSize(25)
    },
    selected: {
        backgroundColor: THEME,
        borderColor: THEME,
    },
    unselected: {
        backgroundColor: LIGHT_WHITE,
        borderColor: LIGHT_GRAY,
    },
    selectedText: {
        color: WHITE,
    },
    unselectedText: {
        color: MID_GRAY
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: getFontSize(14),
        fontFamily: montserratSemiBold,
        paddingHorizontal: dynamicSize(25)
    },
    buttonStyle: {
        alignSelf: 'center',
        backgroundColor: LIGHT_BROWN,
        marginTop: 30
    },
    dotStyle: {
        backgroundColor: LIGHT_GRAY,
        width: dynamicSize(13),
        height: dynamicSize(13),
        borderRadius: dynamicSize(10),
        marginBottom: -60
    },
    wrapper: {
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: BLACK,
        fontSize: 30,
        fontWeight: 'bold'
    },
    portfolioFlatList: {
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(25)
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.02
    },
    portfolioImage: {
        marginRight: dynamicSize(20),
        width: SCREEN_WIDTH / 3 - dynamicSize(30),
        height: SCREEN_WIDTH / 3 - dynamicSize(30),
        borderRadius: dynamicSize(20),

    },
    productImage: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.24,
        borderRadius: 10,
    },
    price: {
        color: THEME,
        fontFamily: montserratBold,
        marginTop: 10,
        width: '50%'
    },
    desc: {
        fontSize: getFontSize(10),
        marginTop: 5
    },
    stock: {
        color: 'red',
        marginTop: 10,
    },
})

export default styles