import { Image } from 'expo-image';
import { router, usePathname, type RelativePathString } from 'expo-router';
import React from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type MenuSheetProps = {
    visible: boolean;
    onClose: () => void;
    pagesLinks: {
        name: string;
        icon: any;
        link: string;
    }[];
};

export function MenuSheet({ visible, onClose, pagesLinks }: MenuSheetProps) {
    const pathname = usePathname();
    const [slideAnim] = React.useState(new Animated.Value(300));

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
                toValue: 300,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const isActive = (link: RelativePathString) => pathname === link;

    const handleNavigation = (link: RelativePathString) => {
        router.push(link);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.sheetOverlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.menuSheet,
                                {
                                    transform: [{ translateX: slideAnim }],
                                },
                            ]}
                        >
                            <View style={styles.menuContent}>
                                {pagesLinks.map((page) => (
                                    <TouchableOpacity
                                        key={page.name}
                                        style={[styles.menuItem]}
                                        onPress={() => handleNavigation(page.link as RelativePathString)}
                                    >
                                        <Image
                                            source={page.icon}
                                            style={styles.menuItemIcon}
                                            contentFit="contain"
                                        />
                                        <Text style={styles.menuItemText}>{page.name}</Text>
                                    </TouchableOpacity>
                                ))}
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
    menuSheet: {
        width: 280,
        height: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    closeButton: {
        padding: 4,
    },
    menuContent: {
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 8,
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
    },
    menuItemIcon: {
        width: 24,
        height: 24,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
        color: '#000',
        flex: 1,
    },
    activeIndicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FBB03B',
    },
});

