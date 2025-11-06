import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export function HeroSection() {
  return (
    <View>
      <View style={styles.titleContainer}>
        <MaskedView
          maskElement={
            <Text style={styles.title}>Discover Beautiful Wallpapers</Text>
          }
        >
          <LinearGradient
            colors={['#FBB03B', '#EC0C43']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, styles.gradientText]}>
              Discover Beautiful Wallpapers
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Discover curated collections of stunning wallpapers. Browse by category, preview in full-screen, and set your favorites.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 60,
    fontWeight: '700',
    fontFamily: 'ClashDisplay-Medium',
  },
  gradientText: {
    opacity: 0,
  },
  descriptionContainer: {
    marginTop: 16,
    maxWidth: 870,
  },
  descriptionText: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#575757',
  },
});

