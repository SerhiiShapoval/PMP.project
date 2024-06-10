import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreateNoteScreen from './screens/CreateNoteScreen';
import ViewNoteScreen from './screens/ViewNoteScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
        <Stack.Screen name="ViewNote" component={ViewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
