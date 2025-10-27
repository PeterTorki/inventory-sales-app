export interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

export interface LoginForm {
  email: FormField;
  password: FormField;
}

export interface LoginScreenProps {
  onLogin?: (email: string, password: string) => Promise<void>;
}
