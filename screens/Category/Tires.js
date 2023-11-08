import React, { useState } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';



export default function TiresSearchMenu  () {
  const [season, setSeason] = useState('all');
  const [number, setNumber] = useState('15');

  const handleSearch = () => {
    // Implement your search logic here, using the 'season' and 'number' state variables.
    // You can make an API request, update state, or navigate to a results screen.
    // For now, we'll just log the selected criteria.
    console.log('Searching for Season:', season, 'Number:', number);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <Text>Season:</Text>
        <Picker
          selectedValue={season}
          onValueChange={(itemValue) => setSeason(itemValue)}
        >
          <Picker.Item label="Winter" value="winter" />
          <Picker.Item label="Summer" value="summer" />
          <Picker.Item label="All Seasons" value="all-seasons" />
          <Picker.Item label="All" value="all" />
        </Picker>
      </View>
      <View style={styles.dropdown}>
        <Text>Number:</Text>
        <Picker
          selectedValue={number}
          onValueChange={(itemValue) => setNumber(itemValue)}
        >
          <Picker.Item label="15" value="15" />
          <Picker.Item label="16" value="16" />
          <Picker.Item label="17" value="17" />
          <Picker.Item label="18" value="18" />
          {/* Add more options as needed */}
        </Picker>
      </View>
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  dropdown: {
    flex: 1,
  },
});


