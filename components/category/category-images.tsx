import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { addFavorite, isFavorite, removeFavorite } from '@/lib/favorites';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type CategoryImagesProps = {
    categoryId: number;
    onImagePress?: (wallpaperId: number) => void;
};

const CategoryImages = ({ categoryId, onImagePress }: CategoryImagesProps) => {
    const category = images.find(img => img.id === categoryId);
    const wallpapers = useMemo(() => category?.wallpapers || [], [category]);
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});
    const { width: screenWidth } = useWindowDimensions();

    // Calculate responsive dimensions
    // The leftSide container is 42.5% of the available width
    const maxContainerWidth = 1440;
    const containerPadding = 47 * 2; // padding from scrollView
    const innerPadding = 16 * 2; // padding from scrollContent
    const leftSideWidth = 0.425; // 42.5% of container
    const gap = 16;

    // Determine number of columns based on screen width
    let numColumns = 3;
    if (screenWidth < 768) {
        numColumns = 2; // Mobile: 2 columns
    } else if (screenWidth < 1024) {
        numColumns = 2; // Tablet: 2 columns
    } else {
        numColumns = 3; // Desktop: 3 columns
    }

    // Calculate available width for leftSide
    const availableContainerWidth = Math.min(
        screenWidth - containerPadding - innerPadding,
        maxContainerWidth - containerPadding - innerPadding
    );
    const leftSideAvailableWidth = availableContainerWidth * leftSideWidth;
    const itemWidth = (leftSideAvailableWidth - (gap * (numColumns - 1))) / numColumns;
    const aspectRatio = 200 / 300; // Original aspect ratio (width/height)
    const itemHeight = itemWidth / aspectRatio;

    // Responsive font sizes and spacing
    const nameFontSize = screenWidth < 768 ? 16 : screenWidth < 1024 ? 18 : 20;
    const badgeFontSize = screenWidth < 768 ? 12 : 14;
    const padding = screenWidth < 768 ? 12 : 16;
    const iconSize = screenWidth < 768 ? 20 : 24;
    const buttonPadding = screenWidth < 768 ? 6 : 8;
    const buttonTop = screenWidth < 768 ? 8 : 12;

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
                                {
                                    width: itemWidth,
                                    height: itemHeight,
                                }
                            ]}
                        >
                            <Image 
                                source={wallpaper.image} 
                                style={[styles.image, { width: itemWidth, height: itemHeight }]} 
                                contentFit="cover"
                            />
                            <View style={[styles.imageInfo, { padding }]}>
                                <Text style={[styles.name, { fontSize: nameFontSize }]}>{wallpaper.name}</Text>
                                <BlurView intensity={20} style={styles.numberOfWallpapersContainer}>
                                    <Text style={[styles.description, { fontSize: badgeFontSize }]}>{wallpaper.name}</Text>
                                </BlurView>
                            </View>
                            <TouchableOpacity
                                style={[styles.imageActionButton, { top: buttonTop, right: buttonTop }]}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(wallpaper.id);
                                }}
                                activeOpacity={1}
                            >
                                {!isFavorited ? (
                                    <BlurView intensity={20} style={[styles.imageActionButtonBlur, { padding: buttonPadding }]}>
                                        <IconSymbol name="heart" size={iconSize} color="#fff" />
                                    </BlurView>
                                ) : (
                                    <View style={[styles.imageActionButtonBlur, { padding: buttonPadding }]}>
                                        <IconSymbol name="heart.fill" size={iconSize} color="#FFA821" />
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
        zIndex: 10,
    },
    imageActionButtonBlur: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
})