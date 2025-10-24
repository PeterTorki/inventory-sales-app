import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AppText from "../../components/AppText";
import { colors } from "../../constants/colors";
import { sizes } from "../../constants/sizes";
import Header from "../../components/Header";
import AppButton from "../../components/AppButton";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import LoginFooter from "./components/LoginFooter";
import { validateEmail, validatePassword } from "./services";
import { styles } from "./styles";

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => Promise<void>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    setErrors({ ...errors, email: validateEmail(email) });
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    setErrors({ ...errors, password: validatePassword(password) });
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      setIsLoading(true);
      try {
        if (onLogin) {
          await onLogin(email, password);
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        <View style={styles.formCard}>
          <AppText variant="h3" bold style={styles.cardTitle}>
            Login
          </AppText>

          <EmailInput
            value={email}
            onChangeText={setEmail}
            onBlur={handleEmailBlur}
            error={touched.email ? errors.email : ""}
          />

          <PasswordInput
            value={password}
            onChangeText={setPassword}
            onBlur={handlePasswordBlur}
            error={touched.password ? errors.password : ""}
          />

          <AppButton
            title={isLoading ? "Loading..." : "Login"}
            loading={isLoading}
            color={colors.text}
            onPress={handleLogin}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          />
        </View>

        <LoginFooter />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
