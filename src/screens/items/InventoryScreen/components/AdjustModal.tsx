import React from "react";
import { View, Alert } from "react-native";
import AppModal from "../../../../components/AppModal";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import AppText from "../../../../components/AppText";
import { colors } from "../../../../constants/colors";
import { Item } from "../../../../types";
import { updateItem } from "../../../../database/queries";
import { adjustModalStyles as styles } from "./styles";

interface AdjustModalProps {
  visible: boolean;
  selectedItem: Item | null;
  adjustQuantity: string;
  adjustError: string;
  setAdjustQuantity: (qty: string) => void;
  setAdjustError: (error: string) => void;
  setIsModalVisible: (visible: boolean) => void;
  onSuccess: () => void;
}

const AdjustModal: React.FC<AdjustModalProps> = ({
  visible,
  selectedItem,
  adjustQuantity,
  adjustError,
  setAdjustQuantity,
  setAdjustError,
  setIsModalVisible,
  onSuccess,
}) => {
  const handleSave = () => {
    if (!selectedItem) return;

    const newQuantity = parseInt(adjustQuantity);
    if (isNaN(newQuantity) || newQuantity < 0) {
      setAdjustError("Please enter a valid quantity (0 or more)");
      return;
    }

    try {
      updateItem(selectedItem.id, {
        ...selectedItem,
        quantity: newQuantity,
      });
      Alert.alert("Success", "Inventory updated successfully");
      setIsModalVisible(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating inventory:", error);
      Alert.alert("Error", "Failed to update inventory");
    }
  };

  return (
    <AppModal
      visible={visible}
      onClose={() => setIsModalVisible(false)}
      modalTitle="Adjust Inventory"
      dismissOnOutsidePress>
      {selectedItem && (
        <>
          <AppText variant="body" color={colors.textSecondary} style={styles.modalSubtitle}>
            {selectedItem.name}
          </AppText>

          <View style={styles.currentStockInfo}>
            <AppText variant="label" color={colors.textSecondary}>
              Current Stock:
            </AppText>
            <AppText variant="h5" bold color={colors.primary}>
              {selectedItem.quantity} units
            </AppText>
          </View>

          <AppInput
            label="New Quantity"
            value={adjustQuantity}
            onChangeText={(text) => {
              setAdjustQuantity(text);
              setAdjustError("");
            }}
            placeholder="Enter new quantity"
            keyboardType="number-pad"
            error={adjustError}
            required
            autoFocus
          />

          <View style={styles.modalButtons}>
            <AppButton title="Cancel" onPress={() => setIsModalVisible(false)} variant="outline" width="48%" />
            <AppButton title="Update" onPress={handleSave} width="48%" />
          </View>
        </>
      )}
    </AppModal>
  );
};

export default AdjustModal;
