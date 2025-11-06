import { getFavorites, removeFavorite, type FavoriteWallpaper } from '@/lib/favorites';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState<FavoriteWallpaper[]>([]);

    const loadFavorites = useCallback(async () => {
        try {
            const favs = await getFavorites();
            console.log('Loaded favorites:', favs);
            setFavorites(favs);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [loadFavorites])
    );

    const handleRemoveFavorite = async (wallpaper: FavoriteWallpaper) => {
        await removeFavorite(wallpaper.id, wallpaper.categoryId);
        loadFavorites();
    };

    const handleImagePress = (wallpaper: FavoriteWallpaper) => {
        router.push({ pathname: '/(tabs)/category/[id]', params: { id: wallpaper.categoryId.toString() } });
    };



    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Image 
                    source={require('@/assets/imgs/empty.svg')} 
                    style={styles.emptyImage}
                    contentFit="contain"
                />
                <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                <Text style={styles.emptyDescription}>Start exploring and save your favorite wallpapers</Text>
                <TouchableOpacity 
                    style={styles.browseButton}
                    onPress={() => router.push('/(tabs)/browse')}
                >
                    <Text style={styles.browseButtonText}>Browse Wallpapers</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {favorites.map((wallpaper) => (
                <TouchableOpacity
                    key={`${wallpaper.categoryId}-${wallpaper.id}`}
                    style={styles.imageContainer}
                    onPress={() => handleImagePress(wallpaper)}
                >
                    <Image source={wallpaper.image} style={styles.image} />
                    <View style={styles.imageInfo}>
                        <Text style={styles.name}>{wallpaper.name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={() => handleRemoveFavorite(wallpaper)}
                        activeOpacity={1}
                    >
                        <BlurView intensity={20} style={styles.imageActionButtonBlur}>
                            <IconSymbol name="heart.fill" size={24} color="#FFA821" />
                        </BlurView>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default FavoritesList;

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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyImage: {
        width: 198,
        height: 197,
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 40,
    },
    browseButton: {
        backgroundColor: '#FBB03B',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 20,
    },
    browseButtonText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
        color: '#fff',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        textAlign: 'center',
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
});

