import { getAllCustomers, deleteCustomer } from "../../../database/queries";
import { Customer } from "../../../types";
import { createLoadDataService, createDeleteService } from "../../../utils/dataServices";

const loadDataService = createLoadDataService<Customer>(getAllCustomers, "Failed to load customers");

export const loadCustomers = (
  setCustomers: (customers: Customer[]) => void,
  setIsLoading: (loading: boolean) => void
) => {
  loadDataService(setCustomers, setIsLoading);
};

const deleteService = createDeleteService<Customer>(
  deleteCustomer,
  "Customer",
  "Failed to delete customer. They may be linked to invoices."
);

export const handleDeleteCustomer = (customer: Customer, onSuccess: () => void) => {
  deleteService(customer, onSuccess);
};
