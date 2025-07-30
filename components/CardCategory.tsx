import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type Props = {
    title: string;
    onPress: () => void;
  };
  
  export default function MealCategory({ title, onPress }: Props) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#FDEFF4',
          borderRadius: 12,
          padding: 20,
          margin: 5,
          width: '100%',
          alignItems: 'center',
          //flexDirection: 'row'
        }}
      >
        <Ionicons name="fast-food-outline" size={24} color="#E91E63" />
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            marginTop: 10,
            fontWeight: '500',
            color: '#333',
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
}
  
