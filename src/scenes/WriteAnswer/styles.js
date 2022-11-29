import { StyleSheet } from 'react-native'
import { LIGHT_GRAY, LIGHT_WHITE } from '../../utils/colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT, isAndroid } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    textInputWithImageContainer: {
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT * 0.04,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: LIGHT_GRAY,
        width: SCREEN_WIDTH - dynamicSize(70),
        borderRadius: dynamicSize(5),
        height: isAndroid ? SCREEN_HEIGHT * 0.07 : SCREEN_HEIGHT * 0.05,
        backgroundColor: LIGHT_WHITE,
        overflow: 'hidden',
    },
    answer: {
        fontFamily: montserratSemiBold,
        paddingHorizontal: dynamicSize(15),
        width: '85%',
    },
    editIcon: {
        paddingVertical: dynamicSize(10),
        borderLeftWidth: 0.5,
        borderColor: LIGHT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: LIGHT_WHITE
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.03,
        width: SCREEN_WIDTH - dynamicSize(70)
    }
})

export default styles