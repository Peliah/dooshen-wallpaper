import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CategoriesImage from '@/components/home/categories';
import { HeroSection } from '@/components/home/hero-section';

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <HeroSection />
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <TouchableOpacity> <Text style={styles.categoriesButton}> See All</Text></TouchableOpacity>
        </View>
          <CategoriesImage />
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
