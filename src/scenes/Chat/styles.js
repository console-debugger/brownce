import { StyleSheet } from 'react-native'
import { LIGHT_WHITE, WHITE, THEME, BLACK } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { SCREEN_WIDTH, isIOS, SCREEN_HEIGHT } from '../../components/helper'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: LIGHT_WHITE
    },
    itemContainer: {
        marginHorizontal: dynamicSize(7),
        maxWidth: '70%',
        flexDirection: 'row',
        marginBottom: dynamicSize(10),
    },
    leftItemContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rightItemContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    imageStyle: {
        alignSelf: 'flex-end',
        width: SCREEN_WIDTH * 0.08,
        height: SCREEN_WIDTH * 0.08,
        borderRadius: (SCREEN_WIDTH * 0.08) / 2,
        marginRight: dynamicSize(5)
    },
    chatWrapper: {
        borderRadius: dynamicSize(10),
        paddingVertical: dynamicSize(8),
        paddingHorizontal: dynamicSize(10),
        marginHorizontal: dynamicSize(5)
    },
    leftChatWraper: {
        alignSelf: 'flex-start',
        backgroundColor: WHITE
    },
    rightChatWrapper: {
        borderRadius: dynamicSize(20),
        alignSelf: 'flex-end',
        backgroundColor: THEME
    },
    msgText: {
        fontSize: getFontSize(12),
    },
    leftMsg: {
        color: BLACK
    },
    rightMsg: {
        color: WHITE
    },
    textContainer: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dynamicSize(10)
    },
    textinput: {
        paddingVertical: isIOS ? dynamicSize(15) : dynamicSize(10),
        backgroundColor: WHITE,
        flex: 1,
        maxHeight:SCREEN_HEIGHT * 0.1,
        fontSize: getFontSize(14)
    }
})

export default styles