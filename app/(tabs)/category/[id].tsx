import { ViewToggle } from '@/components/browse/view-toggle';
import CategoryImages from '@/components/category/category-images';
import PreviewSection from '@/components/category/preview-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ViewMode = 'grid' | 'rows' | null;

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = parseInt(id || '1', 10);
  const category = images.find(img => img.id === categoryId);
  const [listView, setListView] = useState<ViewMode>('grid');
  const [selectedWallpaper, setSelectedWallpaper] = useState<{
    id: number;
    image: any;
    name: string;
    description: string;
    tags: string[];
  } | null>(category?.wallpapers?.[0] || null);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  const handleImagePress = (wallpaperId: number) => {
    const wallpaper = category.wallpapers?.find(w => w.id === wallpaperId);
    if (wallpaper) {
      setSelectedWallpaper(wallpaper);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Left Side */}
        <View style={styles.leftSide}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><IconSymbol name="arrow.left" size={24} color="#000" /> Back to Categories</TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{category.name}</Text>
            <ViewToggle currentView={listView} onViewChange={setListView} />
          </View>
          <CategoryImages categoryId={categoryId} onImagePress={handleImagePress} />
        </View>

        {/* Right Side */}
        <View style={styles.rightSide}>
          <PreviewSection wallpaper={selectedWallpaper} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 47,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContent: {
    padding: 16,
    marginTop: 43,
  },
  container: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  leftSide: {
    // flex: 1,
    width: '42.5%',
    // gap: 50,
  },
  rightSide: {
    // flex: 1,
    width: '50.5%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    marginBottom: 50,

  },
  title: {
    fontSize: 32,
    fontWeight: '100',
    fontFamily: 'ClashDisplay-Regular',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Poppins-Light',
    color: '#575757',
    marginBottom: 16,
  },
  count: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins-Light',
    color: '#808080',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
});

