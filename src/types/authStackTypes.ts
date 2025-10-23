import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;
