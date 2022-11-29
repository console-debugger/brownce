import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, SecondaryButton, TouchableIcon, Button, Touchable, Loader } from '../../components/customComponent'
import { SCREEN_HEIGHT } from '../../components/helper'
import { plusIcon, redCrossIcon } from '../../components/icons'
import { LIGHT_GRAY } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { saveProviderPortfolioAction, deleteProviderPortfolio, getAllServicesAction, updateServicesAction, getCustomServicesAction, updateCustomServicesAction, getServicesByProfessionAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { apiKey } from '../../services/serviceConstant'
import MultipleImagePickerSelection from '../../components/multipleImageSelection'

// Provider setting
const ProviderSetting = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { CHANGE_PORTFOLIO, UPDATE } = state['localeReducer']['locale']
    const { providerprofile } = state.profileReducer
    const { ServicesProvided } = state.profileReducer.providerprofile
    const { services } = state['hairReducer']
    const { loading } = state['loaderReducer']

    const [isrefresh, setisrefresh] = useState(false)
    const [isShow, setShow] = useState(false)
    const [portfolioData, setportfolioData] = useState([{ uri: "" }])
    const [filterimageid, setfilterimageid] = useState([])

    useEffect(() => {
        getImages()
    }, [])

    useFocusEffect(
        useCallback(() => {
            dispatch(getAllServicesAction())
            const param = {
                "Search": ''
            }
            dispatch(getCustomServicesAction(param))
            const servicesList = ServicesProvided.map(item => { return { ...item, status: true } })
            const customservicesList = providerprofile['ServicesProvidedCustom'].map(item => { return { ...item, status: true } })
            dispatch(updateServicesAction(servicesList))
            dispatch(updateCustomServicesAction(customservicesList))
        }, [])
    )

    const getImages = async () => {
        const newData = providerprofile['Portfolios'].map(item => ({ ...item, uri: item.ImagePath }))
        await setportfolioData([...newData, { uri: '' }])
    }

    const _getImage = data => {
        if (portfolioData.length <= 1) setportfolioData([...data, ...portfolioData])
        else {
            const dataLength = portfolioData.length
            portfolioData.splice(dataLength - 1, 0, ...data)
        }
        setShow(false)
    }

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _selectHairType = (item, index) => {
        const replica = [...services]
        replica[index]['status'] = !replica[index]['status']
        dispatch(updateServicesAction(replica))
        setisrefresh(!isrefresh)
    }

    const _keyExtractor = (item, index) => item + index

    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _renderFooter = () => (
        <Touchable style={[styles['portfolioView'], { backgroundColor: LIGHT_GRAY }]}>
            <MyImage source={plusIcon} />
        </Touchable>
    )

    const removeImage = (uri, id) => {
        const filteredData = portfolioData.filter(item => item.uri !== uri);
        setportfolioData(filteredData)
        filterimageid.push(id)
    }
    const updatePortfolio = () => {
        const formdata = new FormData()
        const filterImage = portfolioData.filter(item => { if (item['type']) return item })

        for (let i = 0; i < filterImage.length; i++) {
            formdata.append('', {
                uri: filterImage[i].uri,
                type: filterImage[i].type,
                name: filterImage[i].name
            })
        }
        if (filterImage.length != 0) dispatch(saveProviderPortfolioAction(formdata))
        if (filterimageid.length != 0) {
            let param = {
                [apiKey['SPPortfolioId']]: filterimageid
            }
            console.log('SPPortfolioId', filterimageid)
            dispatch(deleteProviderPortfolio(param))
        }
    }
    const _renderPortfolio = ({ item, index }) => {

        return (
            <>
                {item['uri'] ?
                    <MyView style={styles['portfolioView']}>
                        <TouchableIcon onPress={() => removeImage(item['uri'], item['SPPortfolioId'])} source={redCrossIcon} style={styles['crossIcon']} />
                        <MyImage
                            source={{ uri: item['uri'] }}
                            style={styles['portfolioImage']}
                        />
                    </MyView>
                    :
                    <Touchable onPress={_openPicker} style={[styles['portfolioView'], { backgroundColor: LIGHT_GRAY }]}>
                        <MyImage source={plusIcon} />
                    </Touchable>
                }
            </>
        )
    }

    const _renderHairType = ({ item, index }) => {
        return (
            <SecondaryButton
                price
                onPress={() => _selectHairType(item, index)}
                style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
                textStyle={styles['selectedText']}
                text={item['ServiceName']}
                pricetext={item['Price'] ? `${item['Price']} USD` : null}
            />
        )
    }


    const _renderHairType1 = ({ item, index }) => {
        return (
            <SecondaryButton
                price
                onPress={() => _selectHairType(item, index)}
                style={[styles['selected'], { borderRadius: dynamicSize(5) }]}
                textStyle={styles['selectedText']}
                text={item['ServiceName']}
                pricetext={item['Price']}
            />
        )
    }

    const _validate = () => {
        navigation.navigate('selectProfession')
        // navigation.navigate('allServices')
        // const filterServiceId = services.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        // const isUpdate = true
        // const param = {
        //     [apiKey['SERVICE_ID']]: filterServiceId,
        //     [apiKey['IS_UPDATE']]: isUpdate
        // }
        // console.log('param==>', param)
        // dispatch(changeServiceAction(param))

    }

    const _validate1 = () => {
        navigation.navigate('changeCustomList')
    }
    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
            <Loader isVisible={loading} />
            <MyView style={{ flex: 1 }}>
                <MultipleImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />

                <CurveView />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MyText style={[styles['title'], { marginBottom: SCREEN_HEIGHT * 0.02, paddingHorizontal: dynamicSize(25) }]}>{CHANGE_PORTFOLIO}</MyText>

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

                    <Button onPress={() => updatePortfolio()} style={{ alignSelf: 'center', marginTop: SCREEN_HEIGHT * 0.03 }} text={UPDATE} />
                    <MyText style={[styles['title'], { marginTop: SCREEN_HEIGHT * 0.02 }]}>{"CHANGE SERVICES"}</MyText>
                    <FlatList
                        key='hairType'
                        data={ServicesProvided}
                        keyExtractor={_keyExtractor}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item, index) => _renderHairType(item, index)}
                        contentContainerStyle={styles['hairTypeFlatList']}
                        numColumns={2}
                        extraData={isrefresh}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                    <Button onPress={_validate} style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} />
                    <MyText style={[styles['title'], { marginTop: SCREEN_HEIGHT * 0.02 }]}>{"CUSTOM SERVICES"}</MyText>
                    <FlatList
                        key='serviceProviderCustom'
                        data={providerprofile['ServicesProvidedCustom']}
                        keyExtractor={_keyExtractor}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item, index) => _renderHairType1(item, index)}
                        contentContainerStyle={styles['hairTypeFlatList']}
                        numColumns={2}
                        extraData={isrefresh}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                    <Button onPress={_validate1} style={{ alignSelf: 'center', marginBottom: SCREEN_HEIGHT * 0.02 }} text={UPDATE} />
                </ScrollView>
            </MyView>
        </SafeArea>
    )
}

export default ProviderSetting