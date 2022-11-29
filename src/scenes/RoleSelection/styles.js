import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { THEME, WHITE } from '../../utils/colors'
import { montserratBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    logo: {
        marginVertical: SCREEN_HEIGHT * 0.06
    },
    button: {
        borderColor: THEME,
        borderRadius: dynamicSize(5),
        borderWidth: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(50),
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
        color: THEME,
        fontFamily: montserratBold,
        fontSize: getFontSize(14)
    }
})

export default styles