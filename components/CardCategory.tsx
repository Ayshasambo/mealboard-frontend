import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



type Props = {
    title: string;
    onPress: () => void;
    onDelete?: () => void;
  };
  
  export default function MealCategory({ title, onPress, onDelete }: Props) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#FDEFF4',
          borderRadius: 12,
          padding: 20,
          marginVertical: 10,
          marginRight: 10,
          width: 150, // Fixed width for horizontal layout
          alignItems: 'center',
          // backgroundColor: '#FDEFF4',
          // borderRadius: 12,
          // padding: 20,
          // margin: 5,
          // width: 150,
          // alignItems: 'center',
          //flexDirection: 'row'
        }}
      >
        {/* Trash Icon (positioned absolutely top-right) */}
      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <Feather name="trash-2" size={12} color="#E91E63" />
        </TouchableOpacity>
      )}
        {/* <Ionicons name="fast-food-outline" size={24} color="#E91E63" /> */}
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
  
