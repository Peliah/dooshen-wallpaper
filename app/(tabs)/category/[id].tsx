import { images } from '@/lib/data';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = parseInt(id || '1', 10);
  const category = images.find(img => img.id === categoryId);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.description}>{category.description}</Text>
      <Text style={styles.count}>{category.numberOfWallpapers} Wallpapers</Text>
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

