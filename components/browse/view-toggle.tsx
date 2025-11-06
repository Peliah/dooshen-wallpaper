import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type ViewMode = 'grid' | 'rows' | null;

type ViewToggleProps = {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <View style={styles.browseView}>
      <TouchableOpacity onPress={() => onViewChange('grid')}>
        <Image
          source={
            currentView === 'grid'
              ? require('@/assets/imgs/square-active.svg')
              : require('@/assets/imgs/square-inactive.svg')
          }
          style={styles.browseImage}
          contentFit="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onViewChange('rows')}>
        <Image
          source={
            currentView === 'rows'
              ? require('@/assets/imgs/rows-active.svg')
              : require('@/assets/imgs/rows-inactive.svg')
          }
          style={styles.browseImage}
          contentFit="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  browseView: {
    flexDirection: 'row',
    gap: 16,
  },
  browseImage: {
    width: 40,
    height: 40,
  },
});

