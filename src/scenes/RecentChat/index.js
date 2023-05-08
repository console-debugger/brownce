import React, { useCallback } from 'react';
import {
  SafeArea,
  CurveView,
  MyView,
  MyImage,
  MyText,
  Touchable,
  Loader,
  EmptyMessage,
} from '../../components/customComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import styles from './styles';
import { dynamicSize } from '../../utils/responsive';
import { LIGHT_WHITE, THEME } from '../../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import {
  loaderAction,
  getChatListAction,
  markNotificationAsReadAction,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { isCustomer, logAnalyticEvent, SCREEN_HEIGHT } from '../../components/helper';
import { CUSTOMER_CHAT, PROVIDER_CHAT } from '../../components/eventName';

// Recent Chat UI
const RecentChat = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { providerprofile, profile } = state['profileReducer']
  const { chatList } = state['profileReducer'];
  const { loading } = state['loaderReducer'];

  useFocusEffect(
    useCallback(() => {
      dispatch(loaderAction(true));
      dispatch(getChatListAction());
      dispatch(markNotificationAsReadAction());
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (providerprofile?.UserId) {
        const data = {
          id: providerprofile?.UserId,
          name: providerprofile?.FirstName || '',
          username: providerprofile?.Username || ''
        }
        logAnalyticEvent(PROVIDER_CHAT, data)
      }
    }, [providerprofile])
  )

  useFocusEffect(
    useCallback(() => {
      if (profile?.UserId) {
        const data = {
          id: profile?.UserId,
          name: profile?.Name || '',
          username: profile?.Username || ''
        }
        logAnalyticEvent(CUSTOMER_CHAT, data)
      }
    }, [profile])
  )

  const _keyExtractor = (item, index) => item + index;

  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  const _renderEmptyChat = () => {
    if (!loading) {
      return (
        <EmptyMessage
          style={{ marginVertical: SCREEN_HEIGHT * 0.32 }}
          message={'No recent chats.'}
        />
      );
    } else return <EmptyMessage message={''} />;
  };

  const _renderItem = ({ item, index }) => {
    console.log('item || => ', item);
    return (
      <Touchable
        onPress={() =>
          navigation.navigate('chat', {
            id: item['UserId'],
            type: item['UserType'] === 3 ? 'customer' : 'provider',
          })
        }
        style={styles['chatContainer']}>
        <Touchable
          onPress={() =>
            isCustomer()
              ? navigation.navigate('spDetail', { id: item['UserId'] })
              : navigation.navigate('customerDetail', { id: item['UserId'] })
          }>
          <MyImage
            source={{ uri: item['ProfilePic'] }}
            style={styles['imageStyle']}
          />
        </Touchable>
        <MyView style={styles['rightContainer']}>
          <MyView style={{ flex: 1, paddingHorizontal: dynamicSize(13) }}>
            <MyText style={styles['name']}>{item['UserName']}</MyText>
            <MyText style={styles['text']}>{item['Message']}</MyText>
          </MyView>
          <MyText style={styles['text']}>{item['CreatedOn']}</MyText>
        </MyView>
      </Touchable>
    );
  };

  return (
    <SafeArea
      style={{
        paddingTop: -useSafeAreaInsets().top,
        backgroundColor: THEME,
        paddingBottom: -useSafeAreaInsets().bottom,
      }}>
      <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
        <Loader isVisible={loading} />
        <CurveView />
        <FlatList
          key="recentChat"
          keyExtractor={_keyExtractor}
          data={chatList}
          renderItem={_renderItem}
          ListEmptyComponent={_renderEmptyChat}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={_renderSeperator}
          contentContainerStyle={{
            paddingBottom: dynamicSize(10),
            backgroundColor: LIGHT_WHITE,
          }}
        />
      </MyView>
    </SafeArea>
  );
};

export default RecentChat;
