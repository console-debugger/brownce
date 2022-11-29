import { StyleSheet } from 'react-native'
import { isIOS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { BLACK, LIGHT_GRAY, WHITE } from '../../utils/colors'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    imageName: {
        paddingHorizontal: dynamicSize(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallImage: {
        width: dynamicSize(25),
        height: dynamicSize(25),
        borderRadius: dynamicSize(3)
    },
    name: {
        marginLeft: dynamicSize(10),
        color: 'gray',
        fontSize: getFontSize(10)
    },
    title: {
        marginVertical: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: dynamicSize(20),
        fontSize: getFontSize(14),
        fontFamily: montserratSemiBold
    },
    line: {
        alignSelf: 'center',
        width: SCREEN_WIDTH - dynamicSize(40),
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5
    },
    textinput: {
        paddingVertical: isIOS ? dynamicSize(15) : dynamicSize(10),
        backgroundColor: WHITE,
        flex: 1,
        fontSize: getFontSize(14)
    },
    itemContainer: {
        marginHorizontal: dynamicSize(7),            
        marginBottom: dynamicSize(10),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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
        alignSelf: 'flex-start',
        backgroundColor: WHITE
    },
    msgText: {
        lineHeight: dynamicSize(18),
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        color: BLACK
    },
    textContainer: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dynamicSize(10)
    },
})

export default styles