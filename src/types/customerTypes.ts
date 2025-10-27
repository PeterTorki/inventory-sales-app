export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export interface CustomerFormProps {
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
