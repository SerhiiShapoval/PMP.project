// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  const fetchNotes = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  const deleteNote = async (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <View style={styles.container} key={refreshKey}>
      <Text style={styles.title}>To-Do List App</Text>
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Your Tasks</Text>
        {notes.length === 0 ? (
          <Text style={styles.noNotesText}>No tasks available</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.noteContainer}>
                <TouchableOpacity
                  style={styles.noteTextContainer}
                  onPress={() => navigation.navigate('ViewNote', { note: item })}
                >
                  <Text style={styles.note}>{item.title} - {item.date}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(index)}>
                  <Text style={styles.deleteButton}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <Button
        title="Add Note"
        onPress={() => navigation.navigate('CreateNote')}
      />
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
  notesContainer: {
    flex: 1,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noNotesText: {
    fontSize: 16,
    color: 'gray',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  noteTextContainer: {
    flex: 1,
  },
  note: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 8,
  },
});
