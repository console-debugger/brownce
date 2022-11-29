import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyText, MyView, SafeArea, Loader, Button } from '../../components/customComponent'
import { GRAY, THEME } from '../../utils/colors'
import styles from './styles'
import { loaderAction, getMyFundsAction, requestFundAction, getFundListAction, clearMessageCase } from '../../redux/action'
import { FundPopUp } from '../../components/alert'
import { REQUEST_FUND_SUCCESS_ACTION } from '../../redux/action/type'

const Funds = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { loading } = state['loaderReducer']
    const { funds, fundsList, messageCase } = state?.['profileReducer']
    const [amount, setamount] = useState('')
    const [modalVisible, setmodalVisible] = useState(false)

    // fetching funds list
    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getMyFundsAction())
        const param = {
            "pageNo": "1",
            "pageSize": "10000"
        }
        dispatch(getFundListAction(param))
    }, [])

    useEffect(() => {
        if (messageCase === REQUEST_FUND_SUCCESS_ACTION) {
            dispatch(loaderAction(true))
            const param = {
                "pageNo": "1",
                "pageSize": "10000"
            }
            dispatch(getMyFundsAction())
            dispatch(getFundListAction(param))
            dispatch(clearMessageCase())
        }
    }, [messageCase])


    const _keyExtractor = (item, index) => item + index

    const dateHandler = (dateItem) => {
        const dateTimeStamp = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const date = dateTimeStamp.getDate()
        const month = months[dateTimeStamp.getMonth()]
        const year = dateTimeStamp.getFullYear()
        const completeDate = date + " " + month + " " + year
        return completeDate
    }
    // Render earning UI
    const _renderEarnings = ({ item, index }) => {
        return (
            <MyView style={[styles['item']]}>
                <MyText style={[styles['bodyText'], { textAlign: 'left' }]} >{dateHandler(item['CreatedOn'])}</MyText>
                <MyText style={[styles['bodyText'], { textAlign: 'center' }]}>{item['Amount']}</MyText>
                <MyText style={[styles['bodyText'], { left: 30 }]}>{item['RequestStatus']}</MyText>
            </MyView>
        )
    }

    // requesting for funds
    const _requestfund = () => {
        setmodalVisible(false)
        const param = {
            "Amount": amount
        }
        amount ? dispatch(requestFundAction(param)) : null
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <Loader
                isVisible={loading} />
            <MyView style={styles['mainContainer']}>
                <FundPopUp
                    onChangeText={(text) => setamount(text)}
                    isVisible={modalVisible}
                    onPress={_requestfund} />
                <Loader
                    isVisible={loading} />
                <CurveView />
                <MyText style={styles['amount']}>{`$${funds}.00`}</MyText>
                <Button
                    style={{ backgroundColor: funds ? THEME : GRAY }}
                    disabled={funds ? false : true}
                    onPress={() => setmodalVisible(true)}
                    text={"Request for fund"} />
                <MyView style={styles['headerView']}>
                    <MyText style={[styles['headerText'], { textAlign: 'left' }]} >{"DATE"}</MyText>
                    <MyText style={[styles['headerText'], { textAlign: 'center' }]}>{"FUND"}</MyText>
                    <MyText style={[styles['headerText'], { textAlign: 'right' }]}>{"STATUS"}</MyText>

                </MyView>
                <FlatList
                    key='earnings'
                    keyExtractor={_keyExtractor}
                    data={fundsList}
                    renderItem={_renderEarnings}
                    contentContainerStyle={styles['flatList']}
                    showsVerticalScrollIndicator={false}
                />
            </MyView>
        </SafeArea>
    )
}

export default Funds