import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { addFavorite, isFavorite, removeFavorite } from '@/lib/favorites';
import { BlurView } from 'expo-blur';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CategoryImagesProps = {
    categoryId: number;
    onImagePress?: (wallpaperId: number) => void;
};

const CategoryImages = ({ categoryId, onImagePress }: CategoryImagesProps) => {
    const category = images.find(img => img.id === categoryId);
    const wallpapers = useMemo(() => category?.wallpapers || [], [category]);
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    useEffect(() => {
        // Load favorites from AsyncStorage
        const loadFavorites = async () => {
            const favoritesMap: Record<number, boolean> = {};
            for (const wallpaper of wallpapers) {
                const favorited = await isFavorite(wallpaper.id, categoryId);
                favoritesMap[wallpaper.id] = favorited;
            }
            setFavorites(favoritesMap);
        };
        loadFavorites();
    }, [categoryId, wallpapers]);

    const toggleFavorite = async (wallpaperId: number) => {
        const wallpaper = wallpapers.find(w => w.id === wallpaperId);
        if (!wallpaper) return;

        const currentlyFavorited = favorites[wallpaperId] || false;
        
        if (currentlyFavorited) {
            // Remove from favorites
            await removeFavorite(wallpaperId, categoryId);
            setFavorites(prev => ({
                ...prev,
                [wallpaperId]: false
            }));
        } else {
            // Add to favorites
            await addFavorite({
                id: wallpaper.id,
                categoryId: categoryId,
                image: wallpaper.image,
                name: wallpaper.name,
                description: wallpaper.description,
                tags: wallpaper.tags || [],
            });
            setFavorites(prev => ({
                ...prev,
                [wallpaperId]: true
            }));
        }
    };

    return (
        <View style={styles.container}>
            {
                wallpapers.map((wallpaper, index) => {
                    const isFavorited = favorites[wallpaper.id] || false;
                    return (
                        <TouchableOpacity
                            key={wallpaper.id}
                            onPress={() => onImagePress?.(wallpaper.id)}
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
                                activeOpacity={1}
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
                        </TouchableOpacity>
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
        width: 200,
        height: 300,
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