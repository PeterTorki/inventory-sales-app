import React from "react";
import AppInput, { AppInputProps } from "../../../components/AppInput";

interface EmailInputProps extends AppInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText, onBlur, error, ...inputProps }) => {
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
      {...inputProps}
    />
  );
};

export default EmailInput;
