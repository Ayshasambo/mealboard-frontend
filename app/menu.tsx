import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type MenuItem = {
  id: string;
  name: string;
  description?: string;
};

const dummyMenu: MenuItem[] = [
  { id: '1', name: 'Jollof Rice', description: 'With fried plantain' },
  { id: '2', name: 'Moi Moi', description: 'Steamed bean pudding' },
  { id: '3', name: 'Akara', description: 'Fried bean cakes' },
  { id: '4', name: 'Pap & Akara' },
  { id: '5', name: 'Yam & Egg Sauce' },
  { id: '6', name: 'Fried Rice' },
];

const MenuListScreen = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const increaseQty = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };
  const { category } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Menu</Text>

      <FlatList
        data={dummyMenu}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.description && <Text style={styles.cardSubtitle}>{item.description}</Text>}

            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyCount}>{quantities[item.id] || 0}</Text>
              <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MenuListScreen;

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
