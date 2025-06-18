import React, {useEffect} from "react";
import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {useLoadedAssets} from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import {useColorScheme} from "react-native";
import {Provider} from "react-redux";
import storeRedux from "./redux/store";
import messaging from '@react-native-firebase/messaging';
import { MonitoringAction } from "./redux/actions/monitoring.action";

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
                          storeRedux.dispatch(new MonitoringAction().subscribeToTopic('water-topic', fcmToken));
                      })
                      .then(() => {
                          messaging().subscribeToTopic('water-topic')
                      })
                      .then(() => console.log('Subscribed to topic!'));
              }
          });
      // Handle foreground messages
      return messaging().onMessage(async remoteMessage => {
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  }, [])


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
