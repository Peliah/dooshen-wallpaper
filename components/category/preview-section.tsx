import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

type PreviewSectionProps = {
    wallpaper: {
        id: number;
        image: any;
        name: string;
        description: string;
        tags: string[];
    } | null;
};

const Preview = ({ wallpaper }: PreviewSectionProps) => {
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
                        <Text style={styles.descriptionText}>{wallpaper.description}</Text>
                    </View>


                    <View style={styles.wallpaperActions}>
                        <TouchableOpacity style={styles.wallpaperActionButton}>
                            <Image source={require('@/assets/imgs/upload.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wallpaperActionButton}>
                            <Image source={require('@/assets/imgs/upsize.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wallpaperActionButton}>
                            <Image source={require('@/assets/imgs/set.svg')} style={styles.wallpaperActionIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rightSide}>
                    <View style={styles.previewImageContainer}>
                        <View style={styles.notch} />
                        <Image source={wallpaper.image} style={styles.previewImage} />
                    </View>
                </View>
            </View>
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.bottomActionButton}>
                    <IconSymbol name="heart" size={24} color="#000" />
                    <Text style={styles.bottomActionText}>Save to Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomActionButton, styles.setWallpaperButton]}>
                    <Text style={styles.setWallpaperText}>Set to Wallpaper</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Preview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        borderRadius: 30,
    },
    contentRow: {
        flexDirection: 'row',
        gap: 16,
    },
    leftSide: {
        flex: 1,
    },
    rightSide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    descriptionText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        lineHeight: 24,
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
        width: 260,
        height: 530,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#000',
    },
    notch: {
        position: 'absolute',
        width: 100,
        height: 20,
        backgroundColor: '#000',
        borderRadius: 20,
        alignSelf: 'center',
        top: 10,
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