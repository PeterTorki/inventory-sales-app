import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/home/DashboardScreen";
import ItemsNavigator from "./ItemsStack";
import CustomersNavigator from "./CustomersStack";
import TransactionsNavigator from "./TransactionsStack";
import { useColors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import { fonts } from "../constants/fonts";
import { MainTabsParamList } from "../types/mainTabsTypes";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hs, ms, width } from "../utils/metrics";
import { MainTabProps } from "../types/mainStackTypes";

const MainTabs = createBottomTabNavigator<MainTabsParamList>();

function getTabBarIcon(
  { focused, color, size }: { focused: boolean; color: string; size: number },
  inActiveIcon: keyof typeof Ionicons.glyphMap
) {
  const icon = inActiveIcon;

  return (
    <View
      style={{
        backgroundColor: focused ? "#2E3032" : "transparent",
        padding: hs(8),
        borderRadius: hs(sizes.radius.l),
      }}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  );
}

const MainTabNavigator: React.FC<MainTabProps> = () => {
  console.log("hi");
  const colors = useColors(false);

  console.log(colors);
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: hs(80),
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarIconStyle: {
          width: ms(sizes.icon.xxl),
          height: ms(sizes.icon.xxl),
        },
      }}>
      <MainTabs.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "home-outline"),
        }}
      />
      <MainTabs.Screen
        name="Items"
        component={ItemsNavigator}
        options={{
          title: "Items",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "cube-outline"),
        }}
      />
      <MainTabs.Screen
        name="Customers"
        component={CustomersNavigator}
        options={{
          title: "Customers",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "people-outline"),
        }}
      />
      <MainTabs.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "receipt-outline"),
        }}
      />
    </MainTabs.Navigator>
  );
};

export default MainTabNavigator;
