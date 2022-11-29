import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'
import { dynamicSize, getFontSize } from '../../utils/responsive'

const styles = StyleSheet.create({
    shoptext: {
        fontSize: getFontSize(25),
        fontFamily: montserratBold,
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
        width: 50,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        height: 50
    },
    view: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.24,
        borderRadius: 10,
    },
    productImage: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.24,
        borderRadius: 10,
    },
    price: {
        color: THEME,
        fontFamily: montserratBold,
        marginTop: 10,
        width: '50%'
    },
    stock: {
        color: 'red',
        marginTop: 10,
    },
    desc: {
        fontSize: getFontSize(10),
        marginTop: 5
    },
    dotStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: SCREEN_WIDTH * 0.05,
        top: 6
    },
    image: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_HEIGHT * 0.1,
        alignItems: 'center',
        position: 'absolute',
        marginTop: 35,
        right: SCREEN_WIDTH * 0.06
    },
    backgroundContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH * 0.16,
        marginTop: SCREEN_HEIGHT * 0.17
    },
    text: {
        marginTop: 9,
        fontSize: getFontSize(10),
        fontFamily: montserratBold
    },
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    emptyDataSource: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    emptySearchResult: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    viewContainer: {
        width: SCREEN_WIDTH * 1,
        height: SCREEN_HEIGHT * 0.2,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: LIGHT_WHITE
    },
    imageContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: LIGHT_WHITE
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    count: {
        fontSize: 17,
        alignSelf: "center",
        color: "rgb(70,142,76)",
        position: 'absolute',
        bottom: 0
    }
})

export default styles