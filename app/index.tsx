
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Link}from 'expo-router';
import MealCategory from '@/components/CardCategory';
import { useFetch } from '@/hooks/useFetch'; 
import {usePost} from '@/hooks/usePost'

import Button from "@/components/Button"
import AddCategory from '@/components/AddCategory'; 

type Category = {
  _id: string;
  category: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data = [], isLoading, isError } = useFetch<Category[]>('/api/mealcategory');
  //const postCategory = usePost('/categories', ['categories']);
  const postCategory = usePost<Category, { category: string }>('/api/mealcategory', ['mealcategory']);

  const categories = data.map((cat) => cat.category);
  const isOdd = categories.length % 2 === 1;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = (category: string) => {
    postCategory.mutate({ category }); // assumes backend expects { name }
    setIsModalVisible(false); 
    setCategoryName('');
  };

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
        <TouchableOpacity style={{marginLeft: 10, backgroundColor: '#D7B4F3', padding: 10, borderRadius: 10, }}>
          <Ionicons name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
       
      {isLoading && <ActivityIndicator size="large" color="#3e6974" />}
      {isError && <Text style={{ color: 'red' }}>Failed to load categories</Text>}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {categories.map((title, index) => {
          const isLastOddCard = isOdd && index === categories.length - 1;

          return (
            <View
              key={title + index}
              style={{
                width: isLastOddCard ? '100%' : '48%',
                alignItems: isLastOddCard ? 'center' : 'flex-start',
                marginBottom: 15,
              }}
            >
            <Link href={{ pathname: '/menu', params: { category: title } }} asChild>
                <MealCategory title={title} onPress={() => console.log(`${title} pressed`)} />
              </Link>
            </View>
          );
        })}
      </View>
      <Button
        title="Add New Category"
        onPress={() => {
          setIsModalVisible(true)
        }}
      />
      {isModalVisible && (
        <AddCategory
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        onAddCategory={handleAddCategory}
        />
      )}
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

