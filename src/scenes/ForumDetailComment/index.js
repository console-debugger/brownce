import React, { useRef, useState, useEffect, useCallback } from 'react'
import { SafeArea, MyView, CurveView, MyImage, MyText, TouchableIcon, Touchable } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { sendIcon, like, likeBlack, deleteIcon } from '../../components/icons'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { isIOS, SCREEN_WIDTH, isCustomer, MyAlert, SCREEN_HEIGHT } from '../../components/helper'
import { KeyboardAvoidingView, Pressable, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { THEME, WHITE } from '../../utils/colors'
import Header from '../../components/header'
import { commentAction, getCommentsHistoryAction, deleteCommentAction, likeDislikeCommentAction, getSuggestionsAction, getSuggestionsSuccessAction, refreshDataAction } from '../../redux/action'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { montserratMedium } from '../../utils/fontFamily'
import { MentionInput, replaceMentionValues } from 'react-native-controlled-mentions'
import debounce from 'lodash.debounce';
import { ROLE_TYPES } from '../../utils/roleType'

// ShopTalk detail UI
const ForumDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const detail = route?.['params'] || {}
    const state = useSelector(state => { return state })
    const { WRITE_A_COMMENT, SHOP_TALK } = state['localeReducer']['locale']
    const { commenthistory, providerprofile, profile, suggestions } = state['profileReducer']
    const { refreshData } = state.loaderReducer
    const [comment, setComment] = useState('')
    const [reply, setReply] = useState('')
    const [repliesVisible, setRepliesVisible] = useState(null)
    const [keyword, setKeyword] = useState('')
    const flatListref = useRef('flatListref')

    useEffect(() => {
        const param = {
            "id": detail['QuestionId'],
            "pageNo": '1',
            "pageSize": '20000',
            "search": '',
            "contentType": '1'
        }
        dispatch(getCommentsHistoryAction(param))
    }, [])

    useEffect(() => {
        if (keyword !== "@" && keyword !== '') {
            const param = {
                "Search": keyword.trim()
            }
            dispatch(getSuggestionsAction(param))
        }
    }, [keyword])

    const _deleteComment = (item, index, eachIndex) => {
        MyAlert('DELETE', 'Are you sure you want to delete this comment', _delete(item, index, eachIndex))
    }

    const _delete = (item, index, eachIndex) => () => {
        const data = {
            QuestionCommentId: item.QuestionCommentId
        }
        dispatch(deleteCommentAction(data, (result) => {
            if (result) {
                if (typeof eachIndex == 'number') {
                    commenthistory[index].CommentReplies.splice(eachIndex, 1)
                }
                else {
                    commenthistory.splice(index, 1)
                }
                dispatch(refreshDataAction(!refreshData))
            }
        }))
    }

    const submitComment = (ParentCommentId, index) => {
        const MentionUserids = []
        replaceMentionValues(comment, ({ name, id }) => MentionUserids.push(id))

        const data = {
            "QuestionId": detail['QuestionId'],
        }

        if (ParentCommentId) {
            data['ParentCommentId'] = ParentCommentId
            data['CommentText'] = reply
        } else {
            data['CommentText'] = comment
        }

        if (MentionUserids.length) {
            data['MentionUserids'] = [...MentionUserids]
        }

        setComment('')
        setReply('')
        dispatch(commentAction(data, (result) => {
            if (ParentCommentId) {
                commenthistory[index].CommentReplies.push(result)
                dispatch(refreshDataAction(!refreshData))
            }
            else {
                commenthistory.push(result)
                dispatch(refreshDataAction(!refreshData))
                _scrollEnd()
            }

        }))
    }

    const likeDislikeComment = (item, index, eachItem, eachIndex) => {

        if (eachItem) {
            const data = {
                "CommentId": eachItem.QuestionCommentId,
                "Status": eachItem?.likebyMe ? 0 : 1
            }
            dispatch(likeDislikeCommentAction(data, (result) => {
                if (result) {
                    if (!eachItem.likebyMe) {
                        commenthistory[index].CommentReplies[eachIndex].LikeCount = eachItem.LikeCount + 1
                    }
                    else if (eachItem.likebyMe) {
                        if (eachItem.LikeCount >= 1) {
                            commenthistory[index].CommentReplies[eachIndex].LikeCount = eachItem.LikeCount - 1
                        }
                        else {
                            commenthistory[index].CommentReplies[eachIndex].LikeCount = 0
                        }
                    }
                    commenthistory[index].CommentReplies[eachIndex].likebyMe = !eachItem.likebyMe
                    dispatch(refreshDataAction(!refreshData))
                }
            }))
        }
        else {
            const data = {
                "CommentId": item?.QuestionCommentId,
                "Status": item?.likebyMe ? 0 : 1
            }

            dispatch(likeDislikeCommentAction(data, (result) => {
                if (result) {
                    if (!item.likebyMe) {
                        commenthistory[index].LikeCount = item.LikeCount + 1
                    }
                    else if (item.likebyMe) {
                        if (item.LikeCount >= 1) {
                            commenthistory[index].LikeCount = item.LikeCount - 1
                        }
                        else {
                            commenthistory[index].LikeCount = 0
                        }
                    }
                    commenthistory[index].likebyMe = !item.likebyMe
                    dispatch(refreshDataAction(!refreshData))
                }
            }))
        }
    }

    const _scrollEnd = () => {
        setTimeout(() => {
            flatListref.current.scrollToEnd({ animated: true })
        }, 500);
    }

    const _showHideReplies = (index) => {
        if (repliesVisible == null || repliesVisible !== index) {
            setRepliesVisible(index)
        } else {
            setRepliesVisible(null)
        }
    }


    const _renderComment = ({ item, index }) => {
        const user = isCustomer() ? profile['UserId'] : providerprofile['UserId']

        return (
            <MyView key={item + index} style={styles['itemContainer']}>
                <MyView style={{ flexDirection: 'row', maxWidth: '70%', }}>
                    <TouchableIcon source={{ uri: item['ProfilePic'] }} imageStyle={styles['imageStyle']} onPress={() => item.UserType == ROLE_TYPES.CUSTOMER ? navigation.navigate('customerDetail', { id: item['UserId'] }) : navigation.navigate('spDetail', { id: item['UserId'] })} />
                    <Touchable activeOpacity={profile.UserId == item.UserId ? 0.5 : 1} style={styles['chatWrapper']}>
                        <MentionInput
                            value={item['CommentText']}
                            onChange={() => { }}
                            style={{ ...styles.msgText, marginTop: 0, paddingTop: 0, lineHeight: dynamicSize(12), }}
                            editable={false}
                            partTypes={[
                                {
                                    trigger: '@',
                                    textStyle: { fontWeight: 'bold', color: THEME },
                                },
                            ]}
                        />
                    </Touchable>
                </MyView>
                <MyView style={{ flexDirection: 'row', justifyContent: 'space-between', width: '25%', alignItems: 'center', marginLeft: dynamicSize(45), marginTop: dynamicSize(10), }}>
                    <TouchableIcon
                        source={item?.likebyMe ? likeBlack : like}
                        style={{ height: dynamicSize(15), aspectRatio: 1 }}
                        imageStyle={{ height: '100%', width: '100%' }}
                        onPress={() => likeDislikeComment(item, index)}
                    />
                    <MyText style={{ fontFamily: montserratMedium, fontSize: getFontSize(14), marginHorizontal: dynamicSize(5), }} numberOfLines={1} >{item?.LikeCount || 0} </MyText>
                    {/* <TouchableIcon
                        source={item?.likebyMe?.Status == 0 ? dislikeBlack : dislike}
                        style={{ height: dynamicSize(15), aspectRatio: 1 }}
                        imageStyle={{ height: '100%', width: '100%' }}
                        onPress={() => likeDislikeComment(item?.QuestionCommentId, item?.likebyMe?.Status, "dislike")}
                    />
                    <MyText style={{ fontFamily: montserratMedium, fontSize: getFontSize(14), marginHorizontal: dynamicSize(5), }} numberOfLines={1} >{item?.DisLikeCount || 0} </MyText> */}
                    <MyText onPress={() => _showHideReplies(index)} style={{ fontFamily: montserratMedium, fontSize: getFontSize(12), marginHorizontal: dynamicSize(5), textDecorationLine: 'underline' }} numberOfLines={1} >{item?.CommentReplies?.length || 0} Replies</MyText>
                    {item?.UserId == user && <TouchableIcon
                        source={deleteIcon}
                        style={{ height: dynamicSize(15), aspectRatio: 1, marginLeft: dynamicSize(5) }}
                        imageStyle={{ height: '100%', width: '100%' }}
                        onPress={() => _deleteComment(item, index)}
                    />}
                </MyView>
                {repliesVisible == index && <MyView style={{ marginTop: dynamicSize(10), }}>
                    <MyView style={[styles['textContainer'], { width: '80%', marginLeft: dynamicSize(50), marginBottom: dynamicSize(10), }]}>
                        <MentionInput
                            value={reply}
                            onChange={setReply}
                            onFocus={() => flatListref.current.scrollToIndex({ animated: true, index: index })}
                            style={{ width: '90%' }}
                            containerStyle={[styles['textinput']]}
                            placeholder={'Write a reply...'}
                            partTypes={[
                                {
                                    trigger: '@',
                                    renderSuggestions: (props) => <RenderSuggestions {...props} reply />,
                                    textStyle: { fontWeight: 'bold', color: THEME },
                                },
                            ]}
                            onSubmitEditing={() => submitComment(item?.QuestionCommentId, index)}
                            autoCorrect={false}
                        />
                        <TouchableIcon
                            onPress={() => submitComment(item?.QuestionCommentId, index)}
                            source={sendIcon}
                            imageStyle={{ width: dynamicSize(20), height: dynamicSize(20) }}
                            style={{ width: dynamicSize(30), height: dynamicSize(30), alignItems: 'center', justifyContent: 'center' }}
                        />
                    </MyView>
                    {item?.CommentReplies?.map((itemm, eachIndex) => {
                        return (<MyView key={itemm + eachIndex} style={[styles['itemContainer'], { marginLeft: dynamicSize(50), maxWidth: '80%', }]}>
                            <MyView style={{ flexDirection: 'row', }}>
                                <TouchableIcon source={{ uri: itemm['ProfilePic'] }} imageStyle={styles['imageStyle']} onPress={() => item.UserType == 3 ? navigation.navigate('customerDetail', { id: item['UserId'] }) : navigation.navigate('spDetail', { id: itemm['UserId'] })} />
                                <Touchable activeOpacity={profile.UserId == itemm.UserId ? 0.5 : 1} style={styles['chatWrapper']}>
                                    <MentionInput
                                        value={itemm['CommentText']}
                                        onChange={() => { }}
                                        style={{ ...styles.msgText, marginTop: 0, paddingTop: 0, lineHeight: dynamicSize(12), }}
                                        editable={false}
                                        partTypes={[
                                            {
                                                trigger: '@',
                                                textStyle: { fontWeight: 'bold', color: THEME },
                                            },
                                        ]}
                                    />
                                </Touchable>
                            </MyView>
                            <MyView style={{ flexDirection: 'row', justifyContent: 'space-between', width: '20%', alignItems: 'center', marginLeft: dynamicSize(45), marginTop: dynamicSize(10), }}>
                                <TouchableIcon
                                    source={itemm?.likebyMe ? likeBlack : like}
                                    style={{ height: dynamicSize(15), aspectRatio: 1 }}
                                    imageStyle={{ height: '100%', width: '100%' }}
                                    onPress={() => likeDislikeComment(item, index, itemm, eachIndex)}
                                />
                                <MyText style={{ fontFamily: montserratMedium, fontSize: getFontSize(14), marginHorizontal: dynamicSize(5), }} numberOfLines={1} >{itemm?.LikeCount || 0} </MyText>
                                {/* <TouchableIcon
                                    source={itemm?.likebyMe?.Status == 0 ? dislikeBlack : dislike}
                                    style={{ height: dynamicSize(15), aspectRatio: 1 }}
                                    imageStyle={{ height: '100%', width: '100%' }}
                                    onPress={() => likeDislikeComment(itemm?.QuestionCommentId, itemm?.likebyMe?.Status, "dislike")}
                                />
                                <MyText style={{ fontFamily: montserratMedium, fontSize: getFontSize(14), marginHorizontal: dynamicSize(5), }} numberOfLines={1} >{itemm?.DisLikeCount || 0} </MyText> */}
                                {itemm?.UserId == user && <TouchableIcon
                                    source={deleteIcon}
                                    style={{ height: dynamicSize(15), aspectRatio: 1, marginLeft: dynamicSize(5) }}
                                    imageStyle={{ height: '100%', width: '100%' }}
                                    onPress={() => _deleteComment(item, index, eachIndex)}
                                />}
                            </MyView>
                        </MyView>)
                    })}
                </MyView>}
            </MyView>
        )
    }



    const RenderSuggestions = (props) => {
        if (props.keyword == null) {
            return null;
        }

        debouncedSearch(props.keyword)

        if (!suggestions.length) {
            return (
                <MyView>
                    <ActivityIndicator color={THEME} />
                </MyView>
            )
        }

        return (
            <MyView style={props.reply ? { maxHeight: SCREEN_HEIGHT / 5, } : { maxHeight: SCREEN_HEIGHT / 4, }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {suggestions
                        .filter(one => one?.UserName?.toLocaleLowerCase().includes(props.keyword.toLocaleLowerCase()))
                        .map(one => (
                            <Pressable
                                key={one.UserId}
                                onPress={() => { props.onSuggestionPress({ id: one.UserId, name: one.UserName }), dispatch(getSuggestionsSuccessAction([])) }}
                                style={{ padding: 12, borderBottomWidth: 0.5 }}
                            >
                                <MyText>{one?.UserName}</MyText>
                            </Pressable>
                        ))}
                </ScrollView>
            </MyView>
        );
    }

    const debouncedSearch = useCallback(
        debounce((keyword) => {
            setKeyword(keyword)
        }, 500),
        []
    );

    const _renderListHeader = () => {
        return (
            <>
                <Touchable
                    onPress={() => detail['UserType'] === 3 ? navigation.navigate('customerDetail', { id: detail['User']['UserId'] }) : navigation.navigate('spDetail', { id: detail['User']['UserId'] })}
                    style={styles['imageName']}>
                    <MyImage source={{ uri: detail['User']['ProfilePic'] }} style={styles['smallImage']} />
                    <MyText style={styles['name']}>{detail['UserName']}</MyText>
                </Touchable>
                <MyText style={styles['title']}>{detail?.['QuestionText']}</MyText>
                <MyView style={[styles['line'], { marginBottom: dynamicSize(10) }]} />
            </>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={{ flex: 1 }}>
                <Header isTheme isBack navigation={navigation} title={SHOP_TALK} />
                <CurveView />
                <KeyboardAvoidingView
                    behavior={isIOS ? 'padding' : null}
                    enabled
                    style={{ flex: 1 }}>

                    <FlatList
                        data={commenthistory}
                        ref={flatListref}
                        ListHeaderComponent={_renderListHeader}
                        renderItem={_renderComment}
                        // onContentSizeChange={_scrollEnd}
                        contentContainerStyle={{ paddingTop: dynamicSize(20), width: SCREEN_WIDTH, paddingHorizontal: dynamicSize(10) }}
                    />
                    <MyView style={styles['textContainer']}>
                        <MentionInput
                            value={comment}
                            onFocus={_scrollEnd}
                            onChange={setComment}
                            style={{ width: '90%' }}
                            containerStyle={[styles['textinput']]}
                            placeholder={WRITE_A_COMMENT}
                            partTypes={[
                                {
                                    trigger: '@',
                                    renderSuggestions: (props) => <RenderSuggestions {...props} />,
                                    textStyle: { fontWeight: 'bold', color: THEME },
                                },
                            ]}
                            onSubmitEditing={() => submitComment(null)}
                            autoCorrect={false}
                        />
                        <TouchableIcon
                            onPress={() => submitComment(null)}
                            source={sendIcon}
                            imageStyle={{ width: dynamicSize(20), height: dynamicSize(20) }}
                            style={{ width: dynamicSize(40), height: dynamicSize(40), alignItems: 'center', justifyContent: 'center' }}
                        />
                    </MyView>
                </KeyboardAvoidingView>
            </MyView>
        </SafeArea>
    )
}

export default ForumDetail