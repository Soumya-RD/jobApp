import React from 'react';
import { View, Text } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{job.title}</Text>
      <Text style={{ fontSize: 18 }}>Location: {job.locality}</Text>
      <Text style={{ fontSize: 18 }}>Salary: {job.salary}</Text>
      <Text style={{ fontSize: 18 }}>Contact: {job.whatsapp_no}</Text>
    </View>
  );
};

export default JobDetailsScreen;
