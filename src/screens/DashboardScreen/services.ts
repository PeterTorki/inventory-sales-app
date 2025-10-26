import { useWindowDimensions } from "react-native";
import { colors } from "../../constants/colors";
import { MainStackParamList } from "../../types/navigation/mainStackTypes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getItemCount, getCustomerCount, getInvoiceCount } from "../../database/queries";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export interface CardItem {
  title: string;
  value: string | number;
  iconName: keyof typeof Ionicons.glyphMap;
  color?: keyof typeof colors | string;
  backgroundColor?: keyof typeof colors | string;
  width: number | string;
  onPress?: () => void;
}

export const useOverviewCards = (): CardItem[] => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const [stats, setStats] = useState({
    items: 0,
    customers: 0,
    invoices: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const items = getItemCount();
      const customers = getCustomerCount();
      const invoices = getInvoiceCount();

      setStats({ items, customers, invoices });
    }, [])
  );

  return [
    {
      title: "Items",
      value: stats.items,
      iconName: "cube-outline",
      color: colors.text,
      backgroundColor: colors.infoLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("Items"),
    },
    {
      title: "Customers",
      value: stats.customers,
      iconName: "people-outline",
      color: colors.text,
      backgroundColor: colors.successLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("Customers"),
    },
    {
      title: "Invoices",
      value: stats.invoices,
      iconName: "receipt-outline",
      color: colors.text,
      backgroundColor: colors.warningLight,
      width: "100%",
      onPress: () => navigation.navigate("Transactions"),
    },
  ];
};

export const useQuickActionCards = (): CardItem[] => {
  const navigation = useNavigation<MainStackParamList>();

  const { width } = useWindowDimensions();

  return [
    {
      title: "Add Item",
      value: "+",
      iconName: "add-circle-outline",
      color: colors.text,
      backgroundColor: colors.primaryLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("AddItem"),
    },
    {
      title: "Add Customer",
      value: "+",
      iconName: "person-add-outline",
      color: colors.text,
      backgroundColor: colors.successLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("AddCustomer"),
    },
    {
      title: "Create Invoice",
      value: "+",
      iconName: "document-text-outline",
      color: colors.text,
      backgroundColor: colors.infoLight,
      width: width < 400 ? "100%" : "48%",

      onPress: () => navigation.navigate("TransactionsStack", { screen: "CreateInvoice" }),
    },
    {
      title: "View Reports",
      value: ">",
      iconName: "stats-chart-outline",
      color: colors.text,
      backgroundColor: colors.errorLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("Transactions"),
    },
  ];
};
