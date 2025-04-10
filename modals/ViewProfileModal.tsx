import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Dispatch, SetStateAction} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ViewProfileModalProps {
    setViewProfileModal: Dispatch<SetStateAction<boolean>>,
    fullName: string,
    abbrevName: string
}

const ViewProfileModal = ({setViewProfileModal, fullName, abbrevName}: ViewProfileModalProps) => {
    return (
        <Modal visible={true} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={() => setViewProfileModal(false)}/>
                <View style={styles.modalContent}>
                    <View style={styles.nameAbbrevView}>
                        <Text style={styles.abbrevText}>{abbrevName}</Text>
                    </View>
                    <Text style={styles.fullNameText}>{fullName}</Text>
                    <View style={styles.joinDate}>
                        <Icon name="timeline" size={20} color="#898686FF"/>
                        <Text style={styles.joinDateText}>Since Feb 2025</Text>
                    </View>
                    <TouchableOpacity style={styles.editProfile} activeOpacity={0.6}>
                        <Icon name="edit" size={25} color="black"/>
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
        marginVertical: 40,
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
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48,
        padding: 10,

    },
    abbrevText: {
        fontSize: 30,
        fontWeight: '800'
    },
    fullNameText: {
        fontWeight: '700',
        fontSize: 24
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
        gap: 10
    },
    editProfileText: {
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 16
    }
})

export default ViewProfileModal