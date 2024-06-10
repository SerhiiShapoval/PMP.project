// screens/ViewNoteScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewNoteScreen({ route }) {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{note.date}</Text>
      <Text style={styles.text}>{note.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
});
