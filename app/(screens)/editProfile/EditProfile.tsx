import {Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {router, useNavigation} from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import {useSelector} from "react-redux";
import {RootState} from "../../../types/types";
import {useEffect, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import AvatarModal from "../../../modals/AvatarModal";
import ViewProfileModal from "../../../modals/ViewProfileModal";
import {NavigationAction, usePreventRemove} from "@react-navigation/native";
import DiscardModal from "../../../modals/DiscardModal";

const Page = () => {
    const userInfo = useSelector((state: RootState) => state.userInfo)
    const fullName = userInfo.name
    const splitFullName = userInfo.name.split(' ')
    const firstName = splitFullName[0].charAt(0).toUpperCase(), lastName = splitFullName[1].charAt(0).toUpperCase()
    const abbrevName = firstName + lastName
    const [displayAvatarModal, setDisplayAvatarModal] = useState(false)
    const [image, setImage] = useState('')
    const [viewProfileModal, setViewProfileModal] = useState(false)
    const [del, setDel] = useState(false)
    const [nameInput, setNameInput] = useState<string>(fullName)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const navigation = useNavigation()
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<NavigationAction | null>(null);

    const imagePicker = async () => {
        Alert.alert(
            "Grant Chat Sphere photo access?",
            "Chat Sphere would like to access your photo library to help you share pictures in your chats.",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Ok",
                    style: "default",
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ['images'],
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setImage(result.assets[0].uri);
                        }
                    },
                },
            ]
        )
    }

    const handleDisplayAvatarModal = () => {
        setDisplayAvatarModal((prev) => !prev);
    }

    const saveEdits = () => {

    }

    const handleChange = (text: string) => {
        setNameInput(text);
    }

    useEffect(() => {
        setShowSaveButton(fullName !== nameInput || image !== '');
    }, [nameInput, image])

    const preventScreenRemoval = image !== '' || fullName !== nameInput

    usePreventRemove(preventScreenRemoval, ({data}) => {
        setPendingAction(data.action)
        setShowDiscardModal(true)
    })

    const confirmDiscard = () => {
        if (pendingAction) {
            navigation.dispatch(pendingAction);
            setPendingAction(null);
        }
        setShowDiscardModal(false);
    };

    const cancelDiscard = () => {
        setPendingAction(null);
        setShowDiscardModal(false);
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonView}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} style={styles.backButton}>
                        <Icon name="arrow-back" size={30} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.backButtonText}>Profile</Text>
                </View>
                {showSaveButton &&
                    <TouchableOpacity style={styles.saveButton} onPress={saveEdits} activeOpacity={0.9}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <View style={styles.nameAbbrevView}>
                        {image ? <Image source={{uri: image}} style={styles.avatarImage}/> :
                            <Text style={styles.abbrevText}>{abbrevName}</Text>
                        }
                        <TouchableOpacity onPress={() => setDisplayAvatarModal(true)} style={styles.iconView}>
                            <Icon name="edit" size={16} color="white"/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.viewProfile} activeOpacity={1}
                                      onPress={() => setViewProfileModal(prevState => !prevState)}>
                        <Text style={styles.viewProfileText}>Preview profile</Text>
                    </TouchableOpacity>

                    <View style={styles.nameView}>
                        <View style={styles.nameLabel}>
                            <Text>Name</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
                            <TextInput
                                value={nameInput}
                                onChangeText={text => handleChange(text)}
                                onPressIn={() => setDel(true)}
                                multiline={false}
                                scrollEnabled={true}
                                numberOfLines={1}
                                style={styles.textInput}
                                autoCorrect={false}
                            />
                            {del && (
                                <TouchableOpacity onPress={() => setNameInput('')} style={styles.cancelIconView}>
                                    <Icon name='cancel' size={14} color='white'/>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                {displayAvatarModal &&
                    <AvatarModal handleModalDisplay={handleDisplayAvatarModal} choosePhoto={imagePicker}/>}
                {viewProfileModal && <ViewProfileModal setViewProfileModal={setViewProfileModal} fullName={fullName}
                                                       abbrevName={abbrevName}/>}
            </View>
            {showDiscardModal && <DiscardModal showDiscardModal={showDiscardModal} cancelDiscard={cancelDiscard}
                                               confirmDiscard={confirmDiscard}/>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 4,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backButton: {
        backgroundColor: "black",
        width: 50,
        height: 50,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 20,
        fontWeight: "600"
    },
    saveButton: {
        backgroundColor: "#085bd8",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    childContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameAbbrevView: {
        marginVertical: 24,
        backgroundColor: 'white',
        height: 160,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 96,
        padding: 10,
    },
    avatarImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 96
    },
    abbrevText: {
        fontSize: 56,
        fontWeight: '800'
    },
    viewProfile: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 48,
        marginVertical: 10,
    },
    viewProfileText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10
    },
    nameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '90%',
        padding: 12,
        borderRadius: 8,
        marginVertical: 20,
    },
    nameLabel: {
        width: '20%',
        justifyContent: 'center'
    },
    iconView: {
        position: 'absolute',
        left: '84%',
        top: '90%',
        backgroundColor: '#085bd8',
        borderRadius: 20,
        padding: 6,
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 6,
        textAlign: 'right',
    },
    cancelIconView: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#a9a6a6',
        marginLeft: 6,
    }
});

export default Page;
