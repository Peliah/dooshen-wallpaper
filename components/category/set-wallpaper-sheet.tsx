import React, { useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

type SetWallpaperSheetProps = {
    visible: boolean;
    onClose: () => void;
};

export function SetWallpaperSheet({ visible, onClose }: SetWallpaperSheetProps) {
    const slideAnim = useRef(new Animated.Value(400)).current;

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
    }, [visible]);

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
                            <View style={styles.sheetHeader}>
                                <Text style={styles.sheetTitle}>Set Wallpaper</Text>
                                <TouchableOpacity onPress={handleClose}>
                                    <IconSymbol name="chevron.right" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sheetContent}>
                                <Text style={styles.sheetText}>Wallpaper options will go here</Text>
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
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
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
    sheetText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
});

