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
    
    // Calculate responsive dimensions
    // For screens wider than 1440px, use max container width
    const maxContainerWidth = 1440
    const containerPadding = 47 * 2 // padding from screenContainer
    const innerPadding = 16 * 2 // padding from container
    const gap = 20
    
    // Determine number of columns based on screen width
    let numColumns = 3
    if (screenWidth < 768) {
        numColumns = 1 // Mobile: 1 column
    } else if (screenWidth < 1024) {
        numColumns = 2 // Tablet: 2 columns
    } else {
        numColumns = 3 // Desktop: 3 columns
    }
    
    // Calculate available width
    const availableWidth = Math.min(screenWidth - containerPadding - innerPadding, maxContainerWidth - containerPadding - innerPadding)
    const itemWidth = (availableWidth - (gap * (numColumns - 1))) / numColumns
    const aspectRatio = 424 / 290.22 // Original aspect ratio
    const itemHeight = itemWidth / aspectRatio
    
    // Responsive font sizes
    const nameFontSize = screenWidth < 768 ? 18 : screenWidth < 1024 ? 19 : 20
    const descriptionFontSize = screenWidth < 768 ? 14 : screenWidth < 1024 ? 15 : 16
    const badgeFontSize = screenWidth < 768 ? 12 : 14
    const padding = screenWidth < 768 ? 12 : 16

    return (
        <View style={styles.gridContainer}>
            {images.map((image, index) => (
                <TouchableOpacity
                    key={image.id}
                    onPress={() => onImagePress?.(image.id)}
                    style={[
                        styles.imageContainer,
                        {
                            width: itemWidth,
                            height: itemHeight,
                        }
                    ]}
                >
                    <Image 
                        source={image.image} 
                        style={[styles.image, { width: itemWidth, height: itemHeight }]} 
                        contentFit="cover"
                    />
                    <View style={[styles.imageInfo, { padding }]}>
                        <Text style={[styles.name, { fontSize: nameFontSize }]}>{image.name}</Text>
                        <Text style={[styles.description, { fontSize: descriptionFontSize }]}>{image.description}</Text>
                        <BlurView intensity={20} style={styles.numberOfWallpapersContainer}>
                            <Text style={[styles.numberOfWallpapers, { fontSize: badgeFontSize }]}>{image.numberOfWallpapers} Wallpapers</Text>
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
        gap: 20,
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
    },
    imageInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
    },
    description: {
        fontWeight: '400',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Light',
        marginBottom: 8,
    },
    numberOfWallpapers: {
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