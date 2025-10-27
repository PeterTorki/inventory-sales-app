import React from "react";
import { View } from "react-native";
import AppText from "../../../../components/AppText";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import ReusableDropdown from "../../../../components/ReusableDropdown";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { ItemFormProps } from "../../../../types/itemTypes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { itemFormStyles as styles } from "./styles";

const ItemForm: React.FC<ItemFormProps> = ({
  formData,
  errors,
  categories,
  isLoading,
  buttonTitle,
  updateField,
  onSubmit,
  onCancel,
}) => {
  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const navigation = useNavigation<any>();

  return (
    <View style={styles.formCard}>
      <AppText variant="h4" bold style={styles.sectionTitle}>
        Item Information
      </AppText>

      <AppInput
        label="Item Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        placeholder="Enter item name"
        error={errors.name}
        required
      />

      <View style={{ marginBottom: sizes.spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: sizes.spacing.sm,
          }}>
          <ReusableDropdown
            value={formData.category_id ? categories.find((cat) => cat.id === formData.category_id)?.name : ""}
            data={categoryItems}
            onChange={(item) => {
              updateField("category_id", typeof item.value === "string" ? parseInt(item.value) : item.value);
            }}
            placeholder="Select category"
            dropInDirection="column"
          />
          <AppButton
            icon={<Ionicons name="add-circle-outline" size={20} color={colors.text} />}
            onPress={() => navigation.navigate("ItemsStack", { screen: "Category", params: { isAddCategory: true } })}
            size="s"
            width="auto"
            variant="primary"
            pv={sizes.icon.xs}
          />
        </View>
        {errors.category_id ? (
          <AppText variant="body" color={colors.error}>
            {errors.category_id}
          </AppText>
        ) : null}
      </View>

      <AppInput
        label="Price"
        value={formData.price}
        onChangeText={(text) => updateField("price", text)}
        placeholder="0.00"
        keyboardType="decimal-pad"
        error={errors.price}
        required
      />

      <AppInput
        label="Quantity"
        value={formData.quantity}
        onChangeText={(text) => updateField("quantity", text)}
        placeholder="0"
        keyboardType="number-pad"
        error={errors.quantity}
        required
      />

      <View style={styles.buttonGroup}>
        <AppButton title="Cancel" onPress={onCancel} variant="outline" width="48%" />
        <AppButton title={buttonTitle} onPress={onSubmit} loading={isLoading} disabled={isLoading} width="48%" />
      </View>
    </View>
  );
};

export default ItemForm;
