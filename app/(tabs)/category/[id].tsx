import { ViewToggle } from '@/components/browse/view-toggle';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ViewMode = 'grid' | 'rows' | null;

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = parseInt(id || '1', 10);
  const category = images.find(img => img.id === categoryId);
  const [listView, setListView] = useState<ViewMode>('grid');

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Leftt Side */}
      <View>
        <TouchableOpacity onPress={() => router.back()}><IconSymbol name="chevron.left" size={24} color="#000" /> Back to Categories</TouchableOpacity>
        <View>
          <Text>{category.name}</Text>
          <ViewToggle currentView={listView} onViewChange={setListView} />

        </View>
      </View>

      {/* Right Side */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
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
});

