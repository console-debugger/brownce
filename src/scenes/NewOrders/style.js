import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '../../components/helper'
import { BLACK, GRAY, THEME, WHITE } from '../../utils/colors'
import { montserrat, montserratBold, montserratMedium } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    cardView: {
        marginTop: 15,
        paddingVertical: 12,
        width: SCREEN_WIDTH - dynamicSize(30),
        borderRadius: 10,
        backgroundColor: WHITE
    },
    topView: {
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: GRAY,
        marginTop: 5
    },
    insideView: {
        paddingHorizontal: dynamicSize(7),
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    id: {
        fontWeight: "bold",
        fontSize: getFontSize(13),
        width: '35%',
        color: BLACK
    },
    date: {
        fontWeight: "500",
        marginLeft: 20,
        fontSize: getFontSize(13),
        color: GRAY,
        fontFamily: montserratMedium
    },
    thumbnail: {
        width: dynamicSize(80),
        height: dynamicSize(80),
        borderRadius: dynamicSize(10)
    },
    contentContainer: {
        marginLeft: dynamicSize(20),
        flex: 1
    },
    title: {
        marginVertical: 5,
        fontSize: 13,
        fontWeight: Platform.OS === "ios" ? '800' : 'bold'
    },
    price: {
        fontSize: 16,
        fontWeight: Platform.OS === "ios" ? '800' : 'bold',
        color: THEME,
        marginLeft: SCREEN_WIDTH * 0.1
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    secondaryText: {
        fontSize: getFontSize(13),
        color: GRAY,
        marginTop: 5
    },
    descText: {
        color: BLACK,
        marginTop: 10,
        fontWeight: '500',
        fontSize: getFontSize(14),
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        alignItems: 'center',
    },
    cost: {
        fontSize: getFontSize(18),
        color: THEME,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    itineraryBtn: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        borderColor: THEME
    },
    msgText: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    emptytext: {
        fontSize: getFontSize(15),
        fontWeight: '700'
    },
    bottomRow: {
        overflow: 'hidden',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 3
    },
    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 0
    },
    complete: {
        width: null,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingVertical: SCREEN_WIDTH * 0.01,
        backgroundColor: THEME,
        borderRadius: dynamicSize(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    status: {

    },
    customerDetails: {
        marginTop: dynamicSize(5),
        marginHorizontal: dynamicSize(7)
    },
    detailsTxt: {
        fontSize: getFontSize(14),
        textAlign: 'right',
        color: THEME,
        textDecorationLine: 'underline',
        textDecorationColor: THEME
    },
    customerDetailBold: {
        marginVertical: dynamicSize(5),
        fontFamily: montserratBold,
        fontSize: getFontSize(13)
    },
    label: {
        fontFamily: montserratBold,
        fontSize: getFontSize(11)
    },
    value: {
        fontFamily: montserrat,
        fontSize: getFontSize(11)
    }
})

export default styles