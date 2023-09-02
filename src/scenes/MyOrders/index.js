import React, {useEffect, useState} from 'react';
import {
  MyImage,
  MyText,
  MyView,
  SafeArea,
  Loader,
  EmptyMessage,
} from '../../components/customComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import styles from './style';
import {GRAY, WHITE} from '../../utils/colors';
import {montserratMedium} from '../../utils/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {cancelOrderAction, customerOrderAction} from '../../redux/action';
import {RemarkPopUp} from '../../components/alert';
import {CANCEL_ORDER_SUCCESS_ACTION} from '../../redux/action/type';
import {SCREEN_HEIGHT, convertToLocal} from '../../components/helper';
import moment from 'moment';

// Order List UI
const MyOrders = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const {List, messageCase} = state['OrderReducer']['customerorders'];
  const {loading} = state['loaderReducer'];
  const [modalVisible, setmodalVisible] = useState(false);
  const [remark, setremark] = useState('');
  const [orderId, setorderId] = useState('');

  // fetching order list
  useEffect(() => {
    const param = {
      Status: 0,
      PageNo: 1,
      RecordsPerPage: '600',
    };
    dispatch(customerOrderAction(param));
  }, []);

  // check for cancel order success
  useEffect(() => {
    if (messageCase === CANCEL_ORDER_SUCCESS_ACTION) {
      const param = {
        Status: 0,
        PageNo: 1,
        RecordsPerPage: '1000',
      };
      dispatch(customerOrderAction(param));
    }
  }, [messageCase]);

  const _seperator = () => {
    return <MyView style={{height: 10}}></MyView>;
  };

  const dateHandler = (dateItem) => {
    const dateTimeStamp = new Date(dateItem);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = dateTimeStamp.getDate();
    const currentMonth = months[dateTimeStamp.getMonth()];
    const year = dateTimeStamp.getFullYear();
    const fullDate = date + ' ' + currentMonth + ' ' + year;
    return fullDate;
  };

  // UI of blank list
  const _renderEmpty = () => {
    if (!loading) {
      return (
        <EmptyMessage
          style={{marginVertical: SCREEN_HEIGHT * 0.45}}
          message={'No orders yet.'}
        />
      );
    } else return <EmptyMessage message={''} />;
  };

  // cancel order api call
  const _submit = () => {
    setmodalVisible(false);
    const param = {
      OrderId: orderId,
      Remark: remark,
    };
    remark ? dispatch(cancelOrderAction(param)) : null;
  };

  const renderItem = ({item}) => {
    console.log('==>>>>', )
    return (
      <MyView activeOpacity={1} style={styles.cardView}>
        <MyView style={styles.topView}>
          <MyView style={styles.insideView}>
            <MyText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.id, {color: GRAY, fontFamily: montserratMedium}]}>
              {`${'Order Id: '}`}
              <MyText
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.id}>
                {item['Id']}
              </MyText>
            </MyText>
            <MyText style={styles.date}>{`${moment(convertToLocal(item['CreatedAt'])).format('MMM Do, YYYY')}`}</MyText>
          </MyView>
        </MyView>
        <MyView
          style={{flexDirection: 'row', marginTop: 10, marginHorizontal: 7}}>
          <MyImage
            source={{
              uri: item['ProductDetails']?.['ProductFiles']?.[0]?.['FilePath'],
            }}
            style={styles.thumbnail}
          />
          <MyView style={{flex: 1}}>
            <MyView style={styles.contentContainer2}>
              <MyView style={styles.priceRow}>
                <MyText style={styles.title}>
                  {item['ProductDetails']['ProductName']}
                </MyText>
              </MyView>
              <MyText style={{fontWeight: '500', marginVertical: 3}}>
                {'By '}
                <MyText style={{fontWeight: '700', fontSize: 13}}>
                  {item['ProductDetails']['SellerName']}
                </MyText>
              </MyText>
            </MyView>
            <MyView style={styles.contentContainer}>
              <MyView style={styles.bottomRow}>
                <MyText
                  style={
                    styles.price
                  }>{`$${item['ProductDetails']['Price']}`}</MyText>
                <MyView
                  style={[
                    styles.complete,
                    // {left: item['Status'] === 1 ? 90 : 140},
                  ]}>
                  <MyText
                    style={{color: WHITE, fontWeight: '500', fontSize: 12}}>
                    {item['StatusName']}
                  </MyText>
                </MyView>
              </MyView>
            </MyView>
          </MyView>
        </MyView>
      </MyView>
    );
  };

  return (
    <SafeArea style={{paddingTop: -useSafeAreaInsets().top}}>
      <Loader isVisible={loading} />
      <RemarkPopUp
        value={remark}
        dismiss={() => setmodalVisible(false)}
        onChangeText={(text) => setremark(text)}
        isVisible={modalVisible}
        onPress={_submit}
      />
      <FlatList
        data={List}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + ''}
        ItemSeparatorComponent={_seperator}
        ListEmptyComponent={_renderEmpty}
      />
    </SafeArea>
  );
};

export default MyOrders;
