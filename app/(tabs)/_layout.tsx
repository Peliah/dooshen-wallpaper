import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';

import { CustomTabBar } from '@/components/custom-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarPosition:'top',
        tabBarLabelPosition:'beside-icon',
        tabBarLabelStyle:{
          fontSize:12,
          fontWeight:'400',
          fontFamily:'Poppins-Regular',
          color: '#000',
        },
        tabBarItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          flexShrink: 0,
          marginHorizontal: 4,
        },
        tabBarStyle:{
          // backgroundColor:'#fff',
          // height: 98,
        },
        tabBarShowLabel: true,
        tabBarAllowFontScaling: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/imgs/home.svg')}
              style={{ width: 24, height: 24, tintColor: color }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/imgs/browse.svg')}
              style={{ width: 24, height: 24, tintColor: color }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/imgs/Heart.svg')}
              style={{ width: 24, height: 24, tintColor: color }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/imgs/gear.svg')}
              style={{ width: 24, height: 24, tintColor: color }}
              contentFit="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
