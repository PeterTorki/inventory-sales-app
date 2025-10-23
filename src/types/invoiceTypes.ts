export interface InvoiceItem {
  id: number;
  invoice_id: number;
  item_id: number;
  item_name?: string;
  quantity: number;
  price: number;
  extended_amount: number;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  customer_id: number;
  customer_name?: string;
  date: string;
  subtotal: number;
  vat: number;
  total: number;
}

export interface InvoiceDetail extends Invoice {
  items: InvoiceItem[];
}
