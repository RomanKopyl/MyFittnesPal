
import { useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import FoodListItem from '../components/FoodListItem';

const foodItems = [
  { label: "Pizza", cal: 75, brand: 'Dominos' },
  { label: "Apple", cal: 25, brand: 'Other' },
  { label: "Coffee", cal: 150, brand: 'Americano' }
]


export default function App() {
  const [searchValue, setSearchValue] = useState('');

  const preformSearch = () => {
    console.warn('Searchin for ', searchValue);

    setSearchValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search...'
        style={styles.input}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {searchValue && <Button title='Search' onPress={preformSearch} />}

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
  input: {
    backgroundColor: '#f2f2f2',
    gap: 10,
    padding: 20,
  }
});
