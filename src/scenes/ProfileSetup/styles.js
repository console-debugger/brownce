import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid } from '../../components/helper'
import { GRAY, BLACK, LIGHT_BROWN, WHITE, LIGHT_GRAY, MID_GRAY, LIGHT_WHITE, THEME } from '../../utils/colors'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    imageView: {
        marginTop: SCREEN_HEIGHT * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_HEIGHT * 0.15,
        height: SCREEN_HEIGHT * 0.15,
        borderRadius: (SCREEN_HEIGHT * 0.15) / 2,
        backgroundColor: GRAY
    },
    image: {
        width: SCREEN_HEIGHT * 0.15,
        height: SCREEN_HEIGHT * 0.15,
        borderRadius: (SCREEN_HEIGHT * 0.15) / 2,
    },
    uploadText: {
        color: BLACK,
        fontFamily: montserratSemiBold,
        marginVertical: SCREEN_HEIGHT * 0.015
    },
    buttonStyle: {
        width: SCREEN_WIDTH - dynamicSize(70)
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    crossIcon: {
        position: 'absolute',
        zIndex: 10,
        right: dynamicSize(15),
    },
    selected: {
        backgroundColor: LIGHT_BROWN,
        borderColor: LIGHT_BROWN,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    unselected: {
        backgroundColor: LIGHT_WHITE,
        borderColor: LIGHT_GRAY,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    selectedText: {
        color: WHITE,
    },
    unselectedText: {
        color: MID_GRAY
    },
    genderParent: {
        width: SCREEN_WIDTH - dynamicSize(70),
        marginVertical: SCREEN_HEIGHT * 0.07
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatList: {
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(35)
    },
    hairType: {
        marginTop: SCREEN_HEIGHT * 0.05,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH - dynamicSize(70),
        marginBottom: SCREEN_HEIGHT * 0.05,
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.01
    },
    cardStyle: {
        borderWidth: 0.5,
        borderColor: MID_GRAY,
        borderRadius: dynamicSize(5),
        width: SCREEN_WIDTH - dynamicSize(70),
        paddingHorizontal: dynamicSize(15),
        paddingVertical: dynamicSize(20)
    },
    description: {
        color: MID_GRAY,
        marginTop: SCREEN_HEIGHT * 0.01
    },
    addRemove: {
        alignItems: "center",
        justifyContent: 'center',
        width: dynamicSize(30),
        height: dynamicSize(30),
        position: 'absolute',
        right: -10,
        top: -10
    },
    buttonStyleCont: {
        marginVertical: SCREEN_HEIGHT * 0.04
    },
    serviceList: {
        paddingVertical: SCREEN_HEIGHT * 0.02,
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(35),
        paddingVertical: SCREEN_HEIGHT * 0.04
    },
    subscriptionContainer: {
        marginHorizontal: dynamicSize(35),
        borderWidth: 1,
        borderRadius: dynamicSize(5),
        borderColor: LIGHT_GRAY,
        alignItems: 'center',
        width: SCREEN_WIDTH - dynamicSize(70),
        paddingVertical: dynamicSize(10),
        backgroundColor: LIGHT_WHITE
    },
    subscriptionPrice: {
        fontFamily: montserratBold,
        fontSize: getFontSize(20)
    },
    subscriptionPeriod: {
        marginTop: SCREEN_HEIGHT * 0.001,
        fontFamily: montserratMedium,
        fontSize: getFontSize(14)
    },
    subscriptionDescription: {
        marginTop: SCREEN_HEIGHT * 0.01,
        textAlign: 'center',
        fontSize: getFontSize(10),
        width: SCREEN_WIDTH * 0.55
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.04
    },
    seperatorStyle: {
        height: dynamicSize(20)
    },
    serviceName: {
        textAlign: 'center',
        fontSize: getFontSize(9),
        color: BLACK,
        borderWidth: 0,
        fontFamily: montserratSemiBold
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
    license: {
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: dynamicSize(35),
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.5,
        borderWidth: 1,
        borderColor: LIGHT_GRAY,
        borderRadius: 5
    },
    tickStyle: {
        top: -6,
        left: 0,
        right: 0,
        position: 'absolute',
        alignSelf: "flex-end",
        left: SCREEN_WIDTH * 0.77
    },
    headerView: {
        width: SCREEN_WIDTH,
        height: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIcon: {
        padding: dynamicSize(10),
        zIndex: 2,
        position: 'absolute',
        left: dynamicSize(20)
    },
    title: {
        textAlign: 'center',
        flex: 1,
        fontSize: getFontSize(16),
        fontFamily: montserratBold
    },
    addCustomService: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: THEME,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center"
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
    value: {
        position: 'absolute',
        fontSize: getFontSize(12),
        fontFamily: montserratMedium,
        top: dynamicSize(-5)
    },
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: dynamicSize(10),
        width: SCREEN_WIDTH - dynamicSize(70),
        borderBottomWidth: 1,
        borderRadius: dynamicSize(5),
        marginBottom: dynamicSize(20)
    },
    professionContainer: {
        height: dynamicSize(84),
        width: '100%',
        backgroundColor: THEME,
        borderRadius: dynamicSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: dynamicSize(15),
        borderWidth: 1,
        borderColor: THEME
    },
    professionText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(15)
    },
    searchBox: {
        paddingVertical: dynamicSize(10),
        width: SCREEN_WIDTH - dynamicSize(70),
        borderBottomColor: LIGHT_BROWN,
        borderBottomWidth: 1.5,
        marginVertical: dynamicSize(50)
    },
    searchLocaitonText: {
        color: LIGHT_GRAY
    }
})

export default styles