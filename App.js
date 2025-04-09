import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsScreen from './src/screens/JobsScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobsList" component={JobsScreen} options={{ title: 'Jobs' }} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Jobs" component={JobsScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="briefcase" color={color} size={size} />) }}
        />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="bookmark" color={color} size={size} />) }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
