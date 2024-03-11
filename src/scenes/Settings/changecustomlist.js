import React, { useEffect } from 'react'
import { FlatList, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Button, EmptyMessage, KeyboardAwareScroll, Loader, LoaderSearch, MyImage, MyText, MyView, SafeArea, SearchInput, SecondaryButton, Touchable } from '../../components/customComponent'
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { getCustomServicesAction, updateCustomServicesAction, SearchloaderAction, changeServiceAction, getServicesListAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { LIGHT_WHITE } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import { plusBrownIcon } from "../../components/icons"
import styles from './styles'
import { useState } from 'react'

// CHnage of servieces list UI
const ChangeCustomServiceList = ({ navigation }) => {

    const dispatch = useDispatch()
    const [search, setsearch] = useState('')
    const state = useSelector(state => { return state })
    const { CONTINUE } = state['localeReducer']['locale']
    const { loading, searchloading } = state['loaderReducer']
    //ServicesProvidedCustom
    const { providerprofile } = state['profileReducer']
    const { customservices, services, allcustomservices } = state['hairReducer']

    const [isRefresh, setisRefresh] = useState(false)
    const [servicesLoader, setServicesLoader] = useState(false)
    const [ServicesProvidedCustom, setServicesProvidedCustom] = useState([])

    useEffect(() => {
        if (search.trim().length) {
            const param = {
                "Search": search
            }
            search ? dispatch(SearchloaderAction(true)) : dispatch(getCustomServicesAction(param))
            dispatch(getCustomServicesAction(param))
        }
    }, [search])

    useEffect(() => {
        if (providerprofile?.UserId) {
            setServicesLoader(true)
            dispatch(getServicesListAction({
                UserId: providerprofile?.UserId
            }, response => {
                setServicesLoader(false)
                if (response) {
                    setServicesProvidedCustom(response?.ServicesProvidedCustom || [])
                    allcustomservices.map(item => {
                        ServicesProvidedCustom.map(item1 => {
                            if (item.ServiceMasterId == item1.ServiceMasterId) {
                                item['status'] = true
                            }
                        })
                    })
                    setisRefresh(!isRefresh)
                }
            }))
        }
    }, [providerprofile?.UserId])

    const _keyExtractor = (item, index) => item + index

    const _selectServices = (item, index) => () => {
        const replica = [...allcustomservices]
        replica[index]['status'] = !replica[index]['status']
        dispatch(updateCustomServicesAction(replica))
    }

    const _renderServies = ({ item, index }) => {
        return (
            <SecondaryButton
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5), height: isAndroid ? SCREEN_HEIGHT * 0.06 : SCREEN_HEIGHT * 0.05, }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['ServiceName']}
                onPress={_selectServices(item, index)}
            />
        )
    }

    const _validate = () => {
        const filterCustomServiceId = customservices.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterServiceId = services.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterArray = [...filterCustomServiceId, ...filterServiceId]
        const isUpdate = true
        const param = {
            [apiKey['SERVICE_ID']]: filterArray,
            [apiKey['IS_UPDATE']]: isUpdate
        }
        if (filterCustomServiceId.length) {
            dispatch(changeServiceAction(param))
        }
        else {
            showToast('Please select at least one service')
        }
    }

    const _renderEmpty = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0 }} message={"No custom services found."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <Loader isVisible={loading} />
                <SearchInput
                    style={{ width: '85%', marginTop: 10 }}
                    value={search}
                    onChangeText={(value) => setsearch(value)} />
                <LoaderSearch isVisible={searchloading} />
                {searchloading ? null :
                    <>
                        <FlatList
                            key='services'
                            keyExtractor={_keyExtractor}
                            data={allcustomservices}
                            renderItem={_renderServies}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles['serviceList']}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            ListEmptyComponent={_renderEmpty}
                            extraData={isRefresh}
                        />
                        <Touchable onPress={() => navigation.navigate('changeAddCustomService')} style={styles['addCustomService']}>
                            <MyText style={styles['addText']}>{"Add custom services"}</MyText>
                            <MyView style={styles['addCircle']}>
                                <MyImage source={plusBrownIcon} style={styles['plusStyle']} />
                            </MyView>
                        </Touchable>
                        <Button onPress={_validate} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={CONTINUE} />
                    </>}
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ChangeCustomServiceList