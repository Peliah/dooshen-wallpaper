import { images } from '@/lib/data';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ListViewProps = {
  onImagePress?: (imageId: number) => void;
};

const ListView = ({ onImagePress }: ListViewProps) => {
  return (
    <View style={styles.container}>
      {
        images.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              onPress={() => onImagePress?.(image.id)}
              style={styles.imageContainer}
            >
                <Image source={image.image} style={styles.image} />
                <View style={styles.imageInfo}>
                    <Text style={styles.name}>{image.name}</Text>
                    <Text style={styles.description}>{image.description}</Text>
                    <View style={styles.numberOfWallpapersContainer}>
                        <Text style={styles.numberOfWallpapers}>{image.numberOfWallpapers} Wallpapers</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default ListView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        gap: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        // backgroundColor: '#fff',
    },
    imageContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    image: {
        borderRadius: 20,
        width: 280,
        height: 190,
    },
    imageInfo: {
        flex: 1,
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        gap: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        fontFamily: 'Poppins-Regular',
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        fontFamily: 'Poppins-Light',
    },
    numberOfWallpapersContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(135, 135, 135, 0.1)',
        overflow: 'hidden',
    },
    numberOfWallpapers: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Light',
        color: '#000000',
    },
})