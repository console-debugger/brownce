import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { LIGHT_WHITE, BLACK, WHITE, THEME } from '../utils/colors'
import { MyView, TouchableIcon, MyText, SafeArea } from './customComponent'
import { SCREEN_WIDTH, SCREEN_HEIGHT, isAndroid } from './helper'
import { backIcon, menuIcon } from './icons'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { montserratBold } from '../utils/fontFamily'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'

const Header = props => {

    const { title, navigation, isBack, isTheme, source, onRightPress, isLowerCase, style, leftText, rightText, onLeftPress, isDrawer, imageStyle, leftSource } = props

    const _goBack = () => navigation.goBack()

    const _openDrawer = () => navigation.openDrawer()

    return (
        <SafeAreaView style={{ backgroundColor: isTheme ? THEME : LIGHT_WHITE, paddingBottom: -useSafeAreaInsets().bottom }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_WHITE} />
            <MyView style={[styles['headerView'], { backgroundColor: isTheme ? THEME : LIGHT_WHITE }, style]}>
                {isBack && <TouchableIcon style={styles['leftIcon']} imageStyle={imageStyle} source={leftSource || backIcon} onPress={_goBack} />}
                {isDrawer && <TouchableIcon style={styles['leftIcon']} source={menuIcon} onPress={_openDrawer} />}
                {leftText && <MyText onPress={onLeftPress} style={styles['leftText']}>{leftText.toUpperCase()}</MyText>}
                <MyText style={[styles['title'], { color: isTheme ? WHITE : BLACK }]}>{title ? isLowerCase ? title : title.toUpperCase() : ''}</MyText>
                {rightText && <MyText onPress={onRightPress} style={styles['rightText']}>{rightText.toUpperCase()}</MyText>}
                {source && <TouchableIcon style={styles['rightIcon']} source={source} onPress={onRightPress} />}
            </MyView>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerView: {
        width: SCREEN_WIDTH,
        height: isAndroid ? SCREEN_HEIGHT * 0.08 : SCREEN_HEIGHT * 0.06,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIcon: {
        padding: dynamicSize(10),
        zIndex: 2,
        position: 'absolute',
        left: dynamicSize(20)
    },
    title: {
        textAlign: 'center',
        flex: 1,
        fontSize: getFontSize(16),
        fontFamily: montserratBold
    },
    rightIcon: {
        padding: dynamicSize(10),
        zIndex: 2,
        position: 'absolute',
        right: dynamicSize(20)
    },
    leftText: {
        paddingHorizontal: dynamicSize(10),
        paddingVertical: dynamicSize(10),
        fontFamily: montserratBold,
        color: THEME,
        zIndex: 2,
        position: 'absolute',
        left: dynamicSize(0),
        fontSize: getFontSize(10)
    },
    rightText: {
        paddingHorizontal: dynamicSize(10),
        paddingVertical: dynamicSize(10),
        fontFamily: montserratBold,
        color: THEME,
        zIndex: 2,
        position: 'absolute',
        right: dynamicSize(0),
        fontSize: getFontSize(10)
    }
})