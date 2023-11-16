import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Video() {
    const youtubeVideoIds = [
        'your_youtube_video_id_1',
        'your_youtube_video_id_2',
        'your_youtube_video_id_3',
        // Add more video IDs as needed
    ];

    return (
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
});
