import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { LIGHT_WHITE, WHITE } from '../../utils/colors'
import { getFontSize } from '../../utils/responsive'
import { montserratSemiBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    seperator: {
        height: SCREEN_HEIGHT * 0.01,
        backgroundColor: LIGHT_WHITE
    },
    listContainer: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        paddingHorizontal: SCREEN_WIDTH * 0.08,
        paddingVertical: SCREEN_HEIGHT * 0.03,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: getFontSize(16),
        fontFamily: montserratSemiBold
    }
})

export default styles