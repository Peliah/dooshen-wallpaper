import { addFavorite, isFavorite, removeFavorite } from '@/lib/favorites';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { SetWallpaperSheet } from './set-wallpaper-sheet';

type PreviewSectionProps = {
    wallpaper: {
        id: number;
        image: any;
        name: string;
        description: string;
        tags: string[];
    } | null;
    categoryId: number;
};

const Preview = ({ wallpaper, categoryId }: PreviewSectionProps) => {
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { width: screenWidth } = useWindowDimensions();
    
    // Determine if screen is small (mobile/tablet)
    const isSmallScreen = screenWidth < 1024;

    useEffect(() => {
        // Check if wallpaper is favorited
        const checkFavorite = async () => {
            if (wallpaper) {
                const favorited = await isFavorite(wallpaper.id, categoryId);
                setIsFavorited(favorited);
            }
        };
        checkFavorite();
    }, [wallpaper, categoryId]);

    const openSheet = () => {
        setIsSheetVisible(true);
    };

    const closeSheet = () => {
        setIsSheetVisible(false);
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const toggleFavorite = async () => {
        if (!wallpaper) return;

        if (isFavorited) {
            // Remove from favorites
            await removeFavorite(wallpaper.id, categoryId);
            setIsFavorited(false);
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
            setIsFavorited(true);
        }
    };

    if (!wallpaper) {
        return (
            <LinearGradient
                colors={['#fff', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <View style={styles.contentRow}>
                    <View style={styles.leftSide}>
                        <Text style={styles.previewTitle}>Preview</Text>
                        <Text style={styles.emptyText}>Select an image to preview</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    }

    // Responsive values
    const containerPadding = isSmallScreen ? 20 : 40;
    const titleFontSize = isSmallScreen ? 20 : 24;
    const previewImageWidth = isSmallScreen ? Math.min(screenWidth - 80, 260) : 260;
    const previewImageHeight = isSmallScreen ? (previewImageWidth * 530) / 260 : 530;

    return (
        <LinearGradient
            colors={['#fff', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.flatten([styles.container, { padding: containerPadding }])}
        >
            <View style={[styles.contentRow, isSmallScreen ? styles.contentRowColumn : null]}>
                {/* Preview Section - Always on top on small screens */}
                <View style={[styles.leftSide, isSmallScreen ? styles.leftSideFull : null]}>
                    <Text style={[styles.previewTitle, { fontSize: titleFontSize }]}>Preview</Text>
                    <View style={styles.section}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{wallpaper.name}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Tags</Text>
                        <View style={styles.tagsContainer}>
                            {wallpaper.tags?.map((tag, index) => (
                                <View key={index} style={styles.tagBadge}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Description</Text>
                        <View style={styles.descriptionContainer}>
                            <View style={[styles.descriptionWrapper, !isDescriptionExpanded && styles.descriptionWrapperCollapsed]}>
                                <Text style={styles.descriptionText}>{wallpaper.description}</Text>
                            </View>
                            {!isDescriptionExpanded && (
                                <LinearGradient
                                    colors={['transparent', '#f5f5f5']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={styles.descriptionFade}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.wallpaperActions}>
                        <TouchableOpacity style={styles.wallpaperActionButton}>
                            <Image source={require('@/assets/imgs/upload.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.wallpaperActionButton}
                            onPress={toggleDescription}
                        >
                            <Image source={require('@/assets/imgs/upsize.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wallpaperActionButton}
                            onPress={openSheet}
                        >
                            <Image source={require('@/assets/imgs/set.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Image Preview - Below on small screens */}
                <View style={[styles.rightSide, isSmallScreen ? styles.rightSideFull : null]}>
                    <View style={[styles.previewImageContainer, { 
                        width: previewImageWidth, 
                        height: previewImageHeight 
                    }]}>
                        <View style={styles.notch} />
                        <Image source={wallpaper.image} style={styles.previewImage} />
                        <View style={styles.bottomnotch} />
                    </View>
                </View>
            </View>
            <View style={[styles.bottomActions, isSmallScreen ? styles.bottomActionsColumn : null]}>
                <TouchableOpacity 
                    style={styles.bottomActionButton}
                    onPress={toggleFavorite}
                >
                    {isFavorited ? (
                        <IconSymbol name="heart.fill" size={24} color="#FFA821" />
                    ) : (
                        <IconSymbol name="heart" size={24} color="#000" />
                    )}
                    <Text style={styles.bottomActionText}>Save to Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.bottomActionButton, styles.setWallpaperButton]}
                    onPress={openSheet}
                >
                    <Text style={styles.setWallpaperText}>Set to Wallpaper</Text>
                </TouchableOpacity>
            </View>

            {/* Right Side Sheet */}
            <SetWallpaperSheet 
                visible={isSheetVisible} 
                onClose={closeSheet}
                wallpaper={wallpaper}
                categoryId={categoryId}
            />
        </LinearGradient>
    )
}

export default Preview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 30,
    },
    contentRow: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-between',
    },
    contentRowColumn: {
        flexDirection: 'column-reverse',
    },
    leftSide: {
        flex: 1,
    },
    leftSideFull: {
        width: '100%',
    },
    rightSide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rightSideFull: {
        width: '100%',
        marginTop: 24,
    },
    previewTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        marginBottom: 8,
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tagBadge: {
        backgroundColor: 'rgba(191, 191, 191, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 24,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    descriptionContainer: {
        position: 'relative',
    },
    descriptionWrapper: {
        overflow: 'hidden',
    },
    descriptionWrapperCollapsed: {
        height: 105,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        lineHeight: 24,
    },
    descriptionFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        pointerEvents: 'none',
    },
    wallpaperActionIcon: {
        width: 24,
        height: 24,
    },
    wallpaperActionButton: {
        padding: 7,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor: 'rgba(124, 124, 124, 0.1)',
    },
    wallpaperActions: {
        flexDirection: 'row',
        gap: 16,
    },
    previewImageContainer: {
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        alignSelf: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#000',
    },
    notch: {
        position: 'absolute',
        width: 70,
        height: 20,
        backgroundColor: '#000',
        borderRadius: 40,
        alignSelf: 'center',
        top: 10,
        zIndex: 1,
    },
    bottomnotch: {
        position: 'absolute',
        width: 100,
        height: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        alignSelf: 'center',
        bottom: 15,
        zIndex: 1,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        textAlign: 'center',
        marginTop: 20,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
        marginTop: 34,
    },
    bottomActionsColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 12,
    },
    bottomActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor: 'rgba(124, 124, 124, 0.1)',
    },
    setWallpaperButton: {
        backgroundColor: '#FBB03B',
        borderColor: '#FBB03B',
    },
    bottomActionText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    setWallpaperText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#fff',
    },
})