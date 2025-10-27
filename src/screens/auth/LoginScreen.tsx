import React, { useState, useCallback } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AppText from "../../components/AppText";
import { colors } from "../../constants/colors";
import Header from "../../components/Header";
import AppButton from "../../components/AppButton";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import LoginFooter from "./components/LoginFooter";
import { validateEmail, validatePassword } from "./services";
import { styles } from "./styles";
import { useAuth } from "../../context/AuthContext";
import { FormField, LoginForm, LoginScreenProps } from "../../types/authTypes";

const INITIAL_FIELD_STATE: FormField = {
  value: "",
  error: "",
  touched: false,
};

const INITIAL_FORM_STATE: LoginForm = {
  email: { ...INITIAL_FIELD_STATE },
  password: { ...INITIAL_FIELD_STATE },
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginForm>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof LoginForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,

        error: prev[field].touched ? "" : prev[field].error,
      },
    }));
  }, []);

  const validateField = useCallback((field: keyof LoginForm) => {
    setForm((prev) => {
      const validator = field === "email" ? validateEmail : validatePassword;
      const error = validator(prev[field].value);

      return {
        ...prev,
        [field]: {
          ...prev[field],
          error,
          touched: true,
        },
      };
    });
  }, []);

  const handleBlur = useCallback(
    (field: keyof LoginForm) => () => {
      validateField(field);
    },
    [validateField]
  );

  const handleChange = useCallback(
    (field: keyof LoginForm) => (value: string) => {
      updateField(field, value);
    },
    [updateField]
  );

  const validateForm = useCallback((): boolean => {
    const emailError = validateEmail(form.email.value);
    const passwordError = validatePassword(form.password.value);

    setForm((prev) => ({
      email: { ...prev.email, error: emailError, touched: true },
      password: { ...prev.password, error: passwordError, touched: true },
    }));

    return !emailError && !passwordError;
  }, [form.email.value, form.password.value]);

  const setServerError = useCallback((message: string) => {
    setForm((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        error: message,
      },
    }));
  }, []);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(form.email.value, form.password.value);

      if (!success) {
        setServerError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [form.email.value, form.password.value, login, validateForm, setServerError]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
      <Header title="Welcome Back" caption="Please login to your account" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formCard}>
          <AppText variant="h3" bold style={styles.cardTitle}>
            Login
          </AppText>

          <EmailInput
            value={form.email.value}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={form.email.touched ? form.email.error : ""}
            disabled={isLoading}
          />

          <PasswordInput
            value={form.password.value}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={form.password.touched ? form.password.error : ""}
            editable={!isLoading}
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
