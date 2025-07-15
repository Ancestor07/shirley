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
import notifee from "@notifee/react-native";

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
                          messaging().subscribeToTopic('sensor')
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
            console.log("Foreground notification received:", remoteMessage);

            // Display the notification using Alert (basic React Native)
            Alert.alert(
                remoteMessage.notification?.title || "Notification",
                remoteMessage.notification?.body || "You have a new message"
            );
        })
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log("Background notification received:", remoteMessage);

            if (Platform.OS === "android") {
                // Use a local notification library or system notification API for Android
                console.log("Display notification in background (Android)");
            }
        });
        return () => {
            unsubscribeForeground();
        }
        // messaging().onMessage(async remoteMessage => {
        //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        //     console.log('Notification caused app to open from background state:', remoteMessage.notification);
        //     await notifee.displayNotification(remoteMessage);
        // })
    }, []);

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
