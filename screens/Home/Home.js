import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const images = [
  require('../../images/suspension.jpg'), // Replace with your image file paths
  require('../../images/images3.jpg'),
  require('../../images/tires.jpg'),
  require('../../images/gearbox.jpg'),
  require('../../images/motorOil.jpg'),
];

function HomePage({ navigation }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const changeImageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(changeImageInterval);
    };
  }, []);

  const handlerTires = () => {
    navigation.navigate('Tires')
    console.log('Tires clicked !!!');
  }

  const handlerMotorOil = () => {
    navigation.navigate('MotorOil')
    console.log('Motor oil clicked !!!');
  }

  return (
    <View style={styles.homepage}>
      <View style={styles.adBox}>
        <Image source={images[currentImageIndex]} style={styles.adImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.menuImages}>
          <View>
            <TouchableOpacity style={styles.tiresButton} onPress={handlerTires} >
              <Text>Tires</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.tiresButton} onPress={handlerMotorOil} >
              <Text>Motor Oil</Text>
            </TouchableOpacity>
          </View>

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
    overflow: 'hidden', // Add this line to hide overflowing content
  },
  adImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Add this line to ensure the entire image is visible
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
  menuImages: {
  },
  tiresButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 5,
  }
  // Add styles for the footer here
});
export default HomePage;
