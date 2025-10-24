import { useWindowDimensions } from "react-native";
import { colors } from "../../constants/colors";
import { MainStackParamList } from "../../types/navigation/mainStackTypes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation<MainStackParamList>();
  const { width } = useWindowDimensions();

  return [
    {
      title: "Items",
      value: "150",
      iconName: "cube-outline",
      color: colors.text,
      backgroundColor: colors.infoLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("Items"),
    },
    {
      title: "Customers",
      value: "7",
      iconName: "people-outline",
      color: colors.text,
      backgroundColor: colors.successLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("Customers"),
    },
    {
      title: "Invoices",
      value: "50",
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
      onPress: () => navigation.navigate("ItemsStack", { screen: "AddItem" }),
    },
    {
      title: "Add Customer",
      value: "+",
      iconName: "person-add-outline",
      color: colors.text,
      backgroundColor: colors.successLight,
      width: width < 400 ? "100%" : "48%",
      onPress: () => navigation.navigate("CustomersStack", { screen: "AddCustomer" }),
    },
    {
      title: "Create Invoice",
      value: "+",
      iconName: "document-text-outline",
      color: colors.text,
      backgroundColor: colors.infoLight,
      width: width < 400 ? "100%" : "48%",
      // onPress: () => navigation.navigate("CreateInvoice"),
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
