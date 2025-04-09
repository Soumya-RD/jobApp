import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BookmarksScreen = () => {
  const navigation = useNavigation();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    loadBookmarkedJobs();
  }, []);

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

  const removeBookmark = async (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  return (
    <FlatList
      data={bookmarkedJobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.locality}</Text>
            <Text>Salary: {item.salary}</Text>
            <Text>Phone: {item.whatsapp_no}</Text>
          </TouchableOpacity>
          <Button title="Remove Bookmark" onPress={() => removeBookmark(item.id)} />
        </View>
      )}
    />
  );
};

export default BookmarksScreen;
