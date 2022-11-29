import { StyleSheet } from 'react-native'
import { WHITE } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { montserratBold } from '../../utils/fontFamily'

const styles = StyleSheet.create({
    label: {
        alignSelf: 'flex-start',
        marginLeft: dynamicSize(35),
        fontFamily: montserratBold,
    },
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: dynamicSize(10),
        width: SCREEN_WIDTH - dynamicSize(70),
        backgroundColor: WHITE,
        borderBottomWidth: 0,
     
        borderRadius: dynamicSize(5),
        marginBottom: dynamicSize(20)
    },
    textInput: {
      
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: WHITE,
        borderWidth: 0,
        marginVertical: SCREEN_HEIGHT * 0.01,
    },
    deposite: {
        fontFamily: montserratBold,
        textAlign: 'center',
        paddingHorizontal: dynamicSize(35),
        flex: 1
    },
    buttonStyle: {
        marginVertical: SCREEN_HEIGHT * 0.03
    },
    usd:{
        marginTop:SCREEN_WIDTH* 0.05,
        fontSize:getFontSize(30)
    }
})

export default styles