import { HeroSection } from '@/components/home/hero-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const [selectedQuality, setSelectedQuality] = useState('high');
  const [isEnabled, setIsEnabled] = useState(false);

  const handleClose = () => {
    // Handle close if needed
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.heroSectionContainer}>
            <HeroSection
              title="Settings"
              description="Customize your Wallpaper experience"
            />
          </View>
          <View style={styles.categoriesContainer}>
            {/* left side */}
            <View style={styles.leftSide}>
              <Text style={styles.categoriesTitle}>Wallpaper Setup</Text>
              <Text style={styles.categoriesDescription}>Configure your wallpaper settings and enable auto-rotation</Text>

              <View style={styles.categoriesRowQTY}>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Image Quality</Text>
                  <Text style={styles.rowDescription}>Choose the quality for downloaded wallpapers</Text>
                </View>
                <Picker
                  selectedValue={selectedQuality}
                  onValueChange={(itemValue) => setSelectedQuality(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="High (Best Quality)" value="high" />
                  <Picker.Item label="Medium (Good Quality)" value="medium" />
                  <Picker.Item label="Low (Low Quality)" value="low" />
                </Picker>
              </View>

              <View style={styles.categoriesRow}>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Notification</Text>
                  <Text style={styles.rowDescription}>Get notified about new wallpapers</Text>
                </View>
                <Switch
                  value={isEnabled}
                  onValueChange={setIsEnabled}
                  trackColor={{ false: '#fafafa', true: '#FBB03B' }}
                  thumbColor={isEnabled ? '#fff' : '#fff'}
                />
              </View>
              <View style={styles.sheetFooter}>
                <TouchableOpacity style={styles.categoriesFooterButton} onPress={handleClose}>
                  <Text style={styles.categoriesFooterButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoriesFooterButton, styles.saveButton]}>
                  <Text style={[styles.categoriesFooterButtonText, styles.saveButtonText]}>Save Settings</Text>
                </TouchableOpacity>
              </View>

            </View>

            {/* right side */}
            <View style={styles.rightSide}>
              <View style={styles.previewImageContainer}>
                <View style={styles.notch} />
                {/* <Image source={wallpaper.image} style={styles.previewImage} /> */}
                <View style={styles.activateWallpaperStatus}><IconSymbol name="link" size={20} color="#1BA400" /> <Text style={styles.rowTitleActivate}>Connected to device</Text></View>
                <Text style={styles.rowDescription}>Click to disconnect</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 47,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 150,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 16,
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSide: {
    width: '42.5%',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesButton: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  categoriesTitle: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  viewActiveWallpaperButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 3,
    zIndex: 1000,
  },
  heroSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rightSide: {
    width: '50.5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoriesDescription: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    marginBottom: 24,
  },
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  categoriesRowQTY:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 4,
  },
  rowDescription: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.8)',
  },
  sheetFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  categoriesFooterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'rgba(124, 124, 124, 0.1)',
  },
  categoriesFooterButtonText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  saveButtonText: {
    color: '#fff',
  },

  previewImageContainer: {
    width: 260,
    height: 530,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#c5c5c5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#000',
  },
  notch: {
    position: 'absolute',
    width: 100,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    alignSelf: 'center',
    top: 10,
    zIndex: 1,
  },
  activateWallpaperStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#C8FFBD',
      color: '#1BA400',
      padding: 8,
      borderRadius: 16,
  },
  rowTitleActivate: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: '#1BA400',
},
});