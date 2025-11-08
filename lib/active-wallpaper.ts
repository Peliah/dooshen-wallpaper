import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_WALLPAPER_KEY = '@active_wallpaper';

export type ActiveWallpaper = {
    id: number;
    categoryId: number;
    image: any;
    name: string;
    description: string;
    tags: string[];
    categoryName?: string;
};

// Get active wallpaper
export async function getActiveWallpaper(): Promise<ActiveWallpaper | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(ACTIVE_WALLPAPER_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error getting active wallpaper:', e);
        return null;
    }
}

// Set active wallpaper
export async function setActiveWallpaper(wallpaper: ActiveWallpaper): Promise<void> {
    try {
        await AsyncStorage.setItem(ACTIVE_WALLPAPER_KEY, JSON.stringify(wallpaper));
    } catch (e) {
        console.error('Error setting active wallpaper:', e);
    }
}

// Remove active wallpaper
export async function removeActiveWallpaper(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ACTIVE_WALLPAPER_KEY);
    } catch (e) {
        console.error('Error removing active wallpaper:', e);
    }
}

// Check if a wallpaper is active
export async function isActiveWallpaper(wallpaperId: number, categoryId: number): Promise<boolean> {
    try {
        const active = await getActiveWallpaper();
        return active !== null && active.id === wallpaperId && active.categoryId === categoryId;
    } catch (e) {
        console.error('Error checking active wallpaper:', e);
        return false;
    }
}

