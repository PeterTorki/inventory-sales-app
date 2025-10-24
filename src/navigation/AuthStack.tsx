import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import { AuthStackParamList } from "../types/navigation/authStackTypes";
import { withSafeArea } from "./withSafeArea";
import { colors } from "../constants/colors";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Login"
        component={withSafeArea(LoginScreen, {
          scrollable: false,
          noPadding: true,
          backgroundColor: colors.primary,
        })}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
