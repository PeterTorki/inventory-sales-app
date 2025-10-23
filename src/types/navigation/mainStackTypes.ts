import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigatorScreenParams } from "@react-navigation/native";
import { MainTabsParamList } from "./mainTabsTypes";

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};

export type MainTabProps = NativeStackScreenProps<MainStackParamList, "MainTabs">;
