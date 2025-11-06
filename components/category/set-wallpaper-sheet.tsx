import React, { useRef, useState } from 'react';
import { Animated, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

type SetWallpaperSheetProps = {
    visible: boolean;
    onClose: () => void;
};

type DisplayMode = 'fit' | 'fill' | 'stretch' | 'tile';

export function SetWallpaperSheet({ visible, onClose }: SetWallpaperSheetProps) {
    const slideAnim = useRef(new Animated.Value(400)).current;
    const [selectedDisplayMode, setSelectedDisplayMode] = useState<DisplayMode>('fit');
    const [customDisplayMode, setCustomDisplayMode] = useState(false);
    const [lockWallpaper, setLockWallpaper] = useState(false);
    const [syncDevices, setSyncDevices] = useState(false);

    React.useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 400,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: 400,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.sheetOverlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.sheetContainer,
                                {
                                    transform: [{ translateX: slideAnim }],
                                },
                            ]}
                        >
                            {/* <View style={styles.sheetHeader}>
                                <Text style={styles.sheetTitle}>Set Wallpaper</Text>
                                <TouchableOpacity onPress={handleClose}>
                                    <IconSymbol name="chevron.right" size={24} color="#000" />
                                </TouchableOpacity>
                            </View> */}
                            <ScrollView style={styles.sheetContent} showsVerticalScrollIndicator={false}>
                                <Text style={styles.sectionTitle}>Wallpaper Setup</Text>
                                <Text style={styles.sectionDescription}>Configure your wallpaper settings and enable auto-rotation</Text>

                                <View style={styles.sheetContentRowActivate}>
                                    <View style={styles.rowTextContainerActivate}>
                                        <Text style={styles.rowTitle}>Activate Wallpaper</Text>
                                        <Text style={styles.rowDescription}>Set the selected wallpaper as your desktop background</Text>
                                    </View>
                                    <View style={styles.activateWallpaperStatus}><IconSymbol name="checkmark.circle.fill" size={20} color="#1BA400" /> <Text style={styles.rowTitleActivate}>Activated</Text></View>
                                </View>

                                <Text style={styles.sectionTitle}>Display mode</Text>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setSelectedDisplayMode('fit')}
                                >
                                    <IconSymbol
                                        name={selectedDisplayMode === 'fit' ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={selectedDisplayMode === 'fit' ? "#FBB03B" : "#000"}
                                    />
                                    <View>
                                    <Text style={styles.rowTitle}>Fit</Text>
                                    <Text style={styles.rowDescription}>Scale to fit without cropping</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setSelectedDisplayMode('fill')}
                                >
                                    <IconSymbol
                                        name={selectedDisplayMode === 'fill' ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={selectedDisplayMode === 'fill' ? "#FBB03B" : "#000"}
                                    />
                                    <View>
                                    <Text style={styles.rowTitle}>Fill</Text>
                                    <Text style={styles.rowDescription}>Scale to fill entire screen</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setSelectedDisplayMode('stretch')}
                                >
                                    <IconSymbol
                                        name={selectedDisplayMode === 'stretch' ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={selectedDisplayMode === 'stretch' ? "#FBB03B" : "#000"}
                                    />
                                    <View>
                                    <Text style={styles.rowTitle}>Stretch</Text>
                                    <Text style={styles.rowDescription}>Stretch to fill the screen</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setSelectedDisplayMode('tile')}
                                >
                                    <IconSymbol
                                        name={selectedDisplayMode === 'tile' ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={selectedDisplayMode === 'tile' ? "#FBB03B" : "#000"}
                                    />
                                    <View>
                                    <Text style={styles.rowTitle}>Tile</Text>
                                    <Text style={styles.rowDescription}>Repeat the image to fill the screen</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.sheetContentRow}>
                                    <View style={styles.customRowContent}>
                                        <Text style={styles.rowTitle}>Auto - Rotation</Text>
                                        <Text style={styles.rowDescription}>Automatically change the wallpaper at regular intervals</Text>
                                    </View>
                                    <Switch
                                        value={customDisplayMode}
                                        onValueChange={setCustomDisplayMode}
                                        trackColor={{ false: '#fafafa', true: '#FBB03B' }}
                                        thumbColor={customDisplayMode ? '#fff' : '#fff'}
                                    />
                                </View>

                                <Text style={styles.sectionTitle}>Advanced Settings</Text>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setLockWallpaper(!lockWallpaper)}
                                >
                                    <IconSymbol
                                        name={lockWallpaper ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={lockWallpaper ? "#FBB03B" : "#000"}
                                    />
                                    <View style={styles.rowTextContainer}>
                                        <Text style={styles.rowTitle}>Lock Wallpaper</Text>
                                        <Text style={styles.rowDescription}>Prevent the wallpaper from being changed</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sheetContentRow}
                                    onPress={() => setSyncDevices(!syncDevices)}
                                >
                                    <IconSymbol
                                        name={syncDevices ? "checkmark.circle.fill" : "circle"}
                                        size={24}
                                        color={syncDevices ? "#FBB03B" : "#000"}
                                    />
                                    <View style={styles.rowTextContainer}>
                                    <Text style={styles.rowTitle}>Sync Across Devices</Text>
                                    <Text style={styles.rowDescription}>Keep wallpaper consistent across all devices</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                            <View style={styles.sheetFooter}>
                                <TouchableOpacity style={styles.sheetFooterButton} onPress={handleClose}>
                                    <Text style={styles.footerButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.sheetFooterButton, styles.saveButton]}>
                                    <Text style={[styles.footerButtonText, styles.saveButtonText]}>Save Settings</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    sheetOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    sheetContainer: {
        width: '50%',
        height: '100%',
        backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderBottomLeftRadius: 30,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    sheetTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    sheetContent: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        marginTop: 24,
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
        marginBottom: 16,
    },
    sheetContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 16,
        marginBottom: 12,
        gap: 12,
    },
    sheetContentRowActivate: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 16,
        marginBottom: 12,
        gap: 12,
        justifyContent: 'space-between',
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    rowTitleActivate: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#1BA400',
    },
    rowDescription: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#808080',
    },
    rowTextContainer: {
        flex: 1,
    },
    customRowContent: {
        flex: 1,
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
    sheetFooterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor: 'rgba(124, 124, 124, 0.1)',
    },
    saveButton: {
        backgroundColor: '#FBB03B',
        borderColor: '#FBB03B',
    },
    footerButtonText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    saveButtonText: {
        color: '#fff',
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
    rowTextContainerActivate: {
        width: '50%',
        gap: 4,
    },
});

