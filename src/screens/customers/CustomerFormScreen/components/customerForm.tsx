import React from "react";
import { View } from "react-native";
import AppText from "../../../../components/AppText";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import { customerFormStyles as styles } from "./styles";

interface CustomerFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  errors: {
    name: string;
    phone: string;
    email: string;
  };
  isLoading: boolean;
  buttonTitle: string;
  updateField: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  errors,
  isLoading,
  buttonTitle,
  updateField,
  onSubmit,
  onCancel,
}) => {
  return (
    <View style={styles.formCard}>
      <AppText variant="h4" bold style={styles.sectionTitle}>
        Customer Information
      </AppText>

      <AppInput
        label="Customer Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        placeholder="Enter customer name"
        error={errors.name}
        required
        autoCapitalize="words"
      />

      <AppInput
        label="Phone Number"
        value={formData.phone}
        onChangeText={(text) => updateField("phone", text)}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        error={errors.phone}
        required
      />

      <AppInput
        label="Email Address"
        value={formData.email}
        onChangeText={(text) => updateField("email", text)}
        placeholder="Enter email address (optional)"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      <View style={styles.buttonGroup}>
        <AppButton title="Cancel" onPress={onCancel} variant="outline" width="48%" />
        <AppButton title={buttonTitle} onPress={onSubmit} loading={isLoading} disabled={isLoading} width="48%" />
      </View>
    </View>
  );
};

export default CustomerForm;
