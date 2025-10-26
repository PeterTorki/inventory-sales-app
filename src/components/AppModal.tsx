import React from "react";
import {
  Modal,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/colors";
import { sizes } from "../constants/sizes";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissOnOutsidePress?: boolean;
  scrollable?: boolean;
  modalTitle: string;
  modalTitleStyle?: object;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  children,
  dismissOnOutsidePress = true,
  scrollable = false,
  modalTitle = "Modal Title",
  modalTitleStyle,
}) => {
  const handleOutsidePress = () => {
    if (dismissOnOutsidePress) {
      if (!Keyboard.isVisible()) {
        onClose();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleInsidePress = (e: any) => {
    e.stopPropagation();
  };

  const Content = scrollable ? ScrollView : View;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleInsidePress}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
              <Content
                style={styles.modalContent}
                contentContainerStyle={scrollable ? styles.scrollContent : undefined}
                showsVerticalScrollIndicator={scrollable}
                keyboardShouldPersistTaps="handled">
                <View style={{ ...styles.modalHeader, ...modalTitleStyle }}>
                  <AppText variant="h4" bold>
                    {modalTitle}
                  </AppText>

                  <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close" size={28} color={colors.text} />
                  </TouchableOpacity>
                </View>
                {children}
              </Content>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoid: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.xl,
    padding: sizes.spacing.xl,
    width: "90%",
    maxWidth: 500,
    maxHeight: "auto",
  },
  scrollContent: {
    height: 400,
    flexGrow: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
  },
});

export default AppModal;
