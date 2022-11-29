import React from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Touchable, MyText, MyImage } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/helper'
import { checkIcon, unCheckIcon } from '../../components/icons'

// Services selection UI
const SelectService = ({ navigation }) => {

    const data = [
        {
            status: true,
            name: 'Beautifully Bald'
        },
        {
            status: false,
            name: '1a - 1c'
        },
        {
            status: false,
            name: '2a - 2c'
        },
        {
            status: false,
            name: '3a -3c'
        },
        {
            status: false,
            name: '4a - ac'
        },
        {
            status: false,
            name: 'Relaxed'
        },
        {
            status: false,
            name: 'Normal'
        },
        {
            status: false,
            name: 'Transitioning'
        },
    ]

    const _keyExtractor = (item, index) => item + index

    const _seperator = () => (<MyView style={styles['seperator']} />)

    const _renderServies = ({ item, index }) => {
        return (
            <Touchable style={styles['listContainer']}>
                <MyText style={styles['name']}>{item['name']}</MyText>
                <MyImage source={item['status'] ? checkIcon : unCheckIcon} />
            </Touchable>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, paddingBottom: -useSafeAreaInsets().bottom }}>
            <MyView>
                <FlatList
                    key='services'
                    keyExtractor={_keyExtractor}
                    data={data}
                    renderItem={_renderServies}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={_seperator}
                    contentContainerStyle={{ width: SCREEN_WIDTH, paddingVertical: SCREEN_HEIGHT * 0.01 }}
                />
            </MyView>
        </SafeArea>
    )
}

export default SelectService