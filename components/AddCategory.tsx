import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  onAddCategory: (name: string) => void;
}

export default function AddCategory({
  visible,
  onClose,
  categoryName,
  setCategoryName,
  onAddCategory,
}: AddCategoryModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter category name"
            placeholderTextColor="#D37E9C"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <TouchableOpacity style={styles.button} onPress={() => onAddCategory(categoryName)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#D37E9C',
  },
  input: {
    width: '100%',
    borderColor: '#D37E9C',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#D37E9C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 20,
    color: '#999',
  },
});
