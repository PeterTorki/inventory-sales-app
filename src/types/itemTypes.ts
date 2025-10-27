import { Category } from "./categoryTypes";

export interface Item {
  id: number;
  name: string;
  category_id: number;
  category_name?: string;
  price: number;
  quantity: number;
}

export interface ItemFormProps {
  formData: {
    name: string;
    category_id: number | null;
    price: string;
    quantity: string;
  };
  errors: {
    name: string;
    category_id: string;
    price: string;
    quantity: string;
  };
  categories: Category[];
  isLoading: boolean;
  buttonTitle: string;
  updateField: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
