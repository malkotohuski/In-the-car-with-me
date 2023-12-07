import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function MarkSeatsScreen({ route, navigation }) {
    const { selectedVehicle } = route?.params || {};
    const [markedSeats, setMarkedSeats] = useState([]);

    const handleSeatPress = (seatNumber) => {
        // Allow marking/unmarking only for seats other than seat 1
        if (seatNumber !== 1) {
            const updatedSeats = markedSeats.includes(seatNumber)
                ? markedSeats.filter((seat) => seat !== seatNumber)
                : [...markedSeats, seatNumber];

            setMarkedSeats(updatedSeats);
        }
    };

    const handleContinue = () => {
        // Handle the continue action with the selected vehicle and marked seats
        console.log(`Selected Vehicle: ${selectedVehicle}, Marked Seats: ${markedSeats}`);
        // You can navigate back or perform other actions as needed
    };

    // Generate two rows of seats
    const renderSeats = () => {
        const seats = [];

        // First row: Seats 1 and 2
        seats.push(
            <View key={1} style={{ flexDirection: 'row' }}>
                {[1, 2].map((seatNumber) => (
                    <TouchableOpacity
                        key={seatNumber}
                        onPress={() => handleSeatPress(seatNumber)}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 5,
                            backgroundColor: seatNumber === 1 ? 'red' : markedSeats.includes(seatNumber) ? 'green' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: seatNumber === 1 ? 1 : 1, // Make the first seat not clickable
                        }}
                        disabled={seatNumber === 1} // Disable onPress for the first seat
                    >
                        <Text style={{ color: 'white' }}>{seatNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );

        // Second row: Seats 3, 4, and 5
        seats.push(
            <View key={2} style={{ flexDirection: 'row' }}>
                {[3, 4, 5].map((seatNumber) => (
                    <TouchableOpacity
                        key={seatNumber}
                        onPress={() => handleSeatPress(seatNumber)}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 5,
                            backgroundColor: markedSeats.includes(seatNumber) ? 'green' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'white' }}>{seatNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );

        return seats;
    };

    // Generate multiple rows of tires on each side
    const renderTires = (numberOfRows, side) => {
        const tires = [];

        for (let row = 1; row <= numberOfRows; row++) {
            tires.push(
                <View
                    key={`tire-${side}-${row}`}
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        left: side === 'left' ? -20 : undefined,
                        right: side === 'right' ? -20 : undefined,
                        top: 10 + (row * 40), // Adjust the spacing between rows
                    }}
                >
                    {[1, 2].map((tireNumber) => (
                        <View
                            key={tireNumber}
                            style={{
                                width: 10,
                                height: 30,
                                backgroundColor: 'black',
                                borderRadius: 5,
                                marginLeft: 1,
                            }}
                        />
                    ))}
                </View>
            );
        }

        return tires;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{`Selected Vehicle: ${selectedVehicle}`}</Text>
            {/* Wrap renderSeats and renderTires in a View with styling for the car shape */}
            <View
                style={{
                    flexDirection: 'column', // Arrange the rows, seats, and tires vertically
                    alignItems: 'center', // Center the rows, seats, and tires horizontally
                    position: 'relative', // Make sure the absolute positioning works
                }}
            >
                <View
                    style={{
                        borderColor: 'black',
                        borderTopWidth: 8, // Wider top border
                        borderBottomWidth: 8, // Wider bottom border
                        borderLeftWidth: 4, // Default left border width
                        borderRightWidth: 4, // Default right border width
                        borderRadius: 10,
                        padding: 15, // Increased padding for height
                        marginVertical: 20, // Increased vertical margin for height
                        flexDirection: 'column', // Arrange the rows vertically
                        alignItems: 'center', // Center the rows horizontally
                    }}
                >
                    {renderSeats()}
                </View>
                {/* Add tires on the sides */}
                {renderTires(2, 'left')}
                {renderTires(2, 'right')}
            </View>
            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: 'coral',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}
            >
                <Text style={{ color: 'white' }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MarkSeatsScreen;
