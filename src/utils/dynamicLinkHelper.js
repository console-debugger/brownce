import dynamicLinks from '@react-native-firebase/dynamic-links';

export const generateDynamicLink = (profileType, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlLink = `https://brownceapp.page.link/profile-id/${profileType}/${userId}`
            console.log('link==>', urlLink)
            const link = await dynamicLinks().buildShortLink({
                // link: `${STATIC_URLS.DYNAMIC_LINK_URL}/product/id=${uniqueId || '1234567'}`,
                // link: `https://www.brownceapp.com/profile-id/${data.profileType}/${data.userId}`,
                link: urlLink,
                domainUriPrefix: 'https://brownceapp.page.link',
                social: {
                    title: 'Brownce',
                    descriptionText: 'Brownce is the leading beauty service app for Black and Brown people',
                    imageUrl: 'https://admin.brownceapp.com/assets/images/black-logo.png',
                },
                ios: {
                    bundleId: 'com.brownceapp.brownce',//STATIC_URLS.BUNDLE_ID,
                    appStoreId: '1539118657',//STATIC_URLS.APP_STORE_ID,
                    // fallbackUrl: 'https://www.brownceapp.com/', //https://apps.apple.com/us/app/brownce/id1539118657 //https://www.brownceapp.com/
                },
                android: {
                    packageName: 'com.browncecustomer',//STATIC_URLS.BUNDLE_ID,
                    // fallbackUrl: 'https://www.brownceapp.com/'
                    // fallbackUrl: 'https://www.brownceapp.com/', //https://play.google.com/store/apps/details?id=com.browncecustomer
                },
                navigation: {
                    forcedRedirectEnabled: true,
                }
            },
                dynamicLinks.ShortLinkType.SHORT
            );
            resolve(link)
        } catch (error) {
            console.log('error=>', error)
            reject({ message: 'Error while generating short link...' })
        }
    })
}