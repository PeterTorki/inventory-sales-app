// App.tsx
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigation from "./src/navigation/AppNavigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
