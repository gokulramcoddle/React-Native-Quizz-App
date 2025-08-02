// components/CustomAlert.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function AppAlert({ visible, title, message, onClose }: Props) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.box}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
