import React from "react";
import AppInput from "../../../components/AppInput";

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText, onBlur, error }) => {
  return (
    <AppInput
      label="Email"
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder="Enter your email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      error={error}
      required
    />
  );
};

export default EmailInput;
