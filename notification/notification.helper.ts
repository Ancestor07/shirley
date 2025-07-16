import {PermissionsAndroid} from "react-native";
import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";

const requestUserPermission = async () => {
    const granted =await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the notifications");
    } else {
        console.log("Notification permission denied");
    }
}

const getToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
    } catch (error) {
        console.error("Error getting FCM token:", error);
    }
}

export const useNotification = () => {
    useEffect(() => {
        requestUserPermission().then()
        getToken().then()
    }, []);
}