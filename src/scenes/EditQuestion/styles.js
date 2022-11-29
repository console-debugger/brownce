import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '../../components/helper'
import { montserratBold } from '../../utils/fontFamily'
import { getFontSize, dynamicSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: dynamicSize(35),
    },
    title: {
        marginTop: SCREEN_HEIGHT * 0.1,
        fontSize: getFontSize(30),
        fontFamily: montserratBold
    }
})

export default styles