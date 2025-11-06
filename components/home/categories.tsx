import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'

const images = [
    {
        id: 1,
        image: require('@/assets/imgs/nature.jpg'),
        name: 'Nature',
        description: 'Mountains, Forest and Landscapes',
        numberOfWallpapers: 3,
    },
    {
        id: 2,
        image: require('@/assets/imgs/abstract.jpg'),
        name: 'Abstract',
        description: 'Modern Geomentric and artistic designs',
        numberOfWallpapers: 4,
    },
    {
        id: 3,
        image: require('@/assets/imgs/urban.jpg'),
        name: 'Urban',
        description: 'Cities, architecture and Streets',
        numberOfWallpapers: 5,
    },
    {
        id: 4,
        image: require('@/assets/imgs/space.png'),
        name: 'Space',
        description: 'Cosmos, planes and galaxies',
        numberOfWallpapers: 3,
    },
    {
        id: 5,
        image: require('@/assets/imgs/minimalist.jpg'),
        name: 'Minimalist',
        description: 'Clean, Simple and Elegant',
        numberOfWallpapers: 6,
    },
    {
        id: 6,
        image: require('@/assets/imgs/animals.jpg'),
        name: 'Animals',
        description: 'Wildlife and nature photographys',
        numberOfWallpapers: 4,
    },
]
const CategoriesImage = () => {
    const { width: screenWidth } = useWindowDimensions()
    const padding = 16
    const gap = 12
    const itemWidth = (screenWidth - (padding * 2) - (gap * 2)) / 3

    return (
        <View style={styles.gridContainer}>
            {images.map((image, index) => (
                <View
                    key={image.id}
                    style={[
                        styles.imageContainer,
                        {
                            width: itemWidth,
                            marginRight: (index + 1) % 3 !== 0 ? gap : 0,
                        }
                    ]}
                >
                    <Image source={image.image} style={[styles.image, { width: itemWidth, height: itemWidth * 0.67 }]} />
                    <View style={styles.imageInfo}>
                        <Text style={styles.name}>{image.name}</Text>
                        <Text style={styles.description}>{image.description}</Text>
                        <BlurView intensity={20} style={styles.numberOfWallpapersContainer}>
                            <Text style={styles.numberOfWallpapers}>{image.numberOfWallpapers} Wallpapers</Text>
                        </BlurView>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default CategoriesImage

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    imageContainer: {
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        borderRadius: 20,
    },
    imageInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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