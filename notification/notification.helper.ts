// import notifee from '@notifee/react-native';
// import {Dispatch} from "redux";
// import {NavigationContainerRefWithCurrent, ParamListBase} from "@react-navigation/native";
// import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
//
// export const displayNotification = async (remoteMessage: any) => {
//     console.log(remoteMessage)
//     await notifee.displayNotification(remoteMessage)
// }
//
// export const initialNotificationNotifee = async () => {
//     const initialNotification = await notifee.getInitialNotification();
//
//     if (initialNotification) {
//         notifee.onBackgroundEvent(async (event: any) => {
//             const {type, detail} = event;
//             const {notification, pressAction} = detail;
//         });
//     }
// }
// export const backgroundMessageHandler = async (
//     remoteMessage: FirebaseMessagingTypes.RemoteMessage
// ) => {
//     const newConfig = {
//         asForegroundService: false,
//         sound: 'sound_10',
//     };
//     const notifPayload: FirebaseMessagingTypes.Notification = {};
//     notifPayload.android = newConfig;
//
//     remoteMessage.notification = notifPayload;
// };
//
// export const messageInitialization = (
//     dispatch: Dispatch<any>,
//     remoteMessage: FirebaseMessagingTypes.RemoteMessage | null
// ) => {
//     if (remoteMessage) {
//     }
// };
//
// export const initializeFirebaseMessaging = async (
//     dispatch: Dispatch<any>,
//     navigationRef: NavigationContainerRefWithCurrent<ParamListBase>
// ) => {
//     messaging().setBackgroundMessageHandler(backgroundMessageHandler);
//
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             messageInitialization(dispatch, remoteMessage);
//         });
//
//
//     messaging().onNotificationOpenedApp(
//         async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
//             // onNotificationOpen(dispatch, navigationRef, remoteMessage);
//         }
//     );
// };

