import ListView from '@/components/browse/list-view'
import { ViewToggle } from '@/components/browse/view-toggle'
import CategoriesImage from '@/components/home/categories'
import { HeroSection } from '@/components/home/hero-section'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

type ViewMode = 'grid' | 'rows' | null;

const Browse = () => {
  const [listView, setListView] = useState<ViewMode>('grid');
  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.heroSectionContainer}>
            <HeroSection 
              title="Browse Categories"
              description="Explore our curated collections of stunning wallpapers"
            />
            <ViewToggle currentView={listView} onViewChange={setListView} />
          </View>
          <View style={styles.categoriesContainer}>
            {listView === 'grid' 
              ? <CategoriesImage onImagePress={(id) => router.push({ pathname: '/(tabs)/category/[id]', params: { id: id.toString() } })} /> 
              : <ListView onImagePress={(id) => router.push({ pathname: '/(tabs)/category/[id]', params: { id: id.toString() } })} />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Browse

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
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
  heroSectionContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
