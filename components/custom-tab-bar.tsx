import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { router, usePathname, type RelativePathString } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const pagesLinks =
  [
    {
      name: 'Home',
      icon: require('@/assets/imgs/home.svg'),
      link: '/',
    },
    {
      name: 'Browse',
      icon: require('@/assets/imgs/browse.svg'),
      link: '/browse',
    },
    {
      name: 'Favourites',
      icon: require('@/assets/imgs/Heart.svg'),
      link: '/favourites',
    },
    {
      name: 'Settings',
      icon: require('@/assets/imgs/gear.svg'),
      link: '/settings',
    }
  ]

  
  export function CustomTabBar(props: BottomTabBarProps) {
    const pathname = usePathname();
    const isActive = (link: RelativePathString) => pathname === link;
  return (
    <View style={styles.container}>
      {/* Left side: Logo and Text */}
      <View style={styles.maxWidthContainer}>
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
        {pagesLinks.map((page) => (
          <TouchableOpacity key={page.name} style={[styles.tabBarItem, isActive(page.link as RelativePathString) && styles.tabBarItemActive]} onPress={() => router.push(page.link as RelativePathString)}>
            <Image
              source={page.icon}
              style={styles.tabBarItemIcon}
              contentFit="contain"
            />
            <Text style={styles.tabBarItemText}>{page.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    // maxWidth: 1440,
    // alignSelf: 'center',
    backgroundColor: '#fff',
    minHeight: 60,
    height: 98,
  },
  maxWidthContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 47,
    maxWidth: 1440,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 'auto',
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
    gap: 16,
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    flexShrink: 0,
  },
  tabBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexShrink: 0,
    marginHorizontal: 4,
    opacity: 0.7,
  },
  tabBarItemActive: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 1,
  },
  tabBarItemIcon: {
    width: 24,
    height: 24,
  },
  tabBarItemText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});

