import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeArea,
  MyView,
  SearchInput,
  QuestionsView,
  Loader,
  EmptyMessage,
  Touchable,
  MyText,
  MyIndicator,
  TouchableIcon,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, FlatList, RefreshControl } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import {
  deleteQuestionAction,
  getAllQuestionAction,
  getNotificationCountSuccessAction,
  getNotificationListAction,
  getQuestionByQuestionIdAction,
  likeDislikeQuestionAction,
  loaderAction,
  SearchloaderAction,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDate,
  isCustomer,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/helper';
import commonStyle from '../../components/commonStyle';
import { dynamicSize } from '../../utils/responsive';
import { THEME } from '../../utils/colors';

const TAB_TYPE = { FEED: 'feed', NOTIFICATIONS: 'notifications' };

// SHop talk list UI design
const ForumList = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { locale } = state.localeReducer;
  const {
    allquestion,
    providerprofile,
    profile,
    notificationCount,
    commonquestion,
  } = state['profileReducer'];
  const { loading, searchloading } = state['loaderReducer'];

  const callNextRecordStatus = useRef(true);
  const isCallNextApi = useRef(true);

  const feedPaginationOffset = useRef(1);
  const fetchingFeedList = useRef(false);
  const feedPullToRefreshIndicator = useRef(false);
  const feedFooterIndicator = useRef(false);

  const notiPaginationOffset = useRef(1);
  const fetchingNotificationList = useRef(false);
  const notiPullToRefreshIndicator = useRef(false);
  const notificationFooterIndicator = useRef(false);

  const [search, setsearch] = useState('');
  const [selectedTab, setSelectedTab] = useState(TAB_TYPE.FEED);
  const [refreshState, setRefreshState] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [allFeeds, setAllFeeds] = useState([]);
  const [isNotificationDataFound, setIsNotificationFound] = useState(true);
  const [selectedNotificationQuesId, setSelectedNotificationQuesId] = useState(
    null,
  );

  console.log('allquestion==>', allquestion);

  useFocusEffect(
    useCallback(() => {
      _getNotificationList();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedTab == TAB_TYPE.FEED) {
        feedPaginationOffset.current = 1;
        fetchingFeedList.current = true;
        _fetchFeed();
      }
    }, [search]),
  );

  const _getNotificationList = () => {
    if (selectedTab == TAB_TYPE.NOTIFICATIONS) {
      notiPaginationOffset.current = 1;
      fetchingNotificationList.current = true;
      _fetchNotification();
    }
  };

  const _fetchFeed = () => {
    setRefreshState(true);
    dispatch(
      getAllQuestionAction(search, (data) => {
        console.log('all Questions ==>', data);
        if (data) {
          if (notiPaginationOffset.current == 1) {
            setAllFeeds([...data]);
          } else {
            setAllFeeds([...allFeeds, ...data]);
          }
        } else {
          isCallNextApi.current = false;
        }
        fetchingFeedList.current = false;
        feedPullToRefreshIndicator.current = false;
        feedFooterIndicator.current = false;
        callNextRecordStatus.current = true;
        setRefreshState(false);
      }),
    );
  };

  const _fetchNotification = () => {
    setRefreshState(true);
    dispatch(
      getNotificationListAction(notiPaginationOffset.current, (data) => {
        if (notiPaginationOffset.current == 1) {
          fetchingNotificationList.current = false;
          notiPullToRefreshIndicator.current = false;
          setNotificationList(data);
        } else {
          notificationFooterIndicator.current = false;
          if (data?.length) setNotificationList([...notificationList, ...data]);
        }
        if (!data?.length) setIsNotificationFound(false);
        setRefreshState(false);
      }),
    );
  };

  const _navToComment = (data) => () => {
    if (selectedTab == TAB_TYPE.FEED)
      navigation.navigate('forumDetailComment', data);
    else {
      setSelectedNotificationQuesId(data.Id);
      dispatch(
        getQuestionByQuestionIdAction(data?.QuestionId, (result) => {
          setSelectedNotificationQuesId(null);
          if (result) navigation.navigate('forumDetailComment', result?.[0])
        }),
      );
    }
  };

  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  const _renderEmpty = () => {
    if (!loading) {
      return (
        <EmptyMessage
          style={{ marginVertical: SCREEN_HEIGHT * 0.3 }}
          message={'No Question Found.'}
        />
      );
    } else return <EmptyMessage message={''} />;
  };

  const _renderEmptyNotification = () => {
    if (!fetchingNotificationList.current)
      return (
        <EmptyMessage
          style={{ marginVertical: SCREEN_HEIGHT * 0.3 }}
          message={'No notifications found.'}
        />
      );
    else return <EmptyMessage message={''} />;
  };

  const footerRender = () => {
    if (feedFooterIndicator.current) return <MyIndicator verticalSpace />;
    else return <MyView />;
  };

  const _renderQuestions = ({ item, index }) => {
    const user = isCustomer() ? profile['UserId'] : providerprofile['UserId'];
    return (
      <QuestionsView
        onPicPress={() =>
          item['UserType'] === 3
            ? navigation.navigate('customerDetail', {
              id: item['User']['UserId'],
            })
            : navigation.navigate('spDetail', { id: item['User']['UserId'] })
        }
        source={{ uri: item?.User?.['ProfilePic'] }}
        question={item?.['QuestionText'] ? item['QuestionText'] : 'LOADING'}
        date={item?.['CreatedOnStr'] ? item['CreatedOnStr'] : 'LOADING'}
        name={item?.['UserName'] ? item['UserName'] : 'LOADING'}
        replyCount={
          item?.['CommentsCount']
            ? item['CommentsCount']
            : item['CommentsCount']
        }
        onReplyPress={_navToComment(item)}
        showDelete={item?.User?.UserId == user}
        onDeletePress={() => deleteQuestion(item?.QuestionId, index)}
        isLiked={item?.LikebyMe}
        onLikePress={() => likeDislikePost(item, index)}
        likeCount={item?.LikeCount}
        onEditPress={() => _editPost(item)}
      />
    );
  };

  const _navToDetail = (item) => () => {
    item['SenderUserType'] === 3
      ? navigation.navigate('customerDetail', { id: item.MsgFrom })
      : navigation.navigate('spDetail', { id: item.MsgFrom });
  };

  const _getSubMessage = (item) => {
    if (item.NotificationType == 25) return 'liked your ';
    if (item.NotificationType == 26) return 'liked your ';
    if (item.NotificationType == 27) return 'commented on ';
    if (item.NotificationType == 28) return 'mention you in a ';
  };

  const _renderNotificationType = (item) => {
    const quesionInd = commonquestion.findIndex(
      (p) => p?.QuestionId == item?.QuestionId,
    );
    const questionObj = quesionInd > -1 ? commonquestion[quesionInd] : null;
    return (
      <MyText style={[{ flex: 1, paddingHorizontal: dynamicSize(15) }]}>
        <MyText
          //onPress={_navToDetail(item)}
          style={[
            styles.bold,
            styles.notiFontSize,
          ]}>{`@${item.SenderUserName} `}</MyText>
        <MyText style={styles.notiFontSize}>{_getSubMessage(item)}</MyText>
        {(item.NotificationType == 28 || item.NotificationType == 26) && (
          <MyText
            //onPress={_navToComment(item)}
            // onPress={() =>
            //   questionObj && questionObj !== null
            //     ? navigation.navigate('forumDetailComment', questionObj)
            //     : null
            // }
            style={[styles.decoration, styles.notiFontSize]}>
            comment
          </MyText>
        )}
        {(item.NotificationType == 25 || item.NotificationType == 27) && (
          <MyText
            //onPress={_navToComment(item)}
            // onPress={() =>
            //   questionObj && questionObj !== null
            //     ? navigation.navigate('forumDetailComment', questionObj)
            //     : null
            // }
            style={[styles.decoration, styles.notiFontSize]}>
            question
          </MyText>
        )}
        {/* {(item.NotificationType == 28 || item.NotificationType == 26) && <MyText onPress={_navToComment(item?.QuestionId)} style={[styles.decoration, styles.notiFontSize]}>comment</MyText>}
                {(item.NotificationType == 25 || item.NotificationType == 27) && <MyText onPress={_navToComment(item?.QuestionId)} style={[styles.decoration, styles.notiFontSize]}>question</MyText>} */}
      </MyText>
    );
  };

  const _renderNotification = ({ item, index }) => {
    console.log('item.CreatedOn=>?',item.CreatedOn)
    return (
      <Touchable onPress={_navToComment(item)} style={styles.notiItem}>
        <TouchableIcon
          onPress={_navToComment(item)}
          //onPress={_navToDetail(item)}
          source={{ uri: item.SenderProfile }}
          imageStyle={styles.notiImage}
          style={[
            styles.notiContainer,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
          indicator={selectedNotificationQuesId == item.Id}
        />
        {_renderNotificationType(item)}
        <MyText>{getDate(item.CreatedOn)}</MyText>
      </Touchable>
    );
  };

  const _search = (value) => setsearch(value);

  const likeDislikePost = (item, index) => {
    const param = {
      QuestionId: item.QuestionId,
      Status: item.LikebyMe ? 0 : 1,
    };
    dispatch(
      likeDislikeQuestionAction(param, (data) => {
        if (data) {
          if (!item.LikebyMe) {
            allFeeds[index].LikeCount = item.LikeCount + 1;
          } else if (item.LikebyMe) {
            if (item.LikeCount >= 1) {
              allFeeds[index].LikeCount = item.LikeCount - 1;
            } else {
              allFeeds[index].LikeCount = 0;
            }
          }
          allFeeds[index].LikebyMe = !item.LikebyMe;
          setRefreshState(!refreshState);
        }
      }),
    );
  };

  const deleteQuestion = (id, index) => {
    Alert.alert('Delete Question', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          dispatch(
            deleteQuestionAction(id, () => {
              allFeeds.splice(index, 1);
              setRefreshState((prevState) => !prevState);
            }),
          ),
      },
    ]);
  };

  const _editPost = (item) => {
    navigation.navigate('editQuestion', { item });
  };

  const _selctTab = (type) => () => {
    setSelectedTab(type);
    if (type == TAB_TYPE.FEED) {
      feedPaginationOffset.current = 1;
      fetchingFeedList.current = true;
      _fetchFeed();
    } else if (type == TAB_TYPE.NOTIFICATIONS) {
      notificationCount ? dispatch(getNotificationCountSuccessAction(0)) : null;
      notiPaginationOffset.current = 1;
      fetchingNotificationList.current = true;
      _fetchNotification();
    }
  };

  const _onPullToRefresh = (type) => () => {
    if (type == TAB_TYPE.FEED) {
      feedPaginationOffset.current = 1;
      feedPullToRefreshIndicator.current = true;
      _fetchFeed();
    } else if (type == TAB_TYPE.NOTIFICATIONS) {
      notiPaginationOffset.current = 1;
      notiPullToRefreshIndicator.current = true;
      _fetchNotification();
    }
  };

  const _onEndReach = () => {
    if (selectedTab == TAB_TYPE.NOTIFICATIONS) {
      notiPaginationOffset.current++;
      notificationFooterIndicator.current = true;
      _fetchNotification();
    }
  };

  const _onEndReachedFeeds = () => {
    if (isCallNextApi.current && callNextRecordStatus.current) {
      callNextRecordStatus.current = false;
      feedPaginationOffset.current++;
      feedFooterIndicator.current = true;
      _fetchFeed();
    }
  };

  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        paddingBottom: -useSafeAreaInsets().bottom,
      }}>
      <MyView style={{ flex: 1, alignItems: 'center', width: SCREEN_WIDTH }}>
        <Loader isVisible={loading} />
        <MyView style={[commonStyle['outerCurver'], { height: undefined }]}>
          <MyView
            style={[
              commonStyle['innerCurve'],
              { height: undefined, paddingVertical: dynamicSize(10) },
            ]}>
            <MyView style={styles.tabContaiber}>
              <Touchable
                activeOpacity={1}
                onPress={_selctTab(TAB_TYPE.FEED)}
                style={[
                  styles.upperTab,
                  selectedTab == TAB_TYPE.FEED
                    ? styles.selectedTabContainer
                    : styles.unSelectedtacContainer,
                ]}>
                <MyText
                  style={
                    selectedTab == TAB_TYPE.FEED
                      ? styles.selectedTabText
                      : styles.unselectedTabText
                  }>
                  {locale.FEED}
                </MyText>
              </Touchable>
              <Touchable
                activeOpacity={1}
                onPress={_selctTab(TAB_TYPE.NOTIFICATIONS)}
                style={[
                  styles.upperTab,
                  selectedTab == TAB_TYPE.NOTIFICATIONS
                    ? styles.selectedTabContainer
                    : styles.unSelectedtacContainer,
                ]}>
                <MyText
                  style={
                    selectedTab == TAB_TYPE.NOTIFICATIONS
                      ? styles.selectedTabText
                      : styles.unselectedTabText
                  }>
                  {locale.NOTIFICATIONS}
                </MyText>
              </Touchable>
            </MyView>
          </MyView>
        </MyView>
        {fetchingNotificationList.current ? (
          <MyIndicator verticalSpace />
        ) : null}
        {selectedTab == TAB_TYPE.FEED ? (
          <>
            <SearchInput
              style={{ marginTop: dynamicSize(10) }}
              value={search}
              onChangeText={(value) => _search(value)}
            />
            {fetchingFeedList.current ? <MyIndicator verticalSpace /> : null}
            <FlatList
              data={allFeeds}
              ListEmptyComponent={_renderEmpty}
              renderItem={_renderQuestions}
              contentContainerStyle={styles['flatList']}
              ItemSeparatorComponent={_renderSeperator}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => String(index)}
              refreshControl={
                <RefreshControl
                  refreshing={feedPullToRefreshIndicator.current}
                  tintColor={THEME}
                  onRefresh={_onPullToRefresh(TAB_TYPE.FEED)}
                />
              }
              maxToRenderPerBatch={8}
              onEndReachedThreshold={0.7}
              ListFooterComponent={footerRender}
              onEndReached={_onEndReachedFeeds}
            />
          </>
        ) : (
          <FlatList
            data={notificationList}
            ListEmptyComponent={_renderEmptyNotification}
            renderItem={_renderNotification}
            contentContainerStyle={styles['notiList']}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            refreshControl={
              <RefreshControl
                refreshing={notiPullToRefreshIndicator.current}
                tintColor={THEME}
                onRefresh={_onPullToRefresh(TAB_TYPE.NOTIFICATIONS)}
              />
            }
          />
        )}
        {console.log('notificationList====>', notificationList)}
      </MyView>
      {notificationFooterIndicator.current ? (
        <MyIndicator verticalSpace />
      ) : null}
      {selectedTab == TAB_TYPE.NOTIFICATIONS &&
        notificationList.length &&
        isNotificationDataFound &&
        !notificationFooterIndicator.current ? (
        <MyText onPress={_onEndReach} style={styles.viewMore}>
          {locale.VIEW_MORE}
        </MyText>
      ) : null}
    </SafeArea>
  );
};

export default ForumList;
