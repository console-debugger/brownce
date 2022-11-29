import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurveView, Loader, MyImage, MyText, MyView, SafeArea } from '../../components/customComponent'
import { LIGHT_BROWN, LIGHT_WHITE, THEME } from '../../utils/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/responsive'
import { View, Text, } from 'react-native'
import SearchList from '../../CustomLibrary/src/SearchList'
import HighlightableText from '../../CustomLibrary/src/components/HighlightableText'
import Touchable from '../../CustomLibrary/src/utils/Touchable'
import { getBrandSearchAction } from '../../redux/action'
import { GET_BRAND_SUCCESS_ACTION } from '../../redux/action/type'
import { navigateToScreen } from '../../navigation/rootNav'

const rowHeight = 40

// Brand UI 
const Brands = ({ navigation }) => {

  const dispatch = useDispatch()
  const state = useSelector(state => { return state })
  const { LOADING } = state['localeReducer']['locale']
  const { loading } = state['loaderReducer']
  const { profile } = state['profileReducer']
  const { brandList, messageCase } = state['productReducer']

  const [value, setValue] = useState('')
  const [brandlist, setbrandlist] = useState([])
  const [refresh, setrefresh] = useState(false)

  // fetching all brand list
  useEffect(() => {
    const param = {
      'Search': value
    }
    //value ? dispatch(SearchloaderAction(true)) : dispatch(loaderAction(true))
    dispatch(getBrandSearchAction(param))
  }, [value])

  useEffect(() => {
    if (messageCase === GET_BRAND_SUCCESS_ACTION) {
      setrefresh(true)
      console.log('refresh', refresh);
      setbrandlist(brandList)
      console.log('brandlist', brandlist);
    }
  }, [messageCase])


  const goto = (item) => {
    let array = []
    array.push(item.Id)
    navigateToScreen('productresults', { brandId: array })
  }

  // render branding list
  const renderRow = ({ item, sectionID, rowID }) => {
    return (
      <Touchable onPress={() => goto(item)} >
        <View key={rowID} style={{ flex: 1, marginLeft: 20, height: rowHeight, justifyContent: 'center' }}>
          {/*use `HighlightableText` to highlight the search result*/}
          <HighlightableText
            matcher={item.matcher}
            text={item.searchStr}
            textColor={LIGHT_BROWN}
            hightlightTextColor={THEME}
          />
        </View>
      </Touchable>
    )
  }


  const renderEmpty = () => {
    return (
      <View style={styles.emptyDataSource}>
        <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Content </Text>
      </View>
    )
  }

  // UIof empty branding list
  const renderEmptyResult = (searchStr) => {
    return (
      <View style={styles.emptySearchResult}>
        <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Result For
          <Text style={{ color: '#171a23', fontSize: 18 }}>{searchStr}</Text></Text>
        <Text style={{ color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10 }}>Please search again</Text>
      </View>
    )
  }


  return (
    <SafeArea style={{ paddingBottom: -useSafeAreaInsets().bottom, backgroundColor: THEME }}>
      <Loader isVisible={loading} />
      <MyView style={styles['headerView']}>
        <MyImage source={{ uri: profile?.['ProfilePic'] }} style={styles['profileImage']} />
        <MyView style={styles['userDetails']}>
          <MyText style={styles['userName']}>{profile?.['Name'] ? profile['Name'] : LOADING}</MyText>
          <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>{profile?.['Username'] ? profile['Username'] : LOADING}</MyText>
        </MyView>
      </MyView>

      <MyView style={{ backgroundColor: LIGHT_WHITE, alignItems: 'center' }}>
        <CurveView />
        {/* <SearchInput
                value={value}
                onChangeText={(value) => setValue(value)} /> */}
        {/* <MyText style={[styles.shoptext,{}]}>{YOURPRODUCTS}</MyText> */}

      </MyView>
      {refresh ?
        <SearchList
          data={brandList}
          renderRow={renderRow}
          renderEmptyResult={renderEmptyResult}
          //renderBackButton={() => null}
          renderEmpty={renderEmpty}
          rowHeight={rowHeight}
          toolbarBackgroundColor={'#2196f3'}
          title='Search List Demo'
          onClickBack={() => { }}
          //searchListBackgroundColor={LIGHT_WHITE}
          searchBarToggleDuration={300}
          //searchInputBackgroundColor={WHITE}
          searchInputBackgroundColorActive={'#6ec6ff'}
          searchInputPlaceholderColor={'#FFF'}
          searchInputTextColor={'#FFF'}
          searchInputTextColorActive={'#000'}
          searchInputPlaceholder='Search'
          sectionIndexTextColor={'#6ec6ff'}
          refreshing={refresh}
        //searchBarBackgroundColor={LIGHT_WHITE}
        /> :
        <MyView style={{ backgroundColor: LIGHT_WHITE, flex: 1 }} />}
    </SafeArea>
  )
}

export default Brands