import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import FoodLogListItem from '../components/FoodLogListItem';


const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      id
      kcal
      label
      created_at
      food_id
      user_id
    }
  }
`;

const HomeScreen = () => {
  const user_id = 'roman';
  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id,
    }
  });

  if (error) {
    return <Text>{error.message ?? 'Failed to fetch data'}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subTitle}>Calories</Text>
        <Text> 1770 - 360 = 1410</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.subTitle}>Today's logged food</Text>
        <Link href="/search" asChild>
          {/* <Button title='ADD FOOD' /> */}
          <Text>ADD FOOD</Text>
        </Link>
      </View>

      {
        loading
          ? <ActivityIndicator />
          : <FlatList
            data={data.foodLogsForDate}
            renderItem={({ item }) => <FoodLogListItem item={item} />}
            contentContainerStyle={{ gap: 5, }}
          />
      }
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