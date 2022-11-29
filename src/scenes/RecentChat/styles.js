import { StyleSheet } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { montserratSemiBold } from '../../utils/fontFamily'
import { MID_LIGHT_GRAY } from '../../utils/colors'

const styles = StyleSheet.create({
    chatContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: dynamicSize(10),
        justifyContent: 'space-between'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    chatTitle: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageStyle: {
        width: dynamicSize(50),
        height: dynamicSize(50),
        borderRadius: dynamicSize(25)
    },
    seperator: {
        height: dynamicSize(15)
    },
    name: {
        fontSize: getFontSize(16),
        fontFamily: montserratSemiBold,
        width: '85%'
    },
    text: {
        alignSelf: 'flex-start',
        color: MID_LIGHT_GRAY
    }
})

export default styles