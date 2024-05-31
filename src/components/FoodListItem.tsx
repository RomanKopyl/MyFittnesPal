import { gql, useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  item: {
    food: {
      foodId?: string
      label?: string
      brand?: string
      nutrients: {
        ENERC_KCAL: number
      }
    }
  }
}

const mutation = gql`
  mutation MyMutation(
    $food_id: String!, 
    $kcal: Int!, 
    $label: String!, 
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id, 
      kcal: $kcal, 
      user_id: $user_id, 
      label: $label
    ) {
      created_at
      food_id
      id
      kcal
      label
      user_id
    }
}`;

const FoodListItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();
  const [logFood] = useMutation(mutation, {
    refetchQueries: ['foodLogsForDate']
  });

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        kcal: item.food.nutrients.ENERC_KCAL,
        label: item.food.label,
        user_id: 'roman',
      }
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {item.food.label}
        </Text>
        <Text style={styles.text}>
          {item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}
        </Text>
      </View>

      <AntDesign
        onPress={onPlusPressed}
        name="plus"
        size={30}
        color="royalblue" />
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