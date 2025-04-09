import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import JobDetailsScreen from './JobDetailsScreen';

const Stack = createNativeStackNavigator();

const JobsScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    loadBookmarkedJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=1`);
      setJobs(response.data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarkedJobs = async () => {
    try {
      const savedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      if (savedJobs) {
        setBookmarkedJobs(JSON.parse(savedJobs));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (job) => {
    let updatedBookmarks;
    if (bookmarkedJobs.some((item) => item.id === job.id)) {
      updatedBookmarks = bookmarkedJobs.filter((item) => item.id !== job.id);
    } else {
      updatedBookmarks = [...bookmarkedJobs, job];
    }

    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.locality}</Text>
            <Text>Salary: {item.salary}</Text>
            <Text>Phone: {item.whatsapp_no}</Text>
          </TouchableOpacity>
          <Button
            title={bookmarkedJobs.some((j) => j.id === item.id) ? 'Remove Bookmark' : 'Bookmark'}
            onPress={() => toggleBookmark(item)}
          />
        </View>
      )}
    />
  );
};

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobsList" component={JobsScreen} options={{ headerShown:false }} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ headerShown:false }} />
  </Stack.Navigator>
);

export default JobsStack;
