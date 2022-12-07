import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../components/helper";
import { LIGHT_BROWN, LIGHT_GRAY, MID_LIGHT_GRAY, THEME } from "../../utils/colors";
import { montserratBold, montserratMedium } from "../../utils/fontFamily";
import { dynamicSize, getFontSize } from "../../utils/responsive";

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
})

export default styles