// screens/CreateNoteScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  const saveNote = async () => {
    const newNote = { title, date, text };
    const storedNotes = await AsyncStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    notes.push(newNote);
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new task</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date"
      />
      <TextInput
        style={styles.textArea}
        value={text}
        onChangeText={setText}
        placeholder="Note"
        multiline
        numberOfLines={10}
      />
      <Button title="Save Task" onPress={saveNote} />
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
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});
