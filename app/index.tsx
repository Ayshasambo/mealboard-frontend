
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, FlatList} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Link}from 'expo-router';
import MealCategory from '@/components/CardCategory';
import { useFetch } from '@/hooks/useFetch'; 
import {usePost} from '@/hooks/usePost'
import { useDelete } from '@/hooks/useDelete'
import Button from "@/components/Button"
import AddCategory from '@/components/AddCategory'; 
import MealPlanner from '@/components/MealPlanner'

type Category = {
  _id: string;
  category: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data = [], isLoading, isError, refetch } = useFetch<Category[]>('/api/mealcategory');
  const postCategory = usePost<Category, { category: string }>('/api/mealcategory', ['mealData', '/api/mealcategory']);
  const deleteCategory = useDelete('/api/mealcategory', ['mealData', '/api/mealcategory']);
  //const categories = data.map((cat) => cat.category);
  const isOdd = data.length % 2 === 1;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = (category: string) => {
    postCategory.mutate({ category }); // assumes backend expects { name }
    refetch();
    setIsModalVisible(false); 
    setCategoryName('');
  };

  const handleDeleteCategory = (categoryToDelete: Category) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${categoryToDelete.category}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategory.mutate(categoryToDelete._id, {
              onSuccess: () => {
                refetch(); 
              },
            });
          },
        },
      ]
    );
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

      {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}> */}
      <View style={{ flex: 1, paddingVertical: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <Link
            key={item._id}
            href={{ pathname: '/menu', params: { category: item.category } }}
            asChild
          >
            <MealCategory
              title={item.category}
              onPress={() => console.log(`${item.category} pressed`)}
              onDelete={() => handleDeleteCategory(item)}
            />
          </Link>
        )}
      />
      {/* {data.map((item, index) => {
          const isLastOddCard = isOdd && index === data.length - 1;

          return (
            <View
              key={item._id}
              style={{
                width: isLastOddCard ? '100%' : '48%',
                alignItems: isLastOddCard ? 'center' : 'flex-start',
                marginBottom: 15,
              }}
            >
            <Link href={{ pathname: '/menu', params: { category:item.category } }} asChild>
                <MealCategory 
                  title={item.category} 
                  onPress={() => console.log(`${item.category} pressed`)}
                  onDelete={() => handleDeleteCategory(item)}
                />
              </Link>
            </View>
          );
        })} */}
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

<View style={{ marginTop: 30 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginBottom: 10 }}>
    Weekly Meal Plan
  </Text>

  {['Sunday', 'Monday', 'Tuesday'].map((day) => (
    <MealPlanner
      key={day}
      day={day}
      meals={[
        { category: 'Breakfast', dish: 'Bacon & Coffee' },
        { category: 'Lunch', dish: 'Jollof Rice' },
        { category: 'Dinner', dish: 'Beans & Plantain' },
      ]}
    />
  ))}
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

