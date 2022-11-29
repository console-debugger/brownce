import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurveView,
  EmptyMessage,
  Loader,
  LoaderSearch,
  MyImage,
  MyText,
  MyView,
  SafeArea,
  SearchInput,
  Touchable,
} from '../../components/customComponent';
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/helper';
import { productImg2 } from '../../components/icons';
import { LIGHT_WHITE, THEME } from '../../utils/colors';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFontSize } from '../../utils/responsive';
import { FlatList } from 'react-native';
import { navigateToScreen } from '../../navigation/rootNav';
import {
  customerProductAction,
  loaderAction,
  SearchloaderAction,
} from '../../redux/action';
import { useFocusEffect } from '@react-navigation/native';

// @ Products UI
const Products = ({ navigation, route }) => {
  // @ local and global store states
  const state = useSelector((state) => {
    return state;
  });
  const { LOADING } = state['localeReducer']['locale'];
  const { profile } = state['profileReducer'];
  const { List } = state['productReducer']['csProducts'];
  const dispatch = useDispatch();
  const { loading, searchloading } = state['loaderReducer'];

  const [value, setValue] = useState('');

  useEffect(() => {
    const param = {
      'PageNo': '1',
      'RecordsPerPage': '600',
      'Search': value,
      'BrandId': '',
      'CategoryId': route?.params?.categoryId
    }
    dispatch(loaderAction(true))
    dispatch(customerProductAction(param))
  }, [])

  // Customer products
  // useEffect(() => {
  //     const param = {
  //         'PageNo': '1',
  //         'RecordsPerPage': '600',
  //         'Search': value,
  //         'BrandId': '',
  //         'CategoryId': ''
  //     }
  //     value ? dispatch(SearchloaderAction(true)) : dispatch(loaderAction(true))
  //     dispatch(customerProductAction(param))
  // }, [value])

  const searchInputHandler = useCallback(() => {
    const param = {
      PageNo: '1',
      RecordsPerPage: '600',
      Search: value,
      BrandId: '',
      CategoryId: '',
    };
    dispatch(loaderAction(true));
    setTimeout(() => {
      dispatch(customerProductAction(param));
    }, 1000);
  }, [value]);

  //   useFocusEffect(
  //     useCallback(() => {
  //       const param = {
  //         PageNo: '1',
  //         RecordsPerPage: '600',
  //         Search: value,
  //         BrandId: '',
  //         CategoryId: '',
  //       };
  //       dispatch(loaderAction(true));
  //       dispatch(customerProductAction(param));
  //       setTimeout(() => {
  //         dispatch(customerProductAction(param));
  //       }, 1000);
  //     }, [value]),
  //   );

  const _renderSeperator = () => {
    return <MyView style={{ height: 10 }}></MyView>;
  };

  // Products UI render
  const _renderProducts = ({ item, index }) => {
    return (
      <Touchable
        disabled={item['ProductStatus'] === 1 ? false : true}
        onPress={() =>
          navigation.navigate('productDetails', {
            item: item,
            productImage: productImg2,
          })
        }
        style={{ marginTop: SCREEN_HEIGHT * 0.02, width: '48%' }}>
        <MyView style={styles.view}>
          <MyView
            style={{
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: -10,
            }}>
            <MyImage
              style={styles['productImage']}
              source={
                item?.['ProductFiles']?.[0]?.['FilePath']
                  ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] }
                  : productImg2
              }
              resizeMode={'cover'}
              blurRadius={5}
            />
          </MyView>
          <MyImage
            style={styles['productImage']}
            source={
              item?.['ProductFiles']?.[0]?.['FilePath']
                ? { uri: item?.['ProductFiles']?.[0]?.['FilePath'] }
                : productImg2
            }
            resizeMode={'contain'}
          />
        </MyView>
        <MyView style={{ width: '100%' }}>
          <MyView
            style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <MyText style={styles['price']}>{`$${item['Price']}`}</MyText>
            {item['ProductStatus'] === 1 ? null : (
              <MyText style={styles['stock']}>{`${'Out of Stock'}`}</MyText>
            )}
          </MyView>
          <MyText style={styles['desc']}>{item['ProductName']}</MyText>
          <MyText style={styles['desc']}>{item['BrandName']}</MyText>
        </MyView>
      </Touchable>
    );
  };

  // Render if no products found
  const _renderEmpty = () => {
    if (!loading) {
      return (
        <EmptyMessage
          style={{ marginVertical: SCREEN_HEIGHT * 0.25 }}
          message={'No results found.'}
        />
      );
    } else return <EmptyMessage message={''} />;
  };

  return (
    <SafeArea
      style={{
        paddingBottom: -useSafeAreaInsets().bottom,
        backgroundColor: THEME,
      }}>
      <Loader isVisible={loading} />

      <MyView style={styles['headerView']}>
        <MyImage
          source={{ uri: profile?.['ProfilePic'] }}
          style={styles['profileImage']}
        />
        <MyView style={styles['userDetails']}>
          <MyText style={styles['userName']}>
            {profile?.['Name'] ? profile['Name'] : LOADING}
          </MyText>
          <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>
            {profile?.['Username'] ? profile['Username'] : LOADING}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
        <CurveView />
        <MyText
          onPress={() => navigateToScreen('brands')}
          style={{
            color: THEME,
            bottom: 10,
            textDecorationLine: 'underline',
            alignSelf: 'flex-end',
            right: 30,
          }}>
          {'Filter by Brand'}
        </MyText>
        <MyText
          onPress={() => navigateToScreen('categories')}
          style={{
            color: THEME,
            bottom: 7,
            textDecorationLine: 'underline',
            alignSelf: 'flex-end',
            right: 30,
          }}>
          {'Search by Category'}
        </MyText>
        <SearchInput
          style={{ alignSelf: 'center' }}
          value={value}
          onChangeText={(value) => setValue(value)}
          onSubmitEditing={() => searchInputHandler()}
        />
        <LoaderSearch
          style={{ marginVertical: SCREEN_HEIGHT * 0.25 }}
          isVisible={searchloading}
        />
        <MyView style={{ flex: 1 }}>
          {searchloading ? null : (
            <FlatList
              data={List}
              showsVerticalScrollIndicator={false}
              renderItem={_renderProducts}
              ItemSeparatorComponent={_renderSeperator}
              ListEmptyComponent={_renderEmpty}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{
                width: '100%',
                paddingHorizontal: SCREEN_WIDTH * 0.04,
                paddingVertical: SCREEN_HEIGHT * 0.01,
              }}
            />
          )}
        </MyView>
      </MyView>
    </SafeArea>
  );
};

export default Products;
