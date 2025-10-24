import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation/rootStackTypes";
import AuthNavigator from "./AuthStack";
import MainNavigator from "./MainStack";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="MainStack" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigation;
