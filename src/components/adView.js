import React, { useEffect } from 'react'
import { ADMOB_INTERSTITIAL_UNIT_ID, isCustomer, showToast } from './helper'
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

const AdView = props => {
    const state = useSelector(state => { return state })

    const interstitial = InterstitialAd.createForAdRequest(ADMOB_INTERSTITIAL_UNIT_ID, {});

    useEffect(() => {
        if (!isCustomer()) {
            const eventListener = interstitial.onAdEvent(type => {
                if (type === AdEventType.LOADED && !state.profileReducer.providerprofile.IsAdMobSubscribe) {
                    return interstitial.show();
                }
            });
            return () => {
                eventListener();
            };
        }
    }, []);

    useEffect(() => {
        interstitial.load();
    }, [])

    return (
        <View />
    )
}

export default AdView