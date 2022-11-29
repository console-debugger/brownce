import { StyleSheet } from 'react-native'
import { BLACK, MID_GRAY } from '../../utils/colors'
import { montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    signupDescription: {
        color: MID_GRAY,
        fontFamily: montserratSemiBold,
        textAlign: 'center'
    },
    logo: {
        marginTop: SCREEN_HEIGHT * 0.04
    },
    providerText: {
        marginTop: dynamicSize(5),
        color: BLACK,
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        marginBottom: SCREEN_HEIGHT * 0.06 - dynamicSize(5)
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.03
    }
})

export default styles