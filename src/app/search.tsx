
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import FoodListItem from '../components/FoodListItem';


const query = gql`
  query Query($ingr: String) {
    search(ingr: $ingr) {
      text
      hints {
        food {
          foodId
          label
          brand
          nutrients {
            ENERC_KCAL
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState('');

  const [runSearch, { data, loading, error }] = useLazyQuery(query, {
    variables: { ingr: 'Pizza' }
  });

  const foodItems = data?.search?.hints ?? [];

  const preformSearch = () => {
    runSearch({
      variables: { ingr: searchValue }
    });
    console.warn('Searchin for ', searchValue);

    setSearchValue('');
  };

  if (error) {
    return <Text>Failed to search</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search...'
        style={styles.input}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {searchValue && <Button title='Search' onPress={preformSearch} />}

      {loading && <ActivityIndicator />}
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item.food} />}
        ListEmptyComponent={() => <Text>Not found</Text>}
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
