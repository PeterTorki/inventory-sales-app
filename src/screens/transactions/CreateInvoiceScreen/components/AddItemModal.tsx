import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import AppModal from "../../../../components/AppModal";
import AppText from "../../../../components/AppText";
import AppInput from "../../../../components/AppInput";
import AppButton from "../../../../components/AppButton";
import ReusableDropdown from "../../../../components/ReusableDropdown";
import { colors } from "../../../../constants/colors";
import { sizes } from "../../../../constants/sizes";
import { Item, InvoiceItem } from "../../../../types";

interface AddItemModalProps {
  visible: boolean;
  items: Item[];
  editingItem: InvoiceItem | null;
  selectedItems?: InvoiceItem[];
  onSave: (item: { item_id: number; quantity: number }) => void;
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  visible,
  items,
  editingItem,
  selectedItems = [],
  onSave,
  onClose,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState("");
  const [itemError, setItemError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  useEffect(() => {
    if (visible) {
      if (editingItem) {
        setSelectedItemId(editingItem.item_id);
        setQuantity(editingItem.quantity.toString());
      } else {
        setSelectedItemId(null);
        setQuantity("");
      }
      setItemError("");
      setQuantityError("");
    }
  }, [visible, editingItem]);

  const availableItems = items.filter((item) => {
    if (editingItem && item.id === editingItem.item_id) {
      return true;
    }
    return !selectedItems.some((selected) => selected.item_id === item.id);
  });

  const itemOptions = availableItems.map((item) => ({
    label: `${item.name} - Stock: ${item.quantity}`,
    value: item.id,
  }));

  const handleSave = () => {
    let hasError = false;

    if (!selectedItemId) {
      console.log("hi");
      setItemError("Please select an item");
      hasError = true;
    } else {
      setItemError("");
    }

    const qty = parseInt(quantity);
    if (!quantity || isNaN(qty) || qty <= 0) {
      setQuantityError("Please enter a valid quantity greater than 0");
      hasError = true;
    } else {
      const selectedItem = items.find((i) => i.id === selectedItemId);
      if (selectedItem && qty > selectedItem.quantity) {
        setQuantityError(`Only ${selectedItem.quantity} units available in stock`);
        hasError = true;
      } else {
        setQuantityError("");
      }
    }

    if (hasError) return;

    onSave({ item_id: selectedItemId!, quantity: qty });
    afterCloseHandler();
    onClose();
  };

  const handleClose = () => {
    Keyboard.dismiss();
    afterCloseHandler();
    onClose();
  };

  const afterCloseHandler = () => {
    setSelectedItemId(null);
    setQuantity("");
    setItemError("");
    setQuantityError("");
  };

  return (
    <AppModal
      modalTitle={editingItem ? "Edit Item" : "Add Item"}
      visible={visible}
      onClose={handleClose}
      dismissOnOutsidePress={true}>
      <View>
        <View style={{ flexDirection: "column" }}>
          <AppText variant="body" style={styles.label}>
            Item
            <AppText variant="body" color={colors.error}>
              *
            </AppText>
          </AppText>
          <ReusableDropdown
            value={selectedItemId ? items.find((i) => i.id === selectedItemId)?.name || "" : ""}
            data={itemOptions}
            onChange={(item) => {
              setSelectedItemId(typeof item.value === "string" ? parseInt(item.value) : item.value);
              setItemError("");
            }}
            placeholder="Select item"
            disabled={!!editingItem}
            searchable={true}
            error={itemError}
			dropInDirection="column"
          />
        </View>

        <AppInput
          label="Quantity"
          value={quantity}
          onChangeText={(text) => {
            setQuantity(text);
            setQuantityError("");
          }}
          placeholder="Enter quantity"
          keyboardType="number-pad"
          required
          autoFocus={!editingItem}
          returnKeyType="done"
          onSubmitEditing={handleSave}
          error={quantityError}
        />
      </View>
      {selectedItemId && (
        <View style={styles.itemDetails}>
          <AppText variant="body" color={colors.textSecondary}>
            Price: ${items.find((i) => i.id === selectedItemId)?.price.toFixed(2)}
          </AppText>
          <AppText variant="body" color={colors.textSecondary}>
            Available: {items.find((i) => i.id === selectedItemId)?.quantity}
          </AppText>
        </View>
      )}
      <View style={styles.buttonGroup}>
        <AppButton title="Cancel" onPress={handleClose} variant="outline" width="48%" />
        <AppButton title={editingItem ? "Update" : "Add"} onPress={handleSave} width="48%" />
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: sizes.spacing.xs,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight + "10",
    padding: sizes.spacing.md,
    borderRadius: sizes.radius.md,
    marginBottom: sizes.spacing.md,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: sizes.spacing.md,
    marginTop: sizes.spacing.md,
  },
});

export default AddItemModal;
