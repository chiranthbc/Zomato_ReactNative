import { View, Image, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@states/reduxHook'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import { useSharedState } from '@features/tabs/SharedContext'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import Icon from '@components/global/Icon'
import { Colors } from '@unistyles/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import RollingContent from 'react-native-rolling-bar'
import CustomText from '@components/global/CustomText'
import { setVegMode } from '@states/reducer/userSlice'


const searchItems: string[] = ['Search "chai samosa" ', 'Search "Cake"', 'Search "Ice Cream"', 'Search "Pizza"', 'Search "PaniPuri"']
const SearchBar = () => {
    const dispatch = useAppDispatch()
    const isVegMode = useAppSelector(state => state.user.isVegMode)
    const { styles } = useStyles(homeStyles);
    const { scrollYGlobal } = useSharedState();

    const textColorAniamtion = useAnimatedStyle(() => {
        const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0])
        return {
            color: `rgb(${textColor}, ${textColor}, ${textColor})`,
        }
    })

    return (
        <>
            <SafeAreaView />
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
                    <Icon iconFamily='Ionicons' name="search" color={isVegMode ? Colors.active : Colors.primary} size={RFValue(20)} />
                    <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
                        {searchItems?.map((item, index) => {
                            return (
                                <CustomText fontSize={12} fontFamily='Okra-Medium' key={index}>
                                    {item}
                                </CustomText>
                            )
                        })}
                    </RollingContent>
                    <Icon iconFamily='Ionicons' name="mic-outline" color={isVegMode ? Colors.active : Colors.primary} size={RFValue(20)} />
                </TouchableOpacity>
                <Pressable style={styles.vegMode} onPress={() => dispatch(setVegMode(!isVegMode))} >
                    <Animated.Text style={[textColorAniamtion, styles.animatedText]}>
                        VEG
                    </Animated.Text>
                    <Animated.Text style={[textColorAniamtion, styles.animatedSubText]}>
                        MODE
                    </Animated.Text>
                    <Image
                        source={
                            isVegMode ?
                                require('@assets/icons/switch_on.png')
                                : require('@assets/icons/switch_off.png')
                        }
                        style={styles.switch}
                    />
                </Pressable>
            </View>
        </>
    )
}

export default SearchBar