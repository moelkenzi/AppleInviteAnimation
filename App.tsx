import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppleInvites from "./AppleInvites";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppleInvites />
    </GestureHandlerRootView>
  );
}
