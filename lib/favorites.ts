import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export type FavoriteWallpaper = {
    id: number;
    categoryId: number;
    image: any;
    name: string;
    description: string;
    tags: string[];
};

// Get all favorites
export async function getFavorites(): Promise<FavoriteWallpaper[]> {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        console.log('favorites', JSON.parse(jsonValue || '[]'));
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error getting favorites:', e);
        return [];
    }
}

// Add a favorite
export async function addFavorite(wallpaper: FavoriteWallpaper): Promise<void> {
    try {
        const favorites = await getFavorites();
        const exists = favorites.find(fav => fav.id === wallpaper.id && fav.categoryId === wallpaper.categoryId);
        if (!exists) {
            favorites.push(wallpaper);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    } catch (e) {
        console.error('Error adding favorite:', e);
    }
}

// Remove a favorite
export async function removeFavorite(wallpaperId: number, categoryId: number): Promise<void> {
    try {
        const favorites = await getFavorites();
        const filtered = favorites.filter(
            fav => !(fav.id === wallpaperId && fav.categoryId === categoryId)
        );
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (e) {
        console.error('Error removing favorite:', e);
    }
}

// Check if a wallpaper is favorited
export async function isFavorite(wallpaperId: number, categoryId: number): Promise<boolean> {
    try {
        const favorites = await getFavorites();
        return favorites.some(fav => fav.id === wallpaperId && fav.categoryId === categoryId);
    } catch (e) {
        console.error('Error checking favorite:', e);
        return false;
    }
}

// Get favorites count
export async function getFavoritesCount(): Promise<number> {
    try {
        const favorites = await getFavorites();
        return favorites.length;
    } catch (e) {
        console.error('Error getting favorites count:', e);
        return 0;
    }
}

