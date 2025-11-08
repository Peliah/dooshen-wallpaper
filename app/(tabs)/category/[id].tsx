import { ViewToggle } from '@/components/browse/view-toggle';
import CategoryImages from '@/components/category/category-images';
import PreviewSection from '@/components/category/preview-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { images } from '@/lib/data';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type ViewMode = 'grid' | 'rows' | null;

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = parseInt(id || '1', 10);
  const category = images.find(img => img.id === categoryId);
  const [listView, setListView] = useState<ViewMode>('grid');
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isSmallScreen = screenWidth < 1024;
  const sheetHeight = screenHeight * 0.9;
  const [selectedWallpaper, setSelectedWallpaper] = useState<{
    id: number;
    image: any;
    name: string;
    description: string;
    tags: string[];
  } | null>(null);
  const [isPreviewSheetVisible, setIsPreviewSheetVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (category && !isSmallScreen) {
      setSelectedWallpaper(category.wallpapers?.[0] || null);
    } else if (isSmallScreen) {
      setSelectedWallpaper(null);
    }
  }, [category, isSmallScreen]);

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
      if (isSmallScreen) {
        setIsPreviewSheetVisible(true);
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }).start();
      }
    }
  };

  const closePreviewSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsPreviewSheetVisible(false);
    });
  };

  const sheetTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight, 0],
  });

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.container, isSmallScreen && styles.containerColumn]}>
          {/* Left Side */}
          <View style={[styles.leftSide, isSmallScreen && styles.leftSideFull]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><IconSymbol name="arrow.left" size={24} color="#000" /> Back to Categories</TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{category.name}</Text>
              <ViewToggle currentView={listView} onViewChange={setListView} />
            </View>
            <CategoryImages categoryId={categoryId} onImagePress={handleImagePress} />
          </View>

          {/* Right Side - Only visible on large screens */}
          {!isSmallScreen && (
            <View style={styles.rightSide}>
              <PreviewSection wallpaper={selectedWallpaper} categoryId={categoryId} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Sheet for Preview on Small Screens */}
      {isSmallScreen && (
        <Modal
          visible={isPreviewSheetVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closePreviewSheet}
        >
          <TouchableOpacity 
            style={styles.sheetOverlay}
            activeOpacity={1}
            onPress={closePreviewSheet}
          >
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [{ translateY: sheetTranslateY }],
                  height: sheetHeight,
                },
              ]}
            >
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Preview</Text>
                <TouchableOpacity onPress={closePreviewSheet} style={styles.closeButton}>
                  <IconSymbol name="xmark" size={24} color="#FBB03B" />
                </TouchableOpacity>
              </View>
              <ScrollView 
                showsVerticalScrollIndicator={true} 
                style={styles.sheetContent}
                contentContainerStyle={styles.sheetContentContainer}
                nestedScrollEnabled={true}
                bounces={true}
              >
                {selectedWallpaper && (
                  <View style={styles.previewWrapper}>
                    <View style={styles.previewSectionContainer}>
                      <PreviewSection wallpaper={selectedWallpaper} categoryId={categoryId} />
                    </View>
                  </View>
                )}
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
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
  containerColumn: {
    flexDirection: 'column',
  },
  leftSide: {
    width: '42.5%',
  },
  leftSideFull: {
    width: '100%',
  },
  rightSide: {
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
    fontSize: 48,
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
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexShrink: 0,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  sheetContent: {
    flex: 1,
    minHeight: 0,
  },
  sheetContentContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  previewWrapper: {
    width: '100%',
  },
  previewSectionContainer: {
    width: '100%',
  },
});

