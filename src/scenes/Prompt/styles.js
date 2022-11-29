import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'


const styles = StyleSheet.create({
    cardStyle: {
        width: SCREEN_WIDTH - dynamicSize(70),
        marginVertical: dynamicSize(10),
        height: SCREEN_WIDTH * 0.8,
        paddingHorizontal: dynamicSize(15)
    },
    crousel: {
        width: SCREEN_WIDTH,
        marginTop: SCREEN_HEIGHT * 0.07,
        paddingVertical: dynamicSize(10)
    },
    row: {
        flexDirection: 'row'
    },
    description: {
        paddingVertical: dynamicSize(15)
    },
    buttonStyle: {
        marginTop: dynamicSize(15),
        alignSelf: 'center',
        width: '50%'
    }
})

export default styles
