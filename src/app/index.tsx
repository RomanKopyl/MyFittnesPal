import { Link } from 'expo-router'
import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import FoodListItem from '../components/FoodListItem'


const foodItems = [
    { label: "Pizza", nutrients: { ENERC_KCAL: 75 }, brand: 'Dominos' },
    { label: "Pizza", nutrients: { ENERC_KCAL: 75 }, brand: 'Dominos' },
]

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subTitle}>Calories</Text>
                <Text> 1770 - 360 = 1410</Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.subTitle}>Today's logged fodd</Text>
                <Link href="/search" asChild>
                    {/* <Button title='ADD FOOD' /> */}
                    <Text>ADD FOOD</Text>
                </Link>
            </View>

            <FlatList
                data={foodItems}
                renderItem={({ item }) => <FoodListItem item={item} />}
                contentContainerStyle={{ gap: 5, }}
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
    },
})