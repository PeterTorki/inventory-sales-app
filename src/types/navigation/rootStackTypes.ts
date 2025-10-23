import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "./authStackTypes";
import { MainStackParamList } from "./mainStackTypes";

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  Loading: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
