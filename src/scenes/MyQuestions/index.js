import React, {useEffect} from 'react';
import {
  SafeArea,
  MyView,
  CurveView,
  MyText,
  QuestionsView,
  Loader,
} from '../../components/customComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import styles from './styles';
import {commonQuestionAction, loaderAction} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';

// MyQuestions UI rendring
const MyQuestions = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const {loading} = state['loaderReducer'];
  const {commonquestion} = state['profileReducer'];

  // fetching common questions list
  useEffect(() => {
    dispatch(loaderAction(true));
    dispatch(commonQuestionAction());
  }, []);

  const _navToComment = (item) => () =>
    navigation.navigate('forumDetailComment', item);

  // Each question list UI
  const _renderQuestions = ({item, index}) => {
    return (
      <QuestionsView
        source={{uri: item['User']['ProfilePic']}}
        question={item['QuestionText']}
        date={item['CreatedOnStr']}
        name={item['UserName']}
        replyCount={item['CommentsCount'] == null ? 0 : item['CommentsCount']}
        onReplyPress={_navToComment(item)}
      />
    );
  };

  const _renderSeperator = () => <MyView style={styles['seperator']} />;

  return (
    <SafeArea style={{paddingTop: -useSafeAreaInsets().top}}>
      <Loader isVisible={loading} />
      <MyView style={{flex: 1, alignItems: 'center'}}>
        <CurveView />
        {commonquestion.length != 0 ? (
          <FlatList
            key="quesions"
            data={commonquestion}
            renderItem={_renderQuestions}
            contentContainerStyle={styles['flatList']}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={_renderSeperator}
          />
        ) : (
          <MyText style={styles['noquestion']}>
            {loading ? '' : 'No question added till now'}
          </MyText>
        )}
      </MyView>
    </SafeArea>
  );
};

export default MyQuestions;
