/* eslint-disable react-native/no-inline-styles */
import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSharedState } from '@features/tabs/SharedContext'
import Graphics from '@components/Home/Graphics'
import HeaderSection from '@components/Home/HeaderSection'
import MainList from '@components/list/MainList'

const DeliveryScreen = () => {
    const { styles } = useStyles(homeStyles)
    const insets = useSafeAreaInsets();
    const { scrollYGlobal } = useSharedState();

    const moveUpStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
        )
        return {
            transform: [{ translateY: translateY }],
        }
    })

    const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, -50],
        )
        return {
            transform: [{ translateY: translateY }],
        }
    })

    const backgroundColorChanges = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1])
        return {
            backgroundColor: `rgba(255,255,255,${opacity})`,
        }
    })


    return (
        <View style={[styles.container]}>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />

            <Animated.View style={[moveUpStyle]}>
                <Animated.View style={[moveUpStyleNotExtrapolate]}>
                    <Graphics />
                </Animated.View>

                <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
                    <HeaderSection />
                </Animated.View>

            </Animated.View>
            <Animated.View style={[moveUpStyle]}>
                <MainList />
            </Animated.View>

        </View>
    )
}

export default DeliveryScreen