import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE, MID_GRAY, THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    shoptext: {
        fontSize: getFontSize(25),
        fontFamily: montserratBold,
    },
    button: {
        marginTop: '5%',
        borderRadius: dynamicSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(100),
        paddingVertical: SCREEN_HEIGHT * 0.05
    },
    customerButton: {
        backgroundColor: THEME
    },
    customerText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(14)
    },
    providerText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(14)
    },
    headerView: {
        height: SCREEN_HEIGHT * 0.12,
        backgroundColor: THEME,
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileImage: {
        height: SCREEN_HEIGHT * 0.085,
        width: SCREEN_HEIGHT * 0.085,
        borderRadius: (SCREEN_HEIGHT * 0.085) / 2
    },
    userDetails: {
        paddingLeft: dynamicSize(20),
        flex: 1,
        justifyContent: 'center',
        paddingRight: dynamicSize(10)
    },
    userName: {
        color: WHITE,
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(16)
    },
    starView: {
        paddingVertical: dynamicSize(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        marginTop: 2,
        fontFamily: montserratSemiBold,
        color: WHITE,
        fontSize: getFontSize(10),
        marginLeft: dynamicSize(5)
    },
    plusadd: {
        alignSelf: 'center',
        width: 50,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        height: 50
    },
    view: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.24,
        borderRadius: 10,
    },
    productImage: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.24,
        borderRadius: 10,
    },
    price: {
        color: THEME,
        fontFamily: montserratBold,
        marginTop: 10
    },
    desc: {
        fontSize: getFontSize(10),
        marginTop: 5
    },
    dotStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: SCREEN_WIDTH * 0.02,
        top: 6
    },
    image: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_HEIGHT * 0.1,
        alignItems: 'center',
        position: 'absolute',
        marginTop: 35,
        right: SCREEN_WIDTH * 0.03
    },
    backgroundContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH * 0.16,
        marginTop: SCREEN_HEIGHT * 0.17
    },
    text: {
        marginTop: 9,
        fontSize: getFontSize(10),
        fontFamily: montserratBold
    },
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
})

export default styles