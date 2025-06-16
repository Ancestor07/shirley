import notifee, {AndroidImportance, AndroidLaunchActivityFlag, Notification} from "@notifee/react-native";
import {Dispatch} from "redux";
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {NavigationContainerRefWithCurrent, ParamListBase} from "@react-navigation/native";
import {Permission, PermissionsAndroid} from "react-native";

export const onMessageReceived = async (
    dispatch: any,
    message: {
        notification: Notification;
        messageId: string;
        data: any;
    }
) => {
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
    });

    const objAndroid = {
        ...message.notification?.android,
        pressAction: {
            id: message.messageId,
            launchActivity: 'default',
            launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        }
    };

    const notificationData: Notification = {
        title: message.data?.title,
        body: message.data?.body,
        ...message.notification,
        android: {
            channelId,
            ...objAndroid,
        },
        data: {
            ...message.data,
        },
    }
    await notifee.displayNotification(notificationData);
}

export const messageInitialization = (
    dispatch: Dispatch<any>,
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null
) => {
    if (remoteMessage) {
        dispatch({payload: remoteMessage, type: 'SET_NOTIFICATION'});
    }
}

export const initializeFirebaseMessaging = async (
    dispatch: Dispatch<any>,
    navigationRef: NavigationContainerRefWithCurrent<ParamListBase>
) => {
    messaging().setBackgroundMessageHandler(backgroundMessageHandler)

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            messageInitialization(dispatch, remoteMessage)
        })
}

export const backgroundMessageHandler = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
    const newConfig = {
        asForegroundService: false,
        sound: 'default',
    }
    const notifPayload: FirebaseMessagingTypes.Notification = {}
    notifPayload.android = newConfig
    remoteMessage.notification = notifPayload
}

export const subscribeNotificationTopic = (dispatch: Dispatch<any>) => {
    messaging()
        .subscribeToTopic("water-topic")
        .then(() => {
            console.log("Subscribed to topic!");
        })
}

export const unsubscribeNotificationTopic = (dispatch: Dispatch<any>) => {
    messaging()
        .unsubscribeFromTopic("water-topic")
        .then(() => {
            console.log("Unsubscribed from topic!");
        })
}

export const checkPermission = async (permission: Permission) => {
    PermissionsAndroid.check(permission).then(response => {
        return response
    })
    return false
}

export const requestPermission = async (
    permission: Permission,
    title: string,
    message: string,
    mode = 'single'
) => {
    let rationale = {
        title: title,
        message: message,
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Agree',
    }

    try {
        let granted = await PermissionsAndroid.request(permission, rationale)
        return granted
    } catch (error) {
        return error
    }
}
