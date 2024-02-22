import React, { useMemo, useState } from 'react'
import { Modal, LayoutAnimation, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './helper';
import { Button, MyImage, MyText, TouchableIcon } from './customComponent';
import { BLACK, LIGHT_BROWN, LIGHT_THEME_34, OFF_THEME, THEME, TRANSPARENT_BLACK } from '../utils/colors';
import { montserrat, montserratBold, montserratSemiBold } from '../utils/fontFamily';
import { crossBold } from './icons';

const MyCoachMarks = (props) => {

    const {
        visible,
        onClose,
        title,
        description,
        subDescription,
        buttonTitle,
        skipTitle,
        onSkip,
        crossIcon,
        data = [],
        circularOverLayStyle = {},
        isCircleMask,
        pointerIcon
    } = props

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const hasData = useMemo(() => {
        return !!data?.length && selectedIndex >= 0
    }, [data, selectedIndex])

    const dismiss = () => {
        LayoutAnimation.easeInEaseOut();
        if (onClose) onClose();
    }

    const onStart = () => {
        setSelectedIndex(selectedIndex + 1)
    }

    const onNextPress = () => {
        setSelectedIndex(selectedIndex + 1)
        if (selectedIndex + 1 == data?.length) {
            if (onClose) onClose()
        }
    }

    const onCrossPress = () => {
        setSelectedIndex(-1)
        if (onClose) onClose()
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={dismiss}
        >
            <View style={styles.visibleContainer}>
                <TouchableOpacity style={styles.backArea} activeOpacity={1} />
                {selectedIndex == -1 ? <View style={styles.container}>
                    <MyText style={[styles.centeringTxt, styles.title]}>{title}</MyText>
                    <MyText style={[styles.centeringTxt, styles.description]}>{description}</MyText>
                    <MyText style={[styles.centeringTxt, styles.subDescription]}>{subDescription}</MyText>
                    <Button
                        text={buttonTitle}
                        style={styles.startButton}
                        onPress={onStart}
                        avoidLowerCase
                        textStyle={styles.startButtonText}
                    />
                    <Button
                        text={skipTitle}
                        style={styles.skipButton}
                        textStyle={styles.skipText}
                        onPress={onSkip}
                        avoidLowerCase
                    />
                </View>
                    : null}
                {hasData ? <View style={styles.container}>
                    {crossIcon ? <TouchableIcon onPress={onCrossPress} source={crossIcon} style={styles.crossContainer} imageStyle={styles.cross} resizeMode='contain' /> : null}
                    {data[selectedIndex]?.title ? <MyText style={[styles.centeringTxt, styles.title]}>{data[selectedIndex]?.title}</MyText> : null}
                    {data[selectedIndex]?.icon ? <MyImage source={data[selectedIndex]?.icon} style={{ marginVertical: 10 }} /> : null}
                    {data[selectedIndex]?.description ? <MyText style={[styles.centeringTxt, styles.description, { fontFamily: montserratBold }]}>{data[selectedIndex]?.description}</MyText> : null}
                    <Button
                        text={data[selectedIndex]?.buttonTitle}
                        style={styles.startButton}
                        onPress={onNextPress}
                        avoidLowerCase
                        textStyle={styles.startButtonText}
                    />
                </View>
                    :
                    null}
            </View>
            {(isCircleMask && hasData) ? <View style={[{ width: circularOverLayStyle?.width, height: circularOverLayStyle?.height }, data[selectedIndex]?.position, styles.coachMarks]}>
                <View style={[circularOverLayStyle, styles.coachMarks]} />
                {(isCircleMask && hasData) &&
                    <MyImage
                        source={pointerIcon}
                        resizeMode="stretch"
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
                }
            </View>
                : null}
        </Modal>
    )
}

export default MyCoachMarks

const styles = StyleSheet.create({
    visibleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArea: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: TRANSPARENT_BLACK,
    },
    container: {
        width: SCREEN_WIDTH - 50,
        backgroundColor: OFF_THEME,
        borderColor: LIGHT_THEME_34,
        borderWidth: 8,
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    title: {
        color: THEME,
        fontFamily: montserratBold,
        fontSize: 20,
    },
    centeringTxt: {
        color: BLACK,
        textAlign: 'center',
    },
    description: {
        marginVertical: 15
    },
    subDescription: {
        fontFamily: montserratSemiBold
    },
    startButton: {
        marginVertical: 15,
        borderRadius: 20,
        width: '60%'
    },
    skipButton: {
        backgroundColor: LIGHT_THEME_34,
        borderRadius: 20,
        width: '60%'
    },
    skipText: {
        color: THEME
    },
    startButtonText: {
        fontSize: 14,
        fontFamily: montserrat,
    },
    crossContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    cross: {
        width: 20,
        height: 20
    },
    coachMarks: {
        position: 'absolute',
    },
})