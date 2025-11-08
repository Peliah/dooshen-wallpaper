import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, Text, View } from 'react-native';

export function HeroSection({ title, description }: { title: string, description: string }) {
  const GradientText = () => {
    if (Platform.OS === 'web') {
      return (
        <Text style={[styles.title, styles.gradientTextWeb]}>
          {title}
        </Text>
      );
    }
    
    return (
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <Text style={styles.title}>{title}</Text>
        }
      >
        <LinearGradient
          colors={['#FBB03B', '#EC0C43']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={[styles.title, styles.gradientText]}>
            {title}
          </Text>
        </LinearGradient>
      </MaskedView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <GradientText />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 53,
    // backgroundColor: 'blue',
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  maskedView: {
    alignSelf: 'flex-start',
  },
  gradient: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 60,
    fontWeight: '500',
    fontFamily: 'ClashDisplay-Medium',
  },
  gradientText: {
    color: 'transparent',
  },
  gradientTextWeb: {
    backgroundImage: 'linear-gradient(to right, #FBB03B, #EC0C43)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as any,
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

