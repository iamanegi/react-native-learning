import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permission required", "Notification permissions required.");
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(`PUSH TOKEN: ${pushTokenData.data}`);
      setPushToken(pushTokenData.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      const userName = notification.request.content.data.userName;
      console.log(`NOTIFICATION RECEIVED: ${userName}`);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      const userName = response.notification.request.content.data.userName;
      console.log(`NOTIFICATION RESPONSE RECEIVED: ${userName}`);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification title",
        body: "This is the body of the notification.",
        data: {
          userName: "John",
        },
      },
      trigger: {
        seconds: 3,
      },
    });
  }

  function sendPushNotificationHandler() {
    if (pushToken) {
      console.log(pushToken);
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          title: "Test Push Notification",
          body: "This is the body of the push notifcation.",
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
      <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
