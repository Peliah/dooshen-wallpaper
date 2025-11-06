import { images } from '@/lib/data';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const CategoryImages = ({ categoryId }: { categoryId: number }) => {
    const category = images.find(img => img.id === categoryId);
    const wallpapers = category?.wallpapers || [];
    const { width: screenWidth } = useWindowDimensions();
    const containerPadding = 16;
    const gap = 12;
    const itemWidth = (screenWidth - (containerPadding * 2) - (gap * 2)) / 3;

    return (
        <View style={styles.container}>
            {
                wallpapers.map((wallpaper, index) => (
                    <View 
                        key={wallpaper.id} 
                        style={[
                            styles.imageContainer,
                            // {
                            //     width: itemWidth,
                            //     marginRight: (index + 1) % 3 !== 0 ? gap : 0,
                            //     marginBottom: gap,
                            // }
                        ]}
                    >
                        <Image source={wallpaper.image} style={[styles.image]} />
                        <View style={styles.imageInfo}>
                            <Text style={styles.name}>{wallpaper.name}</Text>
                            <BlurView intensity={20} style={styles.numberOfWallpapersContainer}>
                                <Text style={styles.description}>{wallpaper.name}</Text>
                            </BlurView>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default CategoryImages

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        borderRadius: 30,
    },
    imageContainer: {
        borderRadius: 20,
        position: 'relative',
        marginBottom: 16,
    },
    image: {
        borderRadius: 20,
        width: 190,
        height: 290,
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