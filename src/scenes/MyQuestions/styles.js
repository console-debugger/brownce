import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { LIGHT_GRAY, MID_LIGHT_GRAY } from '../../utils/colors'
import { montserratSemiBold, montserratMedium, montserratBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: dynamicSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageStyle: {
        width: SCREEN_HEIGHT * 0.065,
        height: SCREEN_HEIGHT * 0.065,
        borderRadius: dynamicSize(5),
        marginRight: dynamicSize(12)
    },
    flatList: {
        width: SCREEN_WIDTH,
        paddingHorizontal: dynamicSize(15)
    },
    seperator: {
        borderBottomWidth: 0.5,
        borderBottomColor: MID_LIGHT_GRAY
    },
    rightContainer: {
        flex: 1,
        height: SCREEN_HEIGHT * 0.065,
        justifyContent: 'space-between'
    },
    name: {
        width: '65%',
        fontFamily: montserratSemiBold
    },
    date: {
        fontSize: getFontSize(10),
        fontFamily: montserratMedium,
        color: LIGHT_GRAY
    },
    noquestion:{
        marginVertical:SCREEN_WIDTH * 0.6,
        fontSize: getFontSize(12),
          fontFamily:montserratBold
    }
})

export default styles