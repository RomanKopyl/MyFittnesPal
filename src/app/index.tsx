
import { FlatList, StyleSheet, View } from 'react-native';
import FoodListItem from '../components/FoodListItem';

const foodItems = [
  { label: "Pizza", cal: 75, brand: 'Dominos' },
  { label: "Apple", cal: 25, brand: 'Other' },
  { label: "Coffee", cal: 150, brand: 'Americano' }
]


export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
    gap: 5,
  },
});
