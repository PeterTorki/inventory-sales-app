import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen/DashboardScreen";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import { MainTabsParamList } from "../types/navigation/mainTabsTypes";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hs, ms } from "../utils/metrics";
import { MainTabProps } from "../types/navigation/mainStackTypes";
import ItemListScreen from "../screens/items/ItemListScreen/ItemListScreen";
import CustomerListScreen from "../screens/customers/CustomerListScreen";
import InvoiceDetailScreen from "../screens/transactions/InvoiceDetailScreen";
import { withSafeArea } from "./withSafeArea";
import CategoryScreen from "../screens/items/CategoryScreen/CategoryScreen";

const MainTabs = createBottomTabNavigator<MainTabsParamList>();

function getTabBarIcon(
  { focused, color, size }: { focused: boolean; color: string; size: number },
  iconName: keyof typeof Ionicons.glyphMap
) {
  return (
    <View
      style={{
        backgroundColor: focused ? "#2E3032" : "transparent",
        padding: hs(8),
        borderRadius: hs(sizes.radius.lg),
      }}>
      <Ionicons name={iconName} size={size} color={color} />
    </View>
  );
}

const MainTabNavigator: React.FC<MainTabProps> = () => {
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
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "home-outline"),
        }}
        component={withSafeArea(DashboardScreen, {
          scrollable: false,
          noPadding: true,
          backgroundColor: colors.primary,
        })}
      />

      <MainTabs.Screen
        name="Items"
        options={{
          title: "Items",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "cube-outline"),
        }}
        component={withSafeArea(ItemListScreen, {
          scrollable: false,
          noPadding: true,
          backgroundColor: colors.primary,
        })}
      />

      <MainTabs.Screen
        name="Customers"
        options={{
          title: "Customers",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "people-outline"),
        }}
        component={withSafeArea(CustomerListScreen)}
      />

      <MainTabs.Screen
        name="Transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon({ color, size, focused }, "receipt-outline"),
        }}
        component={withSafeArea(InvoiceDetailScreen)}
      />
    </MainTabs.Navigator>
  );
};

export default MainTabNavigator;
