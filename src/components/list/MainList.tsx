/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import { View, Text, SectionList, NativeSyntheticEvent, NativeScrollEvent, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import ExploreSection from '@components/Home/ExploreSection'
import Restauant from '@components/Home/Restauant'
import { useStyles } from 'react-native-unistyles'
import { restaurantStyles } from '@unistyles/restuarantStyles'
import { useSharedState } from '@features/tabs/SharedContext'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

const SectionedData = [
    {
        title: "Explore",
        data: [{}],
        renderItem: () => <ExploreSection />
    },
    {
        title: "Restaurants",
        data: [{}],
        renderItem: () => <Restauant />
    },
]

const MainList = () => {
    const { styles } = useStyles(restaurantStyles);
    const { scrollY, scrollToTop, scrollYGlobal } = useSharedState()
    const previousScrollYTopButton = useRef<number>(0)
    const previousScrollY = useRef(0)
    const sectionListRef = useRef<SectionList>(null)

    const [isRestaurantVisible, setIsRestaurantVisible] = useState(false);
    const [isNearEnd, setIsNearEnd] = useState(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event?.nativeEvent?.contentOffset?.y
        const isScrollingDown = currentScrollY > previousScrollY.current;

        scrollY.value = isScrollingDown ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 300 })
        scrollYGlobal.value = currentScrollY
        previousScrollY.current = currentScrollY

        const containerHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
        const offset = event?.nativeEvent?.contentOffset?.y

        setIsNearEnd(offset + layoutHeight >= containerHeight - 500)
    }

    const handleScrolltoTop = async () => {
        scrollToTop()
        sectionListRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
            viewPosition: 0,
        })
    }

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollYGlobal?.value < previousScrollYTopButton.current && scrollYGlobal.value > 180
        const opacity = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0, { duration: 300 })
        const translateY = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10, { duration: 300 })

        previousScrollYTopButton.current = scrollYGlobal.value
        return {
            opacity,
            transform: [{ translateY }],
        }
    })

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80,
    }

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const restaurantVisible = viewableItems.some(
            (item) => item?.section?.title === 'Restaurants' && item?.isViewable
        )
        setIsRestaurantVisible(restaurantVisible)
    }

    return (
        <>
            <SectionList
                sections={SectionedData}
                overScrollMode='always'
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                stickySectionHeadersEnabled={true}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
            />


        </>
    )

}

export default MainList