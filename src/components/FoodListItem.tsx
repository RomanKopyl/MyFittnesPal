import { AntDesign } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    item: {
        foodId?: string
        label?: string
        brand?: string
        nutrients: {
            ENERC_KCAL: number
        }
    }
}

const FoodListItem: React.FC<Props> = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>
                    {item.label}
                </Text>
                <Text style={styles.text}>
                    {item.nutrients.ENERC_KCAL} cal, {item.brand}
                </Text>
            </View>

            <AntDesign name="plus" size={30} color="royalblue" />
        </View>
    );
}

export default FoodListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'f6f6f6',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        gap: 5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        color: 'dimgray',
    },
});