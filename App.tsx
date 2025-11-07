import React, {useEffect} from "react";
import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {useLoadedAssets} from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import {Alert, Platform, useColorScheme} from "react-native";
import {Provider} from "react-redux";
import storeRedux from "./redux/store";
import messaging from '@react-native-firebase/messaging';
import { MonitoringAction } from "./redux/actions/monitoring.action";
import {useNotification} from "./notification/notification.helper";

// Set the background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    // Add any additional logic for handling background messages here
});

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  useEffect(() => {
      messaging().requestPermission()
          .then(authStatus => {
              const enabled =
                  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                  authStatus === messaging.AuthorizationStatus.PROVISIONAL;

              if (enabled) {
                  console.log('Authorization status:', authStatus);
                  messaging().getToken()
                      .then(fcmToken => {
                          console.log('FCM Token:', fcmToken);
                          // Subscribe to the topic with the FCM token
                          storeRedux.dispatch(new MonitoringAction().subscribeToTopic('sensor', fcmToken));
                      })
                      .then(() => {
                          messaging().subscribeToTopic('sensor').then()
                      })
                      .then(() => console.log('Subscribed to topic!'))
                      .then(() => {messaging().onMessage(async remoteMessage => {
                          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
                      })});
              }
          });
  }, [])

    useEffect(() => {
        const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
            // Display the notification using Alert (basic React Native)
            Alert.alert(
                remoteMessage.notification?.title || "Notification",
                remoteMessage.notification?.body || "You have a new message"
            );
        })
        return () => {
            unsubscribeForeground();
        }
    }, []);
    useNotification()
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store={storeRedux}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </Provider>
    );
  }
}
