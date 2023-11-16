import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Basket() {
    const [basketItems, setBasketItems] = useState([
        { id: '1', name: 'Item 1', quantity: 2, price: 10 },
        { id: '2', name: 'Item 2', quantity: 1, price: 20 },
        { id: '3', name: 'Item 3', quantity: 3, price: 15 },
    ]);

    // Function to calculate the total price of items in the basket
    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <View style={styles.container}>
            {/* Basket Items */}
            <FlatList
                data={basketItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text>{item.name}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Total: ${item.quantity * item.price}</Text>
                    </View>
                )}
            />

            {/* Total Price */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Price: ${calculateTotalPrice()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
    },
    totalContainer: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 8,
        alignItems: 'flex-end',
    },
    totalText: {
        fontWeight: 'bold',
    },
});