import React, { useState, useCallback, useRef } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, TouchableIcon, Button, Touchable, Loader, Input, KeyboardAwareScroll } from '../../components/customComponent'
import { dismissKeyboard, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { plusIcon, redCrossIcon } from '../../components/icons'
import { BLACK, LIGHT_GRAY } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { getBrandCategoryAction, addProductAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import MultipleImagePickerSelection from '../../components/multipleImageSelection'
import MyListPicker from '../../components/myListPicker'
import { montserratSemiBold } from '../../utils/fontFamily'
import commonStyle from '../../components/commonStyle'
import BrandListPicker from '../../components/brandLisPicker'

const TYPES = { USERNAME: 'username', NAME: 'name', DES: 'description', PRICE: 'price', QUANTITY: 'quantity', GENDER: 'gender', COUNTRY: 'country', CITY: 'city', STATE: 'state' }

// @ Add products UI

const AddProducts = ({ navigation }) => {

    // Local and store state
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { ADDIMAGES, SUBMIT, NAME, PLEASE_ENTER_NAME } = state['localeReducer']['locale']
    const { brandList, categoryList } = state['productReducer']
    const { loading } = state['loaderReducer']

    const [isShow, setShow] = useState(false)
    const [portfolioData, setportfolioData] = useState([{ uri: "" }])
    const [filterimageid, setfilterimageid] = useState([])


    const initialFormField = {
        name: '',
        selectedbrand: '',
        brandId: '',
        selectedcategory: '',
        categoryId: '',
        selectedPrice: '',
        quantity: '',
        description: '',
        price: ''
    }

    const initialError = {
        nameError: '',
        descriptionError: '',
        quantityError: '',
        brandError: '',
        categoryError: '',
        priceError: ''
    }

    const [{ name, description, quantity, price, selectedbrand, brandId, selectedcategory, categoryId, selectedPrice }, setFormField] = useState(initialFormField)
    const [{ nameError, brandError, categoryError, priceError, descriptionError, quantityError }, setError] = useState(initialError)

    useFocusEffect(
        useCallback(() => {
            dispatch(getBrandCategoryAction())
        }, [])
    )

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _selectedBrand = data => {
        setError(prevError => ({ ...prevError, brandError: '' }))
        setFormField(prevState => ({ ...prevState, selectedbrand: data['Name'], brandId: data['Id'] }))
    }

    const _selectedCategory = data => {
        setError(prevError => ({ ...prevError, categoryError: '' }))
        setFormField(prevState => ({ ...prevState, selectedcategory: data['Name'], categoryId: data['Id'] }))
    }

    const _getImage = data => {
        if (portfolioData.length <= 1) setportfolioData([...data, ...portfolioData])
        else {
            const dataLength = portfolioData.length
            portfolioData.splice(dataLength - 1, 0, ...data)
        }
        setShow(false)
    }

    // Onchange of textinput
    const _onChangeText = type => text => {
        if (type === TYPES['NAME']) { setFormField(prevState => ({ ...prevState, name: text })), setError(prevState => ({ ...prevState, nameError: '' })) }
        if (type === TYPES['PRICE']) { setFormField(prevState => ({ ...prevState, price: text })), setError(prevState => ({ ...prevState, priceError: '' })) }
        if (type === TYPES['QUANTITY']) { setFormField(prevState => ({ ...prevState, quantity: text })), setError(prevState => ({ ...prevState, quantityError: '' })) }
        if (type === TYPES['DES']) { setFormField(prevState => ({ ...prevState, description: text })), setError(prevState => ({ ...prevState, descriptionError: '' })) }

    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const removeImage = (uri, id) => {
        const filteredData = portfolioData.filter(item => item.uri !== uri);
        setportfolioData(filteredData)
        filterimageid.push(id)
    }

    const _renderPortfolio = ({ item, index }) => {
        return (
            item['uri'] ?
                <MyView style={styles['portfolioView']}>
                    <TouchableIcon onPress={() => removeImage(item['uri'], item['Id'])} source={redCrossIcon} style={styles['crossIcon']} />
                    <MyImage
                        source={{ uri: item['uri'] }}
                        style={styles['portfolioImage']}
                    />
                </MyView>
                :
                <Touchable onPress={_openPicker} style={[styles['portfolioView'], { backgroundColor: LIGHT_GRAY }]}>
                    <MyImage source={plusIcon} />
                </Touchable>
        )
    }

    // @ Validation before adding products
    const _validate = () => {
        portfolioData.length > 1 ?
            name.length ?
                selectedbrand.length ?
                    selectedcategory.length ?
                        price.length ?
                            quantity.length ?
                                description.length ?
                                    _addproduct()
                                    : setError(prevError => ({ ...prevError, descriptionError: 'Please enter description' }))
                                : setError(prevError => ({ ...prevError, quantityError: 'Please enter quantity' }))
                            : setError(prevError => ({ ...prevError, priceError: 'Please enter price' }))
                        : setError(prevError => ({ ...prevError, categoryError: 'Please select a category' }))
                    : setError(prevError => ({ ...prevError, brandError: 'Please select a brand' }))
                : setError(prevError => ({ ...prevError, nameError: PLEASE_ENTER_NAME }))
            : showToast('Please add at least one image')
    }

    // @ Add products
    const _addproduct = () => {
        const formdata = new FormData()
        const filterImage = portfolioData.filter(item => { if (item['type']) return item })
        for (let i = 0; i < filterImage.length; i++) {
            formdata.append('ProductImage', {
                uri: filterImage[i].uri,
                type: filterImage[i].type,
                name: filterImage[i].name
            })
        }
        formdata.append('ProductName', name)
        formdata.append('Quantity', quantity)
        formdata.append('BrandId', brandId)
        formdata.append('CategoryId', categoryId)
        formdata.append('Price', price)
        formdata.append('Description', description)
        dispatch(addProductAction(formdata))

    }

    const dynamicSort = (property) => {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            <Loader isVisible={loading} />
            <MyView style={{ flex: 1, }}>
                <MultipleImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />

                <CurveView />
                <KeyboardAwareScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <MyText style={[styles['title'], { marginBottom: SCREEN_HEIGHT * 0.01, paddingHorizontal: dynamicSize(25) }]}>{ADDIMAGES}</MyText>
                    <FlatList
                        key='portFolio'
                        data={portfolioData}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={_renderPortfolio}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['portfolioFlatList']}
                        ItemSeparatorComponent={_renderSeperator}
                    />
                    <Input
                        labelFontSize={0}
                        style={{ borderBottomColor: BLACK, alignSelf: 'center', marginTop: 20 }}
                        value={name}
                        hintColor={BLACK}
                        placeholder={NAME}
                        onChangeText={_onChangeText(TYPES['NAME'])}
                        blurOnSubmit={false}
                        returnKeyType='done'
                        errorMessage={nameError || null}
                        errorStyle={{ marginLeft: 33 }}
                        onSubmitEditing={() => dismissKeyboard()}
                    />
                    <BrandListPicker textStyle={{ fontFamily: montserratSemiBold, color: BLACK }} style={{ alignSelf: 'center', marginVertical: null, marginTop: dynamicSize(0), borderBottomColor: BLACK }} message={'Please wait while fetching brand list'} value={selectedbrand} placeholder={'Choose brand'} data={brandList.sort(dynamicSort('BrandName'))} selectedItem={_selectedBrand} />
                    <MyView style={{ width: SCREEN_WIDTH - dynamicSize(70) }}>
                        <MyText style={[commonStyle['errorMessage'], { width: '88%', marginLeft: 33 }]}>{brandError}</MyText>
                    </MyView>
                    <MyListPicker textStyle={{ fontFamily: montserratSemiBold, color: BLACK }} style={{ alignSelf: 'center', marginVertical: null, marginTop: dynamicSize(15), borderBottomColor: BLACK }} message={'Please wait while fetching category list'} value={selectedcategory} placeholder={'Choose Category'} data={categoryList} selectedItem={_selectedCategory} />
                    <MyView style={{ width: SCREEN_WIDTH - dynamicSize(70) }}>
                        <MyText style={[commonStyle['errorMessage'], { width: '88%', marginLeft: 33 }]}>{categoryError}</MyText>
                    </MyView>
                    <Input
                        labelFontSize={0}
                        style={{ borderBottomColor: BLACK, alignSelf: 'center', marginTop: 0 }}
                        value={price}
                        hintColor={BLACK}
                        placeholder={'Price in USD'}
                        onChangeText={_onChangeText(TYPES['PRICE'])}
                        blurOnSubmit={false}
                        keyboardType={'numeric'}
                        errorMessage={priceError || null}
                        errorStyle={{ marginLeft: 33 }}
                    />
                    <Input
                        labelFontSize={0}
                        style={{ borderBottomColor: BLACK, alignSelf: 'center', marginTop: -5 }}
                        value={quantity}
                        hintColor={BLACK}
                        placeholder={'Quantity'}
                        keyboardType={'numeric'}
                        onChangeText={_onChangeText(TYPES['QUANTITY'])}
                        blurOnSubmit={false}
                        errorMessage={quantityError || null}
                        errorStyle={{ marginLeft: 33 }}
                    />
                    <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.04, fontSize: 15 }]}>{"Description"}</MyText>
                    <Input
                        multiline
                        style={{ borderBottomColor: BLACK, alignSelf: 'center' }}
                        value={description}
                        textInputStyle={{ lineHeight: 18, height: SCREEN_WIDTH * 0.2 }}
                        placeholder={""}
                        onChangeText={_onChangeText(TYPES['DES'])}
                        returnKeyType='done'
                        errorMessage={descriptionError || null}
                        errorStyle={{ marginLeft: 33 }}
                        onSubmitEditing={() => dismissKeyboard()}
                    />
                    <Button onPress={_validate} style={{ alignSelf: 'center', bottom: 5 }} text={SUBMIT} />
                </KeyboardAwareScroll>
                {/* </ScrollView> */}
            </MyView>
        </SafeArea>
    )
}

export default AddProducts