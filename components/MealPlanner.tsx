import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  day: string;
  meals: {
    category: string;
    dish: string;
  }[];
};

export default function MealPlanner({ day, meals }: Props) {
  return (
    <View style={styles.card}>
      {/* Meal Icon */}
      <Ionicons name="restaurant" size={24} color="#E91E63" style={styles.icon} />
      
      {/* Day Title */}
      <Text style={styles.dayText}>{day}</Text>

      {/* Meal Info */}
      {meals.map((meal, index) => (
        <View key={index} style={styles.mealRow}>
          <Text style={styles.category}>{meal.category}</Text>
          <Text style={styles.dish}>{meal.dish}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF1F7',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  category: {
    fontWeight: '600',
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  dish: {
    fontFamily: 'Poppins-Regular',
    color: '#222',
  },
});
