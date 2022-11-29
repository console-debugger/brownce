import React, { useCallback, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { MyView, Card, MyText, TouchableIcon, SafeArea, Button } from '../../components/customComponent';
import { SCREEN_WIDTH } from '../../components/helper';
import { dynamicSize } from '../../utils/responsive';
import styles from './styles';
import { LIGHT_BROWN, LIGHT_WHITE, THEME } from '../../utils/colors';
import { leftArrow, rightArrow } from '../../components/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonStyle from '../../components/commonStyle';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

// Prompt UI
const Prompt = ({ navigation, route }) => {

    const detail = route?.['params']
    const state = useSelector(state => { return state })
    const { ANSWER } = state['localeReducer']['locale']
    const { profileQuestions, profileQuestionAnswer } = state['profileReducer']

    const [selectedIndex, setSelectedIndex] = useState(0)

    const crouselRef = useRef('crouselref')

    useFocusEffect(
        useCallback(() => {
            const indexFound = profileQuestionAnswer.findIndex(item => { if (item['ProfileQuestionMasterId'] === detail['ProfileQuestionMasterId']) return item })
            if (indexFound < 0) return
            else { crouselRef?.['current']?.snapToItem(indexFound) }
            for (let initialOne = 0; initialOne < profileQuestions.length; initialOne++) {
                for (let initialTwo = 0; initialTwo < profileQuestionAnswer.length; initialTwo++) {
                    if (profileQuestions[initialOne]['ProfileQuestionMasterId'] === profileQuestionAnswer[initialTwo]['ProfileQuestionMasterId']) {
                        profileQuestions[initialOne]['status'] = true
                    }
                    if (detail['ProfileQuestionMasterId'] === profileQuestions[initialOne]['ProfileQuestionMasterId']) {
                        profileQuestions[initialOne]['status'] = false
                    }
                }
            }
        }, [])
    )

    const _navToAnswer = item => () => navigation.navigate('writeAnswer', { ...item, selectedIndex: detail['index'] })

    const _renderPrompt = ({ item, index }) => {
        return (
            <Card style={styles['cardStyle']}>
                <MyText style={[commonStyle['extraBoldText'], { marginVertical: SCREEN_WIDTH * 0.1 }]}>{item['Question'].toUpperCase()}</MyText>
                <Button disabled={item['status'] ? true : false} onPress={_navToAnswer(item)} style={[styles['buttonStyle'], { backgroundColor: item['status'] ? LIGHT_BROWN : THEME }]} text={ANSWER} />
            </Card>
        )
    }

    const slideleft = () => crouselRef.current.snapToItem(selectedIndex - 1)

    const slideRight = () => crouselRef.current.snapToItem(selectedIndex + 1)

    const _onSnapToItem = index => setSelectedIndex(index)

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={{ backgroundColor: LIGHT_WHITE, alignItems: 'center', }}>
                <Carousel
                    ref={crouselRef}
                    containerCustomStyle={styles['crousel']}
                    data={profileQuestions}
                    renderItem={_renderPrompt}
                    sliderWidth={SCREEN_WIDTH}
                    removeClippedSubviews={false}
                    itemWidth={SCREEN_WIDTH - dynamicSize(70)}
                    onSnapToItem={_onSnapToItem}
                />
                <MyView style={styles['row']}>
                    <TouchableIcon style={{ padding: dynamicSize(15), marginRight: dynamicSize(10) }} onPress={slideleft} source={leftArrow} />
                    <TouchableIcon style={{ padding: dynamicSize(15) }} onPress={slideRight} source={rightArrow} />
                </MyView>
            </MyView>
        </SafeArea>
    )
}

export default Prompt