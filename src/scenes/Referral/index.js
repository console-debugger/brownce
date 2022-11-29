import React from 'react'
import { Share, Linking } from 'react-native';
import { SafeArea, MyView, MyImage, MyText, Touchable, TouchableIcon } from '../../components/customComponent'
import styles from './styles'
import { logo, whatsAppIcon, faceookIcon, twitterIcon } from '../../components/icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { SCREEN_HEIGHT } from '../../components/helper'

// Referral UI
const Referral = ({ navigation }) => {

    const state = useSelector(state => { return state })
    const { REFER_YOUR_FRIENDS, COPY, SHARE_VIA } = state['localeReducer']['locale']
    const { profile, providerprofile } = state['profileReducer']

    console.log("providerprofile?.['MyReferral'] => ", providerprofile?.['MyReferral'])
    console.log("providerprofile => ", providerprofile)
    // console.log("profile?.['MyReferral'] => ", profile?.['MyReferral'])

    const shareOptions = {
        title: 'Title',
        message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
        url: 'www.whatsapp.com',
        subject: 'Subject'
    };

    const onSharePress = () => Share.share(shareOptions);

    const shareToWhatsApp = (text, phoneNumber) => {
        Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`);
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['upperContainer']}>
                <MyImage source={logo} />
            </MyView>
            <MyText style={styles['referText']}>{REFER_YOUR_FRIENDS}</MyText>
            <MyView style={styles['referContainer']}>
                <MyText style={styles['refCode']}>{profile?.['MyReferral']}</MyText>
                <Touchable style={styles['copyContainer']}>
                    <MyText style={styles['copy']}>{COPY}</MyText>
                </Touchable>
            </MyView>
            <MyText style={[styles['referText'], { marginTop: SCREEN_HEIGHT * 0.07 }]}>{SHARE_VIA}</MyText>
            <MyView style={styles['socialShare']}>
                <TouchableIcon onPress={onSharePress} source={faceookIcon} />
                <TouchableIcon onPress={onSharePress} source={twitterIcon} />
                <TouchableIcon onPress={() => shareToWhatsApp(profile?.['MyReferral'])} source={whatsAppIcon} />
            </MyView>
        </SafeArea>
    )
}

export default Referral