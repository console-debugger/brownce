import React, { useEffect, useState } from 'react'
import { ADMOB_INTERSTITIAL_UNIT_ID, isCustomer, showToast } from './helper'
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

const AdView = props => {
    const state = useSelector(state => { return state })
    const [loaded, setLoaded] = useState(false);

    const interstitial = InterstitialAd.createForAdRequest(ADMOB_INTERSTITIAL_UNIT_ID, {});

    useEffect(() => {
        if (!isCustomer()) {
            const eventListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setLoaded(true);
                if (!state.profileReducer.providerprofile.IsAdMobSubscribe) {
                    return interstitial.show();
                }
            });
            interstitial.load();

            return eventListener
        }
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <View />
    )
}

export default AdView