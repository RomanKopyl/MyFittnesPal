
import { gql, useLazyQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import FoodListItem from '../components/FoodListItem';

const query = gql`
  query Query($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
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
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [runSearch, { data, loading, error }] = useLazyQuery(query);
  const [permission, requestPermission] = useCameraPermissions();

  // Request only if permission is not granded, and we can ask again
  requestPermission();

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

  if (scannerEnabled) {
    return (
      <View style={{
      }}>
        <CameraView style={{
          width: '100%',
          height: '100%'
        }}
          onBarcodeScanned={(data) => {
            runSearch({
              variables: { upc: data.data },
            });
            setScannerEnabled(false);
          }} />
        <Ionicons
          onPress={() => setScannerEnabled(false)}
          name="close"
          size={30}
          color="dimgray"
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
        <TextInput
          placeholder='Search...'
          style={styles.input}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <Ionicons
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={32}
          color="black"
        />
      </View>

      {searchValue && <Button title='Search' onPress={preformSearch} />}
      {loading && <ActivityIndicator />}

      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
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
    flex: 1,
  }
});
