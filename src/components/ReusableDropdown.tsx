import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  findNodeHandle,
  UIManager,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import AppText from "./AppText";

interface OptionItem {
  label: string;
  value: number; 
}

interface ReusableDropdownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}

const ReusableDropdown = ({
  data,
  onChange,
  placeholder,
  value: propValue,
  disabled = false,
}: ReusableDropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [dropdownTop, setDropdownTop] = useState(0);

  const buttonRef = useRef<View>(null);
  const value = propValue ?? internalValue;

  const toggleExpanded = useCallback(() => {
    if (disabled) return;
    if (!expanded) {
      if (buttonRef.current) {
        buttonRef.current.measureInWindow((x, y, width, height) => {
          setDropdownTop(y + height + (Platform.OS === "android" ? 0 : 20));
          setExpanded(true);
        });
      }
    } else {
      setExpanded(false);
    }
  }, [disabled, expanded]);

  const handleSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setInternalValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View ref={buttonRef}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        activeOpacity={0.8}
        onPress={toggleExpanded}
        disabled={disabled}>
        <AppText style={[styles.text, { color: value ? colors.text : colors.textTertiary }]}>
          {value || placeholder}
        </AppText>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {expanded && (
        <Modal visible={expanded} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View style={[styles.options, { top: dropdownTop }]}>
                <FlatList
                  keyExtractor={(item) => item.value.toString()}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.optionItem, item.label === value && { backgroundColor: "rgba(149, 178, 6, 0.3)" }]}
                      activeOpacity={0.8}
                      onPress={() => handleSelect(item)}>
                      <Text style={[styles.optionText, item.label === value && { color: colors.textSecondary }]}>
                        {item.label}
                      </Text>
                      {item.label === value && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default ReusableDropdown;

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.shadowDark,
  },
  text: {
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
  },
  options: {
    position: "absolute",
    alignSelf: "center",
    width: "85%",
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    maxHeight: 250,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight + "20",
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});
