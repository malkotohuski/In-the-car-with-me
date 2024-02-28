import React from "react";
import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";


const Messages = () => {
    const { user } = useAuth();
    console.log("ssss", user);
    return (
        <Pressable style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
            <View>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: 'cover',
                    }}
                    source={{ uri: user?.user?.userImage }}
                />
            </View>

            <View style={{ paddingLeft: 10 }}>
                <Text>{user?.user?.username}</Text>
                <Text>{user?.user?.fName} {user?.user?.lName}</Text>
            </View>
        </Pressable>
    )


}

export default Messages;

const styles = StyleSheet.create({

})