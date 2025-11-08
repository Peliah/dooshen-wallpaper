import FavoritesList from '@/components/favourites/favorites-list'
import { HeroSection } from '@/components/home/hero-section'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const Favourites = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.heroSectionContainer}>
            <HeroSection 
              title="Saved Wallpapers"
              description="Your saved wallpapers collection"
            />
          </View>
          <View style={styles.categoriesContainer}>
            <FavoritesList />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Favourites

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
  heroSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
