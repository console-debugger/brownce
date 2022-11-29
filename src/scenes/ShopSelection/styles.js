import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    logo: {
        marginVertical: SCREEN_HEIGHT * 0.06
    },
    shoptext: {
        fontSize: getFontSize(20),
        fontFamily: montserratBold,
        marginTop: '20%'
    },
    button: {
        marginTop: '5%',
        borderRadius: dynamicSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH - dynamicSize(100),
        paddingVertical: SCREEN_HEIGHT * 0.05
    },
    customerButton: {
        backgroundColor: THEME
    },
    customerText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(14)
    },
    providerText: {
        color: WHITE,
        fontFamily: montserratBold,
        fontSize: getFontSize(14)
    },
    headerView: {
        height: SCREEN_HEIGHT * 0.12,
        backgroundColor: THEME,
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileImage: {
        height: SCREEN_HEIGHT * 0.085,
        width: SCREEN_HEIGHT * 0.085,
        borderRadius: (SCREEN_HEIGHT * 0.085) / 2
    },
    userDetails: {
        paddingLeft: dynamicSize(20),
        flex: 1,
        justifyContent: 'center',
        paddingRight: dynamicSize(10)
    },
    userName: {
        color: WHITE,
        fontFamily: montserratSemiBold,
        fontSize: getFontSize(16)
    },
    starView: {
        paddingVertical: dynamicSize(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        marginTop: 2,
        fontFamily: montserratSemiBold,
        color: WHITE,
        fontSize: getFontSize(10),
        marginLeft: dynamicSize(5)
    },
    plusadd: {
        marginTop: 65,
        width: 50,
        height: 50
    }
})

export default styles