import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, TouchableIcon, Button, Touchable, Loader, Input } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
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

const TYPES = { USERNAME: 'username', NAME: 'name', DES: 'description', PRICE: 'price', QUANTITY: 'quantity', EMAIL: 'email', GENDER: 'gender', COUNTRY: 'country', CITY: 'city', STATE: 'state' }

// Edit product UI

const EditProduct = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { ADDIMAGES, NAME, PLEASE_ENTER_NAME } = state['localeReducer']['locale']
    const { brandList, categoryList } = state['productReducer']
    const { loading } = state['loaderReducer']

    const [isShow, setShow] = useState(false)
    const [portfolioData, setportfolioData] = useState([{ uri: "" }])
    const [filterimageid, setfilterimageid] = useState([])

    const initialFormField = {
        name: route.params.item.ProductName || '',
        selectedbrand: route.params.item.BrandName || '',
        brandId: route.params.item.BrandId || '',
        selectedcategory: route.params.item.CategoryName || '',
        categoryId: route.params.item.CategoryId || '',
        selectedPrice: route.params.item.Price || '',
        price: route.params.item.Price || '',
        quantity: route.params.item.Quantity || '',
        description: route.params.item.Description || ''
    }

    const initialError = {
        nameError: '',
        descriptionError: '',
        brandError: '',
        categoryError: '',
        priceError: '',
        quantityError: '',
    }

    const [{ name, description, selectedbrand, brandId, price, selectedcategory, categoryId, quantity, selectedPrice, }, setFormField] = useState(initialFormField)
    const [{ nameError, brandError, categoryError, priceError, descriptionError, quantityError }, setError] = useState(initialError)

    // @ Get categories action
    useEffect(() => {
        mapProductFiles()
        dispatch(getBrandCategoryAction())
    }, [])

    useFocusEffect(
        useCallback(() => {
            setfilterimageid([])
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

    const mapProductFiles = async () => {
        const newData = route.params.item['ProductFiles'].map(item => ({ ...item, uri: item.FilePath }))
        setportfolioData([...newData, { uri: '' }])
    }

    const _getImage = data => {
        if (portfolioData.length <= 1) setportfolioData([...data, ...portfolioData])
        else {
            const dataLength = portfolioData.length
            portfolioData.splice(dataLength - 1, 0, ...data)
        }
        setShow(false)
    }

    // @ onchange text of input
    const _onChangeText = type => text => {
        if (type === TYPES['NAME']) { setFormField(prevState => ({ ...prevState, name: text })), setError(prevState => ({ ...prevState, nameError: '' })) }
        if (type === TYPES['PRICE']) { setFormField(prevState => ({ ...prevState, price: text })), setError(prevState => ({ ...prevState, pricerror: '' })) }
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

    // @ Portfolio render

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

    // validate all data before updating products
    const _validate = () => {
        portfolioData.length > 1 ?
            name.length ?
                selectedbrand.length ?
                    selectedcategory.length ?
                        price ?
                            quantity ?
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

    // @ Save updated products
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
        formdata.append('Id', route.params.item.Id)
        formdata.append('Quantity', quantity)
        formdata.append('ProductName', name)
        formdata.append('BrandId', brandId)
        formdata.append('CategoryId', categoryId)
        formdata.append('Price', price)
        formdata.append('Description', description)
        filterimageid.length ? formdata.append('DeleteFileId', filterimageid.toString()) : null
        dispatch(addProductAction(formdata))

    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            <Loader isVisible={loading} />
            <MyView style={{ flex: 1, }}>
                <MultipleImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
                <CurveView />
                <ScrollView showsVerticalScrollIndicator={false}>
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
                        errorMessage={nameError || null}
                        errorStyle={{ marginLeft: 33 }}
                    />
                    <MyListPicker textStyle={{ fontFamily: montserratSemiBold, color: BLACK }} style={{ alignSelf: 'center', marginVertical: null, marginTop: dynamicSize(0), borderBottomColor: BLACK }} message={'Please wait while fetching brand list'} value={selectedbrand} placeholder={'Choose brand'} data={brandList} selectedItem={_selectedBrand} />
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
                        value={price.toString()}
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
                        value={quantity.toString()}
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
                        containerStyle={{}}
                        textInputStyle={{ lineHeight: 18, height: SCREEN_WIDTH * 0.2 }}
                        placeholder={""}
                        onChangeText={_onChangeText(TYPES['DES'])}
                        returnKeyType='done'
                        errorMessage={descriptionError || null}
                        errorStyle={{ marginLeft: 33 }}
                    />
                    <Button onPress={_validate} style={{ alignSelf: 'center', bottom: 5 }} text={'Update'} />
                </ScrollView>
            </MyView>
        </SafeArea>
    )
}

export default EditProduct