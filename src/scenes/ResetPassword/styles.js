import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { THEME, LIGHT_GRAY } from '../../utils/colors'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    parentContainer: {
        paddingHorizontal: dynamicSize(35),
        alignItems: 'center'
    },
    backIcon: {
        marginVertical: SCREEN_HEIGHT * 0.02
    },
    forgotIcon: {
        alignSelf: 'center'
    },
    forgotText: {
        marginVertical: dynamicSize(10),
        alignSelf: 'center',
        color: THEME,
        fontFamily: montserratBold,
        fontSize: getFontSize(16)
    },
    input: {
        marginTop: SCREEN_HEIGHT * 0.06
    },
    notReceived: {
        paddingVertical: dynamicSize(7),
        alignSelf: 'flex-end',
        color: LIGHT_GRAY,
        fontFamily: montserratSemiBold
    },
    sendAgain: {
        color: THEME,
        fontFamily: montserratSemiBold
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.1
    }
})

export default styles