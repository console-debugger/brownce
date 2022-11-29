import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MyText, MyView, SafeArea, SecondaryButton, MyImage, CurveView, SearchInput, EmptyMessage, LoaderSearch } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../components/helper'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { FlatList, StyleSheet } from 'react-native'
import { THEME, LIGHT_WHITE, LIGHT_BROWN, WHITE, LIGHT_GRAY, BLACK } from '../../utils/colors'
import { loaderAction, getCategorySearchAction, SearchloaderAction } from '../../redux/action'
import { montserratBold, montserratMedium, montserratSemiBold } from '../../utils/fontFamily';
import { navigateToScreen } from '../../navigation/rootNav';
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const Categories = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { profile } = state['profileReducer']
    const { categoryList } = state['productReducer']
    const [value, setValue] = useState('')
    const { loading, searchloading } = state['loaderReducer']

    // search caterory fetching
    useEffect(() => {
        const param = {
            'Search': value
        }
        value ? dispatch(SearchloaderAction(true)) : dispatch(loaderAction(true))
        dispatch(getCategorySearchAction(param))
    }, [value])

    const _keyExtractor = (item, index) => item + index

    const _selectServices = (item, index) => () => {
        let array = []
        array.push(item.Id)
        navigateToScreen('productresults', { categoryId: array })
    }

    // render search 
    const _renderSearch = ({ item, index }) => {
        return (
            <SecondaryButton
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['CategoryName']}
                onPress={_selectServices(item, index)}
            />
        )
    }

    // render empty UI
    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.25 }} message={"No results found."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    return (
        <SafeArea style={{ backgroundColor: THEME, paddingBottom: -useSafeAreaInsets().bottom, }}>
            <MyView style={styles['headerView']}>
                <MyImage source={{ uri: profile?.['ProfilePic'] }} style={styles['profileImage']} />
                <MyView style={styles['userDetails']}>
                    <MyText style={styles['userName']}>{profile?.['Name'] ? profile['Name'] : LOADING}</MyText>
                    <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>{profile?.['Username'] ? profile['Username'] : LOADING}</MyText>
                </MyView>
            </MyView>
            <MyView style={{ flex: 1, width: SCREEN_WIDTH, backgroundColor: LIGHT_WHITE }}>
                <CurveView />
                <SearchInput
                    style={{ alignSelf: 'center' }}
                    value={value}
                    onChangeText={(value) => setValue(value)} />
                <LoaderSearch style={{ marginVertical: SCREEN_HEIGHT * 0.25 }} isVisible={searchloading} />
                {searchloading ? null :
                    <FlatList
                        scrollEnabled={false}
                        data={categoryList}
                        keyExtractor={_keyExtractor}
                        renderItem={_renderSearch}
                        ListEmptyComponent={_renderEmpty}
                        contentContainerStyle={styles['crousel']}
                        numColumns={2}
                        columnWrapperStyle={{ marginTop: 10, paddingHorizontal: dynamicSize(25), justifyContent: 'space-between' }}
                    />}

            </MyView>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        marginTop: SCREEN_HEIGHT * 0.03
    },

    bottomView: {
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: WHITE,
        borderTopLeftRadius: dynamicSize(30),
        borderTopRightRadius: dynamicSize(30),
        paddingVertical: SCREEN_HEIGHT * 0.04
    },
    helpText: {
        fontSize: getFontSize(14),
        fontFamily: montserratBold,
        marginVertical: SCREEN_HEIGHT * 0.025
    },
    buttonStyle: {
        width: null,
        paddingHorizontal: SCREEN_WIDTH * 0.15
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
    },
    locateIcon: {
        marginRight: dynamicSize(10),
        marginBottom: SCREEN_HEIGHT * 0.02,
        backgroundColor: WHITE,
        alignSelf: 'flex-end',
        borderRadius: dynamicSize(100),
        padding: dynamicSize(8)
    },
    boldTitle: {
        marginTop: SCREEN_HEIGHT * 0.02,
        textAlign: 'center',
        fontSize: getFontSize(20),
        fontFamily: montserratSemiBold,
        marginLeft: SCREEN_WIDTH * 0.25
    },
    themeTitle: {
        marginVertical: SCREEN_HEIGHT * 0.02,
        color: THEME,
        textAlign: 'center',
        fontSize: getFontSize(20),
        fontFamily: montserratBold
    },
    crousel: {
        width: SCREEN_WIDTH,
        paddingVertical: SCREEN_HEIGHT * 0.02
    },
    selected: {
        height: null,
        paddingVertical: dynamicSize(15),
        backgroundColor: LIGHT_BROWN,
        borderColor: LIGHT_BROWN,
    },
    unselected: {
        height: null,
        paddingVertical: dynamicSize(15),
        borderColor: LIGHT_GRAY,
    },
    selectedText: {
        fontSize: getFontSize(10),
        color: WHITE,
        fontFamily: montserratMedium
    },
    unselectedText: {
        fontSize: getFontSize(10),
        color: BLACK,
        fontFamily: montserratMedium
    },
    dotStyle: {
        backgroundColor: LIGHT_GRAY,
        width: dynamicSize(13),
        height: dynamicSize(13),
        borderRadius: dynamicSize(10)
    },
    nextButton: {
        alignSelf: 'center',
        bottom: SCREEN_HEIGHT * 0.05
    },
    value: {
        position: 'absolute',
        fontSize: getFontSize(12),
        fontFamily: montserratMedium,
        top: dynamicSize(-5)
    },
    mapMarkerStyle: {
        width: "50%",
        height: "50%",
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: -3,
        zIndex: 1,
    },
    iconText: {
        color: WHITE,
        alignSelf: 'center',
        fontSize: getFontSize(12),
    },
    customView: {
        width: 140,
        borderRadius: 100
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
    headerView: {
        height: SCREEN_HEIGHT * 0.12,
        backgroundColor: THEME,
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        flexDirection: 'row'
    },


})


export default Categories