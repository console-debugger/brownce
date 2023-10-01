import { StyleSheet, Dimensions } from 'react-native'
import { WHITE, THEME, BLACK, LIGHT_GRAY, LIGHT_WHITE, MID_GRAY, LIGHT_BROWN, PLACEHOLDER_COLOR } from '../utils/colors'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { montserratBold, montserratSemiBold, montserrat, montserratMedium } from '../utils/fontFamily'
import { SCREEN_WIDTH, SCREEN_HEIGHT, isAndroid, isIOS } from './helper'

const { width } = Dimensions.get('window')

const commonStyle = StyleSheet.create({
    commonContainer: {
        flex: 1,
        backgroundColor: LIGHT_WHITE
    },
    image: {
        width: SCREEN_WIDTH - dynamicSize(70),
        height: SCREEN_HEIGHT * 0.5,
    },
    commonButtonContainer: {
        width: SCREEN_WIDTH / 1.5,
        paddingHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(25),
        height: isAndroid ? dynamicSize(43) : dynamicSize(48),
        backgroundColor: THEME,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonText: {
        fontSize: getFontSize(13),
        color: WHITE,
        fontFamily: montserratBold,
        textAlign: 'center'
    },
    textFieldContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: BLACK,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: SCREEN_WIDTH - dynamicSize(70),
    },
    textFieldImageContainer: {
        height: SCREEN_HEIGHT * 0.04,
        justifyContent: 'center',
        backgroundColor: LIGHT_WHITE,
        alignItems: 'flex-start',
        marginRight: dynamicSize(5)
    },
    emailtextField: {
        marginBottom: dynamicSize(7),
        backgroundColor: LIGHT_WHITE,
        alignItems: 'flex-end',
    },
    inputLayout: {
        borderBottomWidth: 0,
        flex: 1,
        backgroundColor: LIGHT_WHITE
    },
    textInput: {
        color: BLACK,
        fontFamily: montserratSemiBold,
        paddingRight: dynamicSize(10),
        width: SCREEN_WIDTH - dynamicSize(70),
        fontSize: getFontSize(14),
        height: SCREEN_HEIGHT * 0.04,
    },
    note: {
        marginTop: dynamicSize(7),
        width: SCREEN_WIDTH - dynamicSize(70),
        fontFamily: montserratBold,
        color: THEME,
        fontSize: getFontSize(12)
    },
    noteText: {
        fontFamily: montserrat,
        fontSize: getFontSize(12),
        color: BLACK
    },
    errorMessage: {
        paddingVertical: dynamicSize(2),
        fontFamily: montserratMedium,
        color: THEME,
        fontSize: getFontSize(12),
    },
    selectionView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectionText: {
        fontFamily: montserratSemiBold,
        color: MID_GRAY,
        marginLeft: dynamicSize(5)
    },
    dontHaveAccount: {
        color: MID_GRAY,
        fontFamily: montserratSemiBold,
        textAlign: 'center',
        marginBottom: dynamicSize(10)
    },
    signUpText: {
        color: BLACK,
        fontFamily: montserratBold
    },
    extraBoldText: {
        fontSize: getFontSize(25),
        fontFamily: montserratBold
    },
    profileTitle: {
        alignSelf: 'flex-start',
        paddingHorizontal: dynamicSize(35)
    },
    takePhotoView: {
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
        backgroundColor: WHITE,
        borderTopLeftRadius: dynamicSize(5),
        borderTopRightRadius: dynamicSize(5)
    },
    chooseFromLibrary: {
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
        backgroundColor: WHITE,
        borderBottomLeftRadius: dynamicSize(5),
        borderBottomRightRadius: dynamicSize(5)
    },
    cancelButton: {
        marginVertical: dynamicSize(10),
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
        backgroundColor: WHITE,
        borderRadius: dynamicSize(5)
    },
    datePickerView: {
        marginVertical: SCREEN_HEIGHT * 0.04,
        backgroundColor: LIGHT_WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        borderBottomColor: LIGHT_GRAY,
        borderBottomWidth: 1.5,
        paddingVertical: SCREEN_HEIGHT * 0.015
    },
    datePlaceholder: {
        color: LIGHT_GRAY,
        fontSize: getFontSize(14),
        fontFamily: montserratSemiBold
    },
    secondaryButton: {
        borderRadius: dynamicSize(50),
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        height: width * 0.12,
        borderColor: LIGHT_GRAY,
        borderWidth: 1,
        marginBottom: SCREEN_HEIGHT * 0.02
    },
    secondaryText: {
        textAlign: 'center',
        color: MID_GRAY
    },
    cardStyle: {
        backgroundColor: WHITE,
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: dynamicSize(5),
        width: SCREEN_WIDTH - dynamicSize(70),
        borderRadius: dynamicSize(10),
        shadowColor: LIGHT_GRAY
    },
    multiTextInput: {
        textAlignVertical: 'top',
        width: SCREEN_WIDTH - dynamicSize(70),
        height: dynamicSize(130),
        borderWidth: 0.5,
        borderColor: LIGHT_GRAY,
        borderRadius: dynamicSize(5),
        padding: dynamicSize(15)
    },
    outerCurver: {
        height: isAndroid ? dynamicSize(30) : dynamicSize(40),
        backgroundColor: THEME,
        width: SCREEN_WIDTH
    },
    innerCurve: {
        height: isAndroid ? dynamicSize(30) : dynamicSize(40),
        borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(40),
        borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(40),
        backgroundColor: LIGHT_WHITE
    },
    dropDownContainer: {
        width: SCREEN_WIDTH - dynamicSize(70)
    },
    searchView: {
        width: SCREEN_WIDTH - dynamicSize(35),
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(5),
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: dynamicSize(50)
    },
    searchInput: {
        marginLeft: dynamicSize(10),
        flex: 1,
        paddingVertical: isIOS ? dynamicSize(13) : dynamicSize(5),
        backgroundColor: WHITE,
        fontSize: getFontSize(14),
        fontFamily: montserratSemiBold,
        borderRadius: dynamicSize(50)
    },
    questionsMainContainer: {
        paddingVertical: dynamicSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionsImageStyle: {
        width: SCREEN_HEIGHT * 0.065,
        height: SCREEN_HEIGHT * 0.065,
        borderRadius: dynamicSize(5),
        marginRight: dynamicSize(12)
    },
    questionsRightContainer: {
        flex: 1,
        height: SCREEN_HEIGHT * 0.095,
        justifyContent: 'space-between'
    },
    questionsName: {
        width: '65%',
        fontFamily: montserratSemiBold
    },
    questionsDate: {
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        color: LIGHT_GRAY
    },
    alertContainer: {
        backgroundColor: WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        padding: dynamicSize(10),
        borderRadius: dynamicSize(5)
    },
    alertContainer1: {
        backgroundColor: WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        height: SCREEN_HEIGHT * 0.2,
        borderRadius: dynamicSize(5),
    },
    addressContainer: {
        backgroundColor: WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        height: SCREEN_HEIGHT * 0.27,
        borderRadius: dynamicSize(5)
    },
    alertContainer2: {
        backgroundColor: WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        borderRadius: dynamicSize(5),
        alignItems: "center"
    },
    alertContainer3: {
        backgroundColor: WHITE,
        width: SCREEN_WIDTH - dynamicSize(70),
        height: SCREEN_HEIGHT * 0.2,
        borderRadius: dynamicSize(5)
    },
    alertText: {
        fontSize: getFontSize(14),
        fontFamily: montserratMedium,
        textAlign: 'left'
    },
    alertButtonContainer: {
        marginTop: dynamicSize(25),
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    alertButton: {
        width: null,
        height: null,
        marginLeft: dynamicSize(15),
        paddingVertical: dynamicSize(5),
        paddingHorizontal: dynamicSize(25)
    },
    reqTextStyle: {
        fontSize: getFontSize(14)
    },
    optContainer: {
        width: SCREEN_WIDTH / 7,
        paddingHorizontal: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    otptextStyle: {
        justifyContent: 'center',
        color: BLACK,
        textAlign: 'center',
        width: '100%',
        fontSize: getFontSize(40),
        fontFamily: montserratBold
    },
    countryName: {
        color: THEME,
        fontFamily: montserratMedium,
        fontSize: getFontSize(14),
    },
    countryView: {
        width: SCREEN_WIDTH - dynamicSize(50),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: dynamicSize(10)
    },
    emptyMessageStyle: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
        marginVertical: dynamicSize(30),
        textAlign: 'center',
        color: THEME,
        fontSize: getFontSize(14),
        fontFamily: montserratMedium
    },
    ratingRow: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingRow2: {
        flexDirection: 'row',
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelText: {
        fontSize: getFontSize(12),
        fontFamily: montserratSemiBold
    },
    ratingCount: {
        marginLeft: dynamicSize(5),
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(12)
    },
    starView: {
        paddingVertical: dynamicSize(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        marginLeft: dynamicSize(50),
        width: SCREEN_WIDTH * 0.5,
        backgroundColor: LIGHT_BROWN,
        paddingHorizontal: dynamicSize(13),
        paddingVertical: dynamicSize(5),
        height: SCREEN_WIDTH * 0.1,
        marginTop: SCREEN_WIDTH * 0.05
    },
    addBrandBtn: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.06,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: THEME,
        marginBottom: 10,
        borderRadius: 6
    },
    addTxt: {
        alignSelf: 'center',
        color: WHITE,
        fontSize: getFontSize(15),
        fontFamily: montserratSemiBold,
    },
    notiPopupContainer: {
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        top: -50
    },
    squareBox: {
        width: dynamicSize(50),
        height: dynamicSize(45),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME,
        borderRadius: dynamicSize(10)
    },
    triangleDown: {
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderTopColor: THEME,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    notiCount: {
        color: WHITE,
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(14)
    },
    multiMainWrapperStyle: {
        width: SCREEN_WIDTH - dynamicSize(70),
        backgroundColor: WHITE,
        // borderRadius: dynamicSize(10),
        borderBottomColor: THEME,
        borderBottomWidth: 1
    },
    multiInput: {
        backgroundColor: WHITE,
        padding: isIOS ? dynamicSize(10) : 0,
        paddingHorizontal: dynamicSize(10),
        borderTopLeftRadius: dynamicSize(10),
        borderTopRightRadius: dynamicSize(10),
        borderColor: WHITE
    },
    styleDropdownMenuSubsection: {
        paddingBottom: 0,
        paddingLeft: dynamicSize(5),
        backgroundColor: WHITE,
        paddingRight: 0,
        borderBottomWidth: 0,
        borderRadius: dynamicSize(10)
    },
    textField: {
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: BLACK,
        flexDirection: 'row',
        width: SCREEN_WIDTH - dynamicSize(70),
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: THEME,
    },
    weekScheduleContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    weekScheduleArrowTouch: {
        paddingHorizontal: 10
    },
    weekdayText: {
        fontFamily: montserratSemiBold,
        fontSize: 11
    }
})

export default commonStyle