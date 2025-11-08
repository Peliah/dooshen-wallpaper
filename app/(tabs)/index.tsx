import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ActiveWallpaper from '@/components/home/active-wallpaper';
import CategoriesImage from '@/components/home/categories';
import { HeroSection } from '@/components/home/hero-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';

export default function HomeScreen() {
  const [activeWallpaper, setActiveWallpaper] = useState<any>(null);
  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          {
            activeWallpaper ? (
              <ActiveWallpaper />
            ) : (
              <HeroSection 
                title="Discover Beautiful Wallpapers"
                description="Discover curated collections of stunning wallpapers. Browse by category, preview in full-screen, and set your favorites."
              />
            )
          }
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>Categories</Text>
              <TouchableOpacity> <Text style={styles.categoriesButton}> See All</Text></TouchableOpacity>
            </View>
            <CategoriesImage />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity 
        onPress={() => setActiveWallpaper(activeWallpaper ? null : {})} 
        style={styles.viewActiveWallpaperButton}
      >
        <IconSymbol name="eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 47,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    gap: 53
  },
  container: {
    flex: 1,
    padding: 16,
  },
  categoriesContainer: {
    marginTop: 32,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesButton: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  categoriesTitle: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  viewActiveWallpaperButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 3,
    zIndex: 1000,
  },
});
