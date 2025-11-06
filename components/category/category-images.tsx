import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CategoryImages = ({ categoryId }: { categoryId: number }) => {
    const category = images.find(img => img.id === categoryId);
    const wallpapers = category?.wallpapers || [];
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const toggleFavorite = (wallpaperId: number) => {
        setFavorites(prev => ({
            ...prev,
            [wallpaperId]: !prev[wallpaperId]
        }));
    };

    return (
        <View style={styles.container}>
            {
                wallpapers.map((wallpaper, index) => {
                    const isFavorited = favorites[wallpaper.id] || false;
                    return (
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
                            <TouchableOpacity
                                style={styles.imageActionButton}
                                onPress={() => toggleFavorite(wallpaper.id)}
                            >
                                {!isFavorited ? (
                                    <BlurView intensity={20} style={styles.imageActionButtonBlur}>
                                        <IconSymbol name="heart" size={24} color="#fff" />
                                    </BlurView>
                                ) : (
                                    <View style={styles.imageActionButtonBlur}>
                                        <IconSymbol name="heart.fill" size={24} color="#FFA821" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    );
                })
            }
        </View>
    )
}

export default CategoryImages

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        borderRadius: 30,
    },
    imageContainer: {
        borderRadius: 20,
        position: 'relative',
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
    imageActionButton: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    imageActionButtonBlur: {
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
})