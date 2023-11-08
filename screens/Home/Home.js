import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity  } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const images = [
  require('../../images/images1.png'), // Replace with your image file paths
  require('../../images/images2.jpg'),
  require('../../images/images1.png'),
];

function HomePage() {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const changeImageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(changeImageInterval);
    };
  }, []);

  const handleTires = () => {
      navigation.navigate('Tires');
      console.log('sad');
  };


  return (
    <View style={styles.homepage}>
      <View style={styles.adBox}>
        <Image source={images[currentImageIndex]} style={styles.adImage} />
      </View>
      <View style={styles.content}>
      <View style={styles.menuImages}>

    <Button title='Tires'  onPress={handleTires}/>

     
 {/*  <TouchableOpacity
  style={styles.menuItem}
        onPress={() => {
          navigation.navigate('Tires'); // Navigate to the "TiresSearchMenu" screen
        }}
      >
    <View style={styles.menuImageContainer}>
      
    </View>
    
  </TouchableOpacity> */}


      
    </View>
        {/* Your content goes here */}
        <Text style={styles.heading}>AUTO GARAGE</Text>
        <Text>Everything for your car</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchField}
            placeholder="Search here"
          />
          <Button title="Search" style={styles.searchButton} />
        </View>
      </View>
      <View style={styles.adBox}>
        <Image source={images[currentImageIndex]} style={styles.adImage} />
        {/* Right Ad Content */}
      </View>
      {/* Footer goes here */}
    </View>
  );
}

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
  },
  adBox: {
    flex: 1,
    width: '20%',
    padding: 5,
    height: '50%',
    backgroundColor: '#f0f0f0',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 2,
    width: '60%',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    padding: 10,
  },
  searchField: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    fontSize: 16,
    padding: 2,
    backgroundColor: 'blue',
    color: '#f0f0f0',
    borderRadius: 3,
  },
  // Add styles for the footer here
});
export default HomePage;
