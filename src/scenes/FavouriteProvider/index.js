import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EmptyMessage, Loader, MyImage, MyIndicator, MyText, MyView, SafeArea, Touchable, TouchableIcon } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper'
import { activeFavHeartIcon, chatIcon, mapPin, smallStar } from '../../components/icons'
import { addRemoveProfileToFavourite, getfavProviderListAction } from '../../redux/action'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import styles from './styles'

const FavouriteProvider = ({ navigation }) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { AVAILABLE, BOOK_NOW, APPLY, DISTANCE, PRICE, SERVICE, CITY } = state['localeReducer']['locale'];
    const { loading, searchloading } = state['loaderReducer'];
    const [data, setdata] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false)
    const [footerIndicator, setFooterIndicator] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const pagination = useRef(1)
    const callNextRecordStatus = useRef(true);
    const isCallNextApi = useRef(false);
    const selectedIdRef = useRef([])

    useFocusEffect(
        useCallback(() => {
            setFetching(true)
            pagination.current = 1
            _fetchFavProviderList()
        }, [])
    )

    const _fetchFavProviderList = () => {
        const param = {
            page: pagination.current
        }
        dispatch(getfavProviderListAction(param, result => {
            console.log('result=>', result)
            if (result?.List) {
                if (pagination.current == 1) {
                    setdata(result?.List)
                }
                else {
                    setdata(prevState => ([...prevState, ...result?.List]))
                }
                if (!result?.List?.length) {
                    isCallNextApi.current = false
                }
                else {
                    isCallNextApi.current = true
                }
            }
            else {
                isCallNextApi.current = false;
            }
            callNextRecordStatus.current = true;
            _closeAllIndicator()
        }))
    }

    const _onPullToRefresh = () => {
        pagination.current = 1
        setPullToRefreshIndicator(true)
        _fetchFavProviderList()
    }

    const _onEndReached = () => {
        if (isCallNextApi.current && callNextRecordStatus.current) {
            setFooterIndicator(true)
            callNextRecordStatus.current = false;
            pagination.current++;
            _fetchFavProviderList()
        }
    };

    const _closeAllIndicator = () => {
        setFetching(false)
        setPullToRefreshIndicator(false)
        setFooterIndicator(false)
    }

    const removeFromFav = (item, index) => () => {
        setRefresh(true)
        const indexFound = selectedIdRef.current.findIndex(each => each == item.UserId)
        if (indexFound < 0) selectedIdRef.current.push(item.UserId)
        const param = {
            ProviderId: item.UserId,
            IsFavorite: false
        }
        console.log('prams==>', param)
        // return
        dispatch(addRemoveProfileToFavourite(param, result => {
            console.log('result=>', result)
            if (result) {
                const foundIndex = selectedIdRef.current.findIndex(each => each == item.UserId)
                selectedIdRef.current.splice(foundIndex, 1)
                data.splice(index, 1)
                setRefresh(false)
            }
        }))
    }

    const _keyExtractor = (item, index) => item + index;

    const _seperator = () => <MyView style={styles['seperator']} />;

    const footerRender = () => {
        if (footerIndicator) return <MyIndicator verticalSpace />;
        else return <MyView />;
    }

    const _renderEmpty = () => {
        if (!loading) {
            return (
                <EmptyMessage
                    style={{ marginVertical: SCREEN_HEIGHT * 0.3 }}
                    message={'No Provider Found.'}
                />
            );
        } else return <EmptyMessage message={''} />;
    };

    const _renderItem = ({ item, index }) => {
        return (
            <Touchable
                onPress={() =>
                    navigation.navigate('spDetail', { id: item['UserId'] })
                }
                style={styles['header']}>
                <MyImage
                    source={{ uri: item['ProfilePic'] }}
                    style={styles['imageStyle']}
                />
                <MyView style={{ flex: 1 }}>
                    <MyView style={styles['rowName']}>
                        <MyView
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '90%',
                            }}>
                            <MyText
                                style={styles['nameStyle']}>{`${item['Name']} | `}</MyText>
                            <MyText
                                style={[styles['nameStyle'], { fontSize: getFontSize(12) }]}>
                                {item['Username']}
                            </MyText>
                        </MyView>

                        <MyText
                            style={[styles['priceStyle']]}>{`$ ${item['Price'] || 0}`}</MyText>
                    </MyView>
                    <MyView
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: dynamicSize(3),
                        }}>
                        <TouchableIcon source={mapPin} />
                        <MyText style={styles['address']}>
                            {item['CityCode'] + item['CityName']}
                        </MyText>
                    </MyView>

                    <MyView
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: dynamicSize(5),
                        }}>
                        <TouchableIcon
                            source={chatIcon}
                            onPress={() =>
                                navigation.navigate('chat', {
                                    id: item['UserId'],
                                    type: 'provider',
                                })
                            }
                        />
                        <MyText style={styles['available']}>
                            {item?.IsAvailabile ? AVAILABLE : 'Unavailable'}
                        </MyText>
                        <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MyImage source={smallStar} />
                            <MyText style={styles['starCount']}>{`${JSON.stringify(
                                item.UserRating,
                            )}/5`}</MyText>
                        </MyView>
                        <MyView style={{ flex: 1 }} />
                        {selectedIdRef.current.includes(item.UserId) ? <MyIndicator />
                            :
                            <TouchableIcon
                                disabled={selectedIdRef.current.includes(item.UserId)}
                                onPress={removeFromFav(item, index)}
                                source={activeFavHeartIcon}
                            />
                        }
                    </MyView>
                </MyView>
            </Touchable>
        );
    };

    return (
        <SafeArea
            style={{
                paddingTop: -useSafeAreaInsets().top,
                paddingBottom: -useSafeAreaInsets().bottom,
                backgroundColor: LIGHT_WHITE,
            }}>
            <MyView style={{ flex: 1, alignItems: 'center', width: SCREEN_WIDTH }}>
                {fetching && <MyIndicator verticalSpace />}
                <FlatList
                    key="providerList"
                    keyExtractor={_keyExtractor}
                    ItemSeparatorComponent={_seperator}
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={pullToRefreshIndicator}
                            tintColor={THEME}
                            onRefresh={_onPullToRefresh}
                        />
                    }
                    ListEmptyComponent={_renderEmpty}
                    renderItem={_renderItem}
                    onEndReachedThreshold={0.7}
                    onEndReached={_onEndReached}
                    ListFooterComponent={footerRender}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles['flatList']}
                />
            </MyView>
        </SafeArea>
    )
}

export default FavouriteProvider