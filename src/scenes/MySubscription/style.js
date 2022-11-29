import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid } from '../../components/helper'
import { GRAY, BLACK, LIGHT_BROWN, WHITE, LIGHT_GRAY, MID_GRAY, LIGHT_WHITE } from '../../utils/colors'
import { montserrat, montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
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
        width: SCREEN_WIDTH * 0.55,
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.04
    },
    seperatorStyle: {
        height: dynamicSize(20)
    },
    tickStyle: {
        top: -6,
        left: 0,
        right: 0,
        position: 'absolute',
        alignSelf: "flex-end",
        left: SCREEN_WIDTH * 0.77

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

})

export default styles