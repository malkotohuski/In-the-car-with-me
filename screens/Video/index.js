import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';


import { WebView } from 'react-native-webview';

export default function Video() {
    const youtubeVideoIds = [
        's9zHW602IqI',
        'KPe18UIJ6gU',
        'WfdHEAHtI_E',
        '7klci6lUuAk',
        // Add more video IDs as needed
    ];

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {youtubeVideoIds.map((videoId) => (
                    <View key={videoId} style={styles.videoContainer}>
                        <WebView
                            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                            style={styles.video}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    videoContainer: {
        height: 200,
        marginBottom: 16,
    },
    video: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'grey',
        marginHorizontal: 20,
    },
});
