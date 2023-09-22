import { StyleSheet } from 'react-native'
import { getFontSize, dynamicSize } from '../../utils/responsive'
import { montserratBold, montserratSemiBold, montserratMedium } from '../../utils/fontFamily'
import { SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid } from '../../components/helper'
import { LIGHT_BROWN, LIGHT_WHITE, LIGHT_GRAY, WHITE, MID_GRAY, BLACK, THEME } from '../../utils/colors'

const styles = StyleSheet.create({
    title: {
        fontSize: getFontSize(22),
        fontFamily: montserratBold,
        paddingHorizontal: dynamicSize(35)
    },
    hairTypeFlatList: {
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(35)
    },
    selected: {
        backgroundColor: LIGHT_BROWN,
        borderColor: LIGHT_BROWN
    },
    unselected: {
        backgroundColor: LIGHT_WHITE,
        borderColor: LIGHT_GRAY
    },
    selectedText: {
        color: WHITE,
    },
    unselectedText: {
        color: MID_GRAY
    },
    questionsFlatList: {
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(35)
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.02
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: MID_GRAY,
        borderRadius: dynamicSize(5),
        justifyContent: 'space-between',
        paddingLeft: dynamicSize(15),
        paddingRight: dynamicSize(5),
        paddingVertical: SCREEN_HEIGHT * 0.015
    },
    cardStyle: {
        width: '85%'
    },
    uploadText: {
        color: BLACK,
        fontFamily: montserratSemiBold,
        marginVertical: SCREEN_HEIGHT * 0.015
    },
    description: {
        color: MID_GRAY,
        marginTop: SCREEN_HEIGHT * 0.01
    },
    portfolioView: {

        marginRight: dynamicSize(20),
        width: SCREEN_WIDTH / 3 - dynamicSize(30),
        height: SCREEN_WIDTH / 3 - dynamicSize(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: dynamicSize(20)
    },
    portfolioImage: {
        width: SCREEN_WIDTH / 3 - dynamicSize(30),
        height: SCREEN_WIDTH / 3 - dynamicSize(30),
        borderRadius: dynamicSize(20)
    },
    crossIcon: {
        zIndex: 10,
        position: 'absolute',
        right: -8,
        top: -2
    },
    portfolioFlatList: {
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(25)
    },
    servicesItem: {
        paddingVertical: dynamicSize(20),
        padding: dynamicSize(10),
        borderRadius: dynamicSize(5),
        borderWidth: 1,
        borderColor: LIGHT_GRAY,
        width: (SCREEN_WIDTH / 2) - dynamicSize(35),
        backgroundColor: LIGHT_WHITE,
        alignItems: 'center'
    },
    serviceName: {
        textAlign: 'center',
        fontSize: getFontSize(9),
        color: BLACK,
        borderWidth: 0,
        fontFamily: montserratSemiBold
    },
    seperatorStyle: {
        height: dynamicSize(20)
    },
    input: {
        paddingVertical: dynamicSize(3),
        paddingBottom: dynamicSize(2),
        fontSize: getFontSize(10),
        textAlign: 'center',
        marginVertical: SCREEN_HEIGHT * 0.01,
        width: '50%',
        fontFamily: montserratMedium,
        borderBottomWidth: 0.5,
        borderBottomColor: LIGHT_GRAY,
        marginBottom: 0
    },
    value: {
        position: 'absolute',
        fontSize: getFontSize(12),
        fontFamily: montserratMedium,
        top: dynamicSize(-5)
    },
    addCustomService: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: THEME,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center"
    },
    buttonStyleCont: {
        marginVertical: SCREEN_HEIGHT * 0.04
    },
    addText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(12)
    },
    addCircle: {
        width: SCREEN_WIDTH * 0.072,
        height: SCREEN_HEIGHT * 0.032,
        borderRadius: 100,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: 'center'
    },
    plusStyle: {
        width: 10,
        height: 10
    },
    serviceList: {
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(35),
        paddingVertical: SCREEN_HEIGHT * 0.04
    },
    image: {
        width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2
    },
    imageContainer: {
        width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
        borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
})

export default styles