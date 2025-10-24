import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AppInput from "../../../components/AppInput";
import { colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChangeText, onBlur, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <AppInput
      label="Password"
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder="Enter your password"
      secureTextEntry={!isPasswordVisible}
      autoCapitalize="none"
      error={error}
      required
      rightIcon={
        isPasswordVisible ? (
          <Ionicons name="eye-off" size={20} color={colors.textSecondary} />
        ) : (
          <Ionicons name="eye" size={20} color={colors.textSecondary} />
        )
      }
      onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
    />
  );
};

export default PasswordInput;
