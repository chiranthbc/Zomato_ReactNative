/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import { recommendedListData } from '@utils/dummyData'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Constants'

const RecommendedList = () => {
    const { styles } = useStyles(cardStyles);

    const renderItem = ({ item }: any) => {
        return (
            <ScalePress style={styles.itemContainer}
                onPress={() => {
                    navigate('RestaurantScreen', {
                        item: item,
                    })
                }}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} defaultSource={require('@assets/images/coming_soon.jpg')} />
                    {
                        item?.discount && (
                            <View style={styles.discountContainer}>
                                <CustomText color={Colors.background} fontSize={10} fontFamily='Okra-Bold'>
                                    {item?.discount}
                                </CustomText>
                                {
                                    item?.discountAmount && (
                                        <CustomText style={{ lineHeight: 11 }} color={Colors.background} fontSize={5} fontFamily='Okra-Medium'>
                                            {item?.discountAmount}
                                        </CustomText>
                                    )
                                }
                            </View>
                        )}
                </View>
            </ScalePress>
        )
    }

    return (
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <FlatList
                numColumns={Math.ceil(recommendedListData?.length / 2)}
                data={recommendedListData}
                renderItem={renderItem}
                scrollEnabled={false}
                keyExtractor={item => item?.id?.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                style={styles.recommendedContainer}
            />
        </ScrollView>
    )
}

export default RecommendedList