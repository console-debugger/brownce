import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated';
import { LIGHT_BROWN } from '../utils/colors'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { Touchable, MyImage, MyView, NotificationPopup } from '../components/customComponent'
import { activeSearchIcon, inactiveSearchIcon, activeChatIcon, inactiveChatIcon, activeHandshake, inactiveHandshake, activeCart, inactiveCart, menuIcon, profileActive, profileInactive, homeActive, homeInactiveActive, requestActive, requestInactiveActive, inactiveMenuIcon } from '../components/icons'
import styles from './styles'
import { useSelector } from 'react-redux';
import { isCustomer } from '../components/helper';

const MyBottomTab = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const storeState = useSelector(s => { return s })
    const { notificationCount } = storeState.profileReducer

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <SafeAreaView style={{ backgroundColor: LIGHT_BROWN, paddingTop: -useSafeAreaInsets().top, borderTopLeftRadius: dynamicSize(40), borderTopRightRadius: dynamicSize(40) }}>
            <MyView style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };


                    return (
                        isCustomer() ?
                            <Touchable
                                key={route + index}
                                activeOpacity={1}
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={[styles['bottomTabBar'], { borderTopLeftRadius: label === 'tabZero' ? dynamicSize(40) : 0, borderTopRightRadius: label === 'tabFour' ? dynamicSize(40) : 0 }]}
                                onLongPress={onLongPress}
                            >
                                {(label === 'tabThree' && notificationCount) ? <NotificationPopup count={notificationCount} /> : null}
                                {label === 'tabZero' && <MyImage source={!isFocused ? profileActive : profileInactive} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabOne' && <MyImage source={!isFocused ? activeSearchIcon : inactiveSearchIcon} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabTwo' && <MyImage source={!isFocused ? activeChatIcon : inactiveChatIcon} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabThree' && <MyImage source={!isFocused ? activeHandshake : inactiveHandshake} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabFive' && <MyImage source={!isFocused ? activeCart : inactiveCart} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}

                                {label === 'tabFour' && <MyImage source={!isFocused ? inactiveMenuIcon : menuIcon} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}

                            </Touchable>
                            :
                            <Touchable
                                key={route + index}
                                activeOpacity={1}
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={[styles['bottomTabBar'], { borderTopLeftRadius: label === 'tabZero' ? dynamicSize(40) : 0, borderTopRightRadius: label === 'tabFour' ? dynamicSize(40) : 0 }]}
                                onLongPress={onLongPress}
                            >
                                {label === 'tabZero' && <MyImage source={!isFocused ? homeActive : homeInactiveActive} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabOne' && <MyImage source={!isFocused ? requestActive : requestInactiveActive} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabTwo' && <MyImage source={!isFocused ? activeChatIcon : inactiveChatIcon} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabThree' && <MyImage source={!isFocused ? activeHandshake : inactiveHandshake} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}
                                {label === 'tabFive' && <MyImage source={!isFocused ? activeCart : inactiveCart} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}

                                {label === 'tabFour' && <MyImage source={!isFocused ? inactiveMenuIcon : menuIcon} resizeMode={'contain'} style={isFocused ? styles['activeIcon'] : styles['inactiveIcon']} />}

                            </Touchable>
                    );
                })}
            </MyView>
        </SafeAreaView>
    )
}

const MyTopTab = ({ state, descriptors, navigation, position }) => {

    const storeState = useSelector(state => { return state })
    const { IN_PROGRESS, PAST, NEW_REQUEST, UPCOMING } = storeState['localeReducer']['locale']

    return (
        <MyView style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = Animated.interpolateNode(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                return (
                    <Touchable
                        key={route + index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        activeOpacity={1}
                        onLongPress={onLongPress}
                        style={isCustomer() ? styles['topTabBar'] : styles['toptabbartwo']}>
                        {label === 'inProgress' &&
                            <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                                <Animated.Text style={styles['topTabBarText']} >{IN_PROGRESS}</Animated.Text>
                            </Animated.View>
                        }
                        {label === 'past' && <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                            <Animated.Text style={styles['topTabBarText']} >{PAST}</Animated.Text>
                        </Animated.View>
                        }
                        {label === 'upcoming' && <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                            <Animated.Text style={styles['topTabBarText']} >{"UPCOMING"}</Animated.Text>
                        </Animated.View>
                        }
                        {label === 'newRequest' &&
                            <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                                <Animated.Text style={[styles['topTabBarText'], { fontSize: isCustomer() ? getFontSize(14) : getFontSize(10) }]} >{NEW_REQUEST}</Animated.Text>
                            </Animated.View>
                        }
                        {label === 'inProgressRequest' && <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                            <Animated.Text style={[styles['topTabBarText'], { fontSize: isCustomer() ? getFontSize(14) : getFontSize(10) }]} >{IN_PROGRESS}</Animated.Text>
                        </Animated.View>
                        }
                        {label === 'upcomingRequest' &&
                            <Animated.View style={[styles['borderView'], { borderBottomWidth: isFocused ? 3 : 0 }]}>
                                <Animated.Text style={[styles['topTabBarText'], { fontSize: isCustomer() ? getFontSize(14) : getFontSize(10) }]} >{UPCOMING}</Animated.Text>
                            </Animated.View>
                        }
                    </Touchable>
                );
            })}
        </MyView>
    )
}

export { MyBottomTab, MyTopTab }