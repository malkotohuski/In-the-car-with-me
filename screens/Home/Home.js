import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

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

    const handlerSuspension = () => {
        navigation.navigate('Suspension')
        console.log('Suspension clicked !!!');
    }

    const handlerCarBody = () => {
        navigation.navigate('Car body')
        console.log('Car body clicked !!!');
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
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerSuspension} >
                            <Text>Suspension </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerCarBody} >
                            <Text>Car body </Text>
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

export default HomePage;
