import React, { useRef, useState, useEffect } from 'react'
import { SafeArea, MyView, MyText, MyImage, CurveView, TouchableIcon, EmptyMessage } from '../../components/customComponent'
import { KeyboardAvoidingView, TextInput, FlatList } from 'react-native'
import { WHITE, THEME } from '../../utils/colors'
import AndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { sendIcon } from '../../components/icons'
import { isIOS, SCREEN_WIDTH, isAndroid, isCustomer, SCREEN_HEIGHT, convertToLocal } from '../../components/helper'
import styles from './styles'
import { dynamicSize } from '../../utils/responsive'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/header'
import "./UserAgent"
import { loaderAction, chatRoomAction, saveChatAction, getChatMessagesAction, clearMessageCase, markNotificationAsReadAction, getProviderProfileSuccessAction } from '../../redux/action';
import { socket } from '../../services'
import { GET_CHAT_MESSAGE_SUCCESS_ACTION } from '../../redux/action/type'
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';

let timeout
// @ Render Chat UI
const Chat = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { profile, providerprofile, room, messagesHistory, messageCase } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const { WRITE_A_MESSAGE, CHAT } = state['localeReducer']['locale']
    const [history, setChatHistory] = useState([])
    const [chatMessage, setchatMessage] = useState('')

    const flatListref = useRef('flatListref')
    const pageRef = useRef(1)
    const callApi = useRef(false)

    socket.on(room['RoomName'], data => {
        setChatHistory([...history, JSON.parse(data)])
    })

    // Join chat room and clear unread messages
    useEffect(() => {
        dispatch(markNotificationAsReadAction())
        isAndroid && AndroidKeyboardAdjust.setAdjustResize()
        const param = {
            "MsgTo": route.params.id
        }
        dispatch(loaderAction(true))
        dispatch(chatRoomAction(param, (response) => {
            console.log("response====>@@@", JSON.stringify(response?.result?.Data))
            if (response?.status == 201 && response?.result?.Data?.length) {
                console.log("response?.result?.data====>@@", response?.result?.Data)
                callApi.current = true
                setChatHistory(response?.result?.Data)
                if (timeout) clearTimeout(timeout)
                timeout = setTimeout(() => {
                    timeout = null
                    flatListref?.current?.scrollToEnd({ animated: true })
                }, 600)
            }
            else {
                callApi.current = true
                setChatHistory([])
            }
        }))
    }, [])

    //@ Chat messages data mapping 
    // useEffect(() => {
    //     if (messageCase === GET_CHAT_MESSAGE_SUCCESS_ACTION) {
    //         page === 2 ? setChatHistory(messagesHistory) : setChatHistory([...messagesHistory, ...history])
    //         dispatch(clearMessageCase())
    //     }
    // }, [messageCase])

    // @ Loadmore chat messages 


    const onContentOffsetChanged = event => {
        loadmore(event.nativeEvent.contentOffset.y)
    }

    const loadmore = async (distanceFromTop) => {
        if (distanceFromTop ==0) {
            if (callApi.current) {
                callApi.current = false
                const param = {
                    "RoomId": room['RoomId'],
                    "pageNo": pageRef.current + 1,
                    "pageSize": 20
                }
                dispatch(getChatMessagesAction(param, (response) => {
                    console.log('response=>@@@@@@@', response)
                    if (response?.status == 201 && response?.result?.Data?.length) {
                        console.log("response?.result?.data====>@@", response?.result?.Data)
                        pageRef.current += pageRef.current
                        callApi.current = true
                        setChatHistory(prevState => ([...response?.result?.Data, ...prevState]))
                    }
                    else {
                        callApi.current = true
                    }
                }))
            }
        }
    }

    const navigateToOwnProfile = item => () => {
        if (isCustomer()) {
            navigation.navigate('customerDetail', { id: profile['UserId'] })
        }
        else {
            dispatch(getProviderProfileSuccessAction({}))
            navigation.navigate('spDetail', { id: providerprofile['UserId'] })
        }
    }

    const navigateToOtherProfile = item => () => {
        if (isCustomer()) {
            dispatch(getProviderProfileSuccessAction({}))
            navigation.navigate('spDetail', { id: route.params.id })
        }
        else {
            navigation.navigate('customerDetail', { id: route.params.id })
        }
    }

    //message={`You are yet to chat with this ${route?.params?.type == 'provider' ? 'service provider' : 'user'}`}
    // @ Render blank chat messages
    const _renderEmptyChat = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.37 }} message={`You have not chat with this user yet`} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    const _renderTruncatedFooter = isSender => (handlePress) => {
        return (
            <MyText style={[{ fontWeight: 'bold', marginTop: 5 }, isSender ? styles['leftMsg'] : styles['rightMsg']]} onPress={handlePress}>
                Read more
            </MyText>
        );
    }

    const _renderRevealedFooter = isSender => (handlePress) => {
        return (
            <MyText style={[{ fontWeight: 'bold', marginTop: 5 }, isSender ? styles['leftMsg'] : styles['rightMsg']]} onPress={handlePress}>
                Show less
            </MyText>
        );
    }

    // @ Render chat messages
    const _renderChat = ({ item, index }) => {
        const isSender = item['MsgFrom'] != (isCustomer() ? profile['UserId'] : providerprofile['UserId'])
        return (
            <MyView key={item + index} style={[styles['itemContainer'], isSender ? styles['leftItemContainer'] : styles['rightItemContainer']]}>
                {!isSender ?
                    <MyView style={{ flexDirection: "row" }}>
                        <MyView style={[styles['chatWrapper'], styles['rightChatWrapper']]}>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={_renderTruncatedFooter(isSender)}
                                renderRevealedFooter={_renderRevealedFooter(isSender)}
                            >
                                <MyText style={[styles['msgText'], isSender ? styles['leftMsg'] : styles['rightMsg']]} >{item['Message']}</MyText>
                            </ReadMore>
                            <MyText style={styles['rightMsgTime']}>{moment(convertToLocal(item.CreatedOn)).format('MMM Do, YYYY, hh:mm:ss A')}</MyText>
                        </MyView>
                        <TouchableIcon onPress={navigateToOwnProfile(item)} source={{ uri: item['myPic'] || item['UFProfilePic'] }} imageStyle={styles['imageStyle']} />
                    </MyView>
                    :
                    <MyView style={{ flexDirection: "row" }}>
                        <TouchableIcon onPress={navigateToOtherProfile(item)} source={{ uri: item['myPic'] || item['UFProfilePic'] }} imageStyle={styles['imageStyle']} />
                        <MyView style={[styles['chatWrapper'], isSender ? styles['leftChatWraper'] : styles['rightChatWrapper']]}>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={_renderTruncatedFooter(isSender)}
                                renderRevealedFooter={_renderRevealedFooter(isSender)}
                            >
                                <MyText style={[styles['msgText'], isSender ? styles['leftMsg'] : styles['rightMsg']]} >{item['Message']}</MyText>
                            </ReadMore>
                            <MyText style={styles['leftMsgTime']}>{moment(convertToLocal(item.CreatedOn)).format('MMM Do, YYYY, hh:mm:ss A')}</MyText>
                        </MyView>
                    </MyView>
                }
            </MyView>
        )
    }

    // @ Send messages
    const submitChatMessage = () => {
        if (chatMessage.trim().length) {
            const messageObj = {
                Message: chatMessage,
                RoomName: room['RoomName'],
                MsgFrom: isCustomer() ? profile['UserId'] : providerprofile['UserId'],
                myPic: isCustomer() ? profile['ProfilePic'] : providerprofile['ProfilePic'],
                CreatedOn: moment().format('YYYY-MM-DDTHH:mm:ssZ')
            }
            socket.emit('room', JSON.stringify(messageObj))
            setChatHistory([...history, messageObj])
            setchatMessage('')
            const param = {
                "RoomId": room['RoomId'],
                "MsgTo": room['MsgTo'],
                "Message": chatMessage
            }
            dispatch(saveChatAction(param))
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                timeout = null
                flatListref.current.scrollToEnd({ animated: true })
            }, 500);
        }

    }

    return (
        <SafeArea style={{ backgroundColor: WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['mainContainer']}>
                <Header isTheme isBack navigation={navigation} title={CHAT} />
                <CurveView />
                <KeyboardAvoidingView
                    behavior={isIOS ? 'padding' : null}
                    enabled
                    style={{ flex: 1 }}
                >
                    <FlatList
                        ref={flatListref}
                        data={history}
                        ListEmptyComponent={_renderEmptyChat}
                        renderItem={_renderChat}
                        keyboardDismissMode='none'
                        // onContentSizeChange={() => flatListref?.current?.scrollToEnd({ animated: true })}
                        onLayout={() => flatListref.current.scrollToEnd({ animated: true })}
                        contentContainerStyle={{ paddingBottom: dynamicSize(10), width: SCREEN_WIDTH, paddingHorizontal: dynamicSize(10) }}
                        onEndReachedThreshold={0}
                        onScroll={onContentOffsetChanged}
                        // onMomentumScrollBegin={loadmore}
                        keyExtractor={(item, index) => index}
                    />
                    <MyView style={styles['textContainer']}>
                        <TextInput
                            value={chatMessage}
                            placeholder={WRITE_A_MESSAGE}
                            style={styles['textinput']}
                            autoCorrect={false}
                            multiline
                            // onSubmitEditing={() => submitChatMessage()}
                            onChangeText={(message) => setchatMessage(message)}
                        />
                        <TouchableIcon onPress={submitChatMessage} source={sendIcon} imageStyle={{ width: dynamicSize(20), height: dynamicSize(20) }} style={{ width: dynamicSize(40), height: dynamicSize(40), alignItems: 'center', justifyContent: 'center' }} />
                    </MyView>
                </KeyboardAvoidingView>
            </MyView>
        </SafeArea>
    )
}

export default Chat