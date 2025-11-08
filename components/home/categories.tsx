import { images } from '@/lib/data'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'

type CategoriesImageProps = {
  onImagePress?: (imageId: number) => void;
};

const CategoriesImage = ({ onImagePress }: CategoriesImageProps) => {
    const { width: screenWidth } = useWindowDimensions()
    const padding = 16
    const gap = 12
    const itemWidth = (screenWidth - (padding * 2) - (gap * 2)) / 3

    return (
        <View style={styles.gridContainer}>
            {images.map((image, index) => (
                <TouchableOpacity
                    key={image.id}
                    onPress={() => onImagePress?.(image.id)}
                    style={[
                        styles.imageContainer,
                        // {
                        //     width: itemWidth,
                        //     marginRight: (index + 1) % 3 !== 0 ? gap : 0,
                        // }
                    ]}
                >
                    <Image source={image.image} style={[styles.image,]} />
                    <View style={styles.imageInfo}>
                        <Text style={styles.name}>{image.name}</Text>
                        <Text style={styles.description}>{image.description}</Text>
                        <BlurView intensity={20} style={styles.numberOfWallpapersContainer}>
                            <Text style={styles.numberOfWallpapers}>{image.numberOfWallpapers} Wallpapers</Text>
                        </BlurView>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default CategoriesImage

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        gap: 20,
    },
    imageContainer: {
        // marginBottom: 20,
        position: 'relative',
    },
    image: {
        borderRadius: 20,
        width:424,
            height: 290.22,
    },
    imageInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Light',
    },
    numberOfWallpapers: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Light',
        color: '#FFFFFF',
    },
    numberOfWallpapersContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
    },
})