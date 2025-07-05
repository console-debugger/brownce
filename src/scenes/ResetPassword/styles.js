import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { THEME, LIGHT_GRAY } from '../../utils/colors'
import { interBold, interSemiBold } from '../../utils/fontFamily'

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
        fontFamily: interBold,
        fontSize: getFontSize(16)
    },
    input: {
        marginTop: SCREEN_HEIGHT * 0.06
    },
    notReceived: {
        paddingVertical: dynamicSize(7),
        alignSelf: 'flex-end',
        color: LIGHT_GRAY,
        fontFamily: interSemiBold
    },
    sendAgain: {
        color: THEME,
        fontFamily: interSemiBold
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.1
    }
})

export default styles