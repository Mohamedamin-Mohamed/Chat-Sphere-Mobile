import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Dispatch, SetStateAction} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {usePathname, useRouter} from "expo-router";
import {useSelector} from "react-redux";
import {RootState} from "../types/types";
import {Ionicons} from "@expo/vector-icons";

interface ViewProfileModalProps {
    image?: string | null
    setViewProfileModal: Dispatch<SetStateAction<boolean>>,
    fullName: string,
    abbrevName: string
}

const ViewProfileModal = ({image, setViewProfileModal, fullName, abbrevName}: ViewProfileModalProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const joinedDate = useSelector((state: RootState) => state.userInfo).createdAt
    const handleProfileEdit = () => {
        setViewProfileModal(false)
        if (!pathname.includes('/editProfile')) {
            router.push('editProfile')
        }
    }
    return (
        <Modal visible={true} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={() => setViewProfileModal(false)}/>
                <View style={styles.modalContent}>
                    <View style={styles.nameAbbrevView}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.avatarImage}/>
                        ) : (
                            <Text style={styles.abbrevText}>{abbrevName}</Text>
                        )}
                    </View>
                    <Text style={styles.fullNameText}>{fullName}</Text>
                    <View style={styles.joinDate}>
                        <Ionicons name="calendar-outline" size={20} color="#4F46E5"/>
                        <Text style={styles.joinDateText}>Since {joinedDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.editProfile} activeOpacity={0.4} onPress={handleProfileEdit}>
                        <Icon name="edit" size={25} color="#4F46E5"/>
                        <Text style={styles.editProfileText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        marginVertical: 20,
        marginHorizontal: 4,
    },
    modalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 100,
        position: 'relative',
        borderRadius: 24
    },
    nameAbbrevView: {
        position: 'absolute',
        top: -18,
        backgroundColor: '#ebeaea',
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 64,
        padding: 10,
    },
    avatarImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 96,
    },
    abbrevText: {
        fontSize: 40,
        fontWeight: '800'
    },
    fullNameText: {
        fontWeight: '700',
        fontSize: 24,
        marginTop: 20
    },
    joinDate: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 20
    },
    joinDateText: {
        fontSize: 12,
        color: '#898686FF',
    },
    editProfile: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        width: '94%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
    },
    editProfileText: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 16
    }
})

export default ViewProfileModal