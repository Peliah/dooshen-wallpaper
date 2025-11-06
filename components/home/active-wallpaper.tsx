import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ActiveWallpaper = () => {
    return (
        <View style={styles.container}>
            {/* flower image */}
            <View style={styles.imageContainer}>
                <Image source={require('@/assets/imgs/flowers.jpg')} style={styles.image} contentFit="cover" />
            </View>
            {/* wallpaper info */}
            <View style={styles.wallpaperInfo}>
                <View style={styles.wallpaperInfoHeader}>
                    <View>
                        <Text style={styles.wallpaperInfoHeaderTitle}>Your Active Wallpaper</Text>
                        <Text style={styles.wallpaperInfoHeaderDescription}>This wallpaper is currently set as your active background</Text>
                    </View>
                    <View>
                        <View style={styles.wallpaperInfoHeaderCategoryContainer}>
                        <Text style={styles.wallpaperInfoHeaderCategory}>Category</Text> <Text style={styles.wallpaperInfoHeaderCategoryValue}>- Nature</Text>
                        </View>
                        <View style={styles.wallpaperInfoHeaderCategoryContainer}> <Text style={styles.wallpaperInfoHeaderCategory}>Selection</Text> <Text style={styles.wallpaperInfoHeaderCategoryValue}>- Wallpapers 5</Text> </View>
                    </View>
                </View>
                {/* wallpaper actions */}
                <View style={styles.wallpaperActions}>
                    <TouchableOpacity style={styles.wallpaperActionButton}>
                        <Image source={require('@/assets/imgs/upload.svg')} style={styles.wallpaperActionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wallpaperActionButton}>
                        <Image source={require('@/assets/imgs/set.svg')} style={styles.wallpaperActionIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ActiveWallpaper

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 30,
        gap: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    imageContainer: {
        // width: 100,
        // height: 100,
        borderRadius: 10,
    },
    image: {
        width: 120,
        height: 220,
        borderRadius: 20,
    },
    wallpaperActions: {
        flexDirection: 'row',
        gap: 16,
    },
    wallpaperInfo: {
        flex: 1,
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    wallpaperInfoHeader: {
        flex: 1,
        gap: 20,
    },
    wallpaperInfoHeaderTitle: {
        fontSize: 36,
        fontWeight: '600',
        fontFamily: 'ClashDisplay-Medium',
        color: '#000',
    },
    wallpaperInfoHeaderDescription: {
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
    },
    wallpaperInfoHeaderCategory: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
    },
    wallpaperInfoHeaderCategoryValue: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    wallpaperInfoHeaderCategoryContainer: {
        flexDirection: 'row',
        gap: 8,
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
})