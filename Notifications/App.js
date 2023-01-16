import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
