import { StyleSheet } from "react-native";
import { GRAY, THEME, WHITE } from "../../utils/colors";
import { dynamicSize } from "../../utils/responsive";
import { SCREEN_WIDTH } from "../../components/helper";
import { montserratBold, montserratSemiBold } from "../../utils/fontFamily";

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        backgroundColor: WHITE
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: dynamicSize(15),
        marginVertical: dynamicSize(15)
    },
    pic: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        borderRadius: (SCREEN_WIDTH / 4) / 2
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        marginHorizontal: 15,
        flex: 1,
        fontSize: 16,
        fontFamily: montserratBold
    },
    sortIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    sinceContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    bold: {
        fontFamily: montserratBold,
        fontSize: 25
    },
    mediumText: {
        fontSize: 15
    },
    startContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    statCardContainer: {
        borderWidth: 1,
        borderColor: GRAY,
        borderRadius: 40,
        padding: 5,
        width: (SCREEN_WIDTH - dynamicSize(40)) / 3,
        alignItems: 'center',
        elevation: 5,
        backgroundColor: WHITE
    },
    cardIcon: {
        marginTop: 15,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    statsValue: {
        marginTop: 5,
        fontSize:14,
        fontFamily: montserratBold,
        color: THEME
    },
    statsLabel: {
        marginTop: 20,
        fontSize: 10,
        textAlign: 'center',
        marginBottom:5,
    },
    separator: {
        height: 15
    },
    statList: {
        paddingHorizontal: 10,
        paddingVertical:15
    }
})

export default styles