
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Link}from 'expo-router';
import MealCategory from '@/components/CardCategory';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Drinks'];
  const isOdd = categories.length % 2 === 1;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
             placeholder="Search menu..."
             value={searchTerm}
             onChangeText={setSearchTerm}
             style={{
                 flex: 1,
                 marginLeft: 8,
                 fontFamily: 'Poppins-Regular',
              }}
           />
        </View>
        <TouchableOpacity style={{marginLeft: 10, backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, }}>
          <Ionicons name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {categories.map((title, index) => {
          const isLastOddCard = isOdd && index === categories.length - 1;

          return (
            <View
              key={title}
              style={{
                width: isLastOddCard ? '92%' : '48%',
                alignItems: isLastOddCard ? 'center' : 'flex-start',
                marginBottom: 15,
              }}
            >
            {/* <MealCategory title={title} onPress={() => console.log(`${title} pressed`)} /> */}
            <Link href={{ pathname: '/menu', params: { category: title } }} asChild>
                <MealCategory title={title} onPress={() => console.log(`${title} pressed`)} />
              </Link>
            </View>
          );
        })}
            {/* <MealCategory title="Breakfast" onPress={() => console.log('Breakfast pressed')} />
            <MealCategory title="Lunch" onPress={() => console.log('Lunch pressed')} />
            <MealCategory title="Dinner" onPress={() => console.log('Dinner pressed')} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
  },
  
});

