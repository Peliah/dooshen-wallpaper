import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export function CustomTabBar(props: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {/* Left side: Logo and Text */}
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/imgs/logo.svg')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.brandText}>Wallpaper studio</Text>
      </View>
      
      {/* Right side: Tabs */}
      <View style={styles.rightSection}>
        <BottomTabBar 
          {...props} 
          style={styles.tabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    minHeight: 60,
    height: 98,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
},
logo: {
    width: 32,
    height: 32,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    flexGrow: 0,
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    flexShrink: 0,
  },
});

