import db from "./db";
import { Category, Item, Customer, Invoice, InvoiceItem, InvoiceDetail } from "../types";

export const getAllCategories = (): Category[] => {
  try {
    return db.getAllSync<Category>("SELECT * FROM categories ORDER BY name");
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

export const addCategory = (name: string): number => {
  try {
    const result = db.runSync("INSERT INTO categories (name) VALUES (?)", [name]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = (id: number, name: string): void => {
  try {
    db.runSync("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = (id: number): void => {
  try {
    db.runSync("DELETE FROM categories WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getAllItems = (): Item[] => {
  try {
    return db.getAllSync<Item>(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      LEFT JOIN categories c ON i.category_id = c.id 
      ORDER BY i.name
    `);
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
};

export const getItemById = (id: number): Item | null => {
  try {
    return db.getFirstSync<Item>(
      `
      SELECT i.*, c.name as category_name 
      FROM items i 
      LEFT JOIN categories c ON i.category_id = c.id 
      WHERE i.id = ?
    `,
      [id]
    );
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const getItemsByCategory = (categoryId: number): Item[] => {
  try {
    return db.getAllSync<Item>("SELECT * FROM items WHERE category_id = ? ORDER BY name", [categoryId]);
  } catch (error) {
    console.error("Error getting items by category:", error);
    return [];
  }
};

export const addItem = (item: Omit<Item, "id">): number => {
  try {
    const result = db.runSync("INSERT INTO items (name, category_id, price, quantity) VALUES (?, ?, ?, ?)", [
      item.name,
      item.category_id,
      item.price,
      item.quantity,
    ]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const updateItem = (id: number, item: Omit<Item, "id">): void => {
  try {
    db.runSync("UPDATE items SET name = ?, category_id = ?, price = ?, quantity = ? WHERE id = ?", [
      item.name,
      item.category_id,
      item.price,
      item.quantity,
      id,
    ]);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = (id: number): void => {
  try {
    db.runSync("DELETE FROM items WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const getAllCustomers = (): Customer[] => {
  try {
    return db.getAllSync<Customer>("SELECT * FROM customers ORDER BY name");
  } catch (error) {
    console.error("Error getting customers:", error);
    return [];
  }
};

export const getCustomerById = (id: number): Customer | null => {
  try {
    return db.getFirstSync<Customer>("SELECT * FROM customers WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error getting customer:", error);
    return null;
  }
};

export const addCustomer = (customer: Omit<Customer, "id">): number => {
  try {
    const result = db.runSync("INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)", [
      customer.name,
      customer.phone,
      customer.email || null,
    ]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const updateCustomer = (id: number, customer: Omit<Customer, "id">): void => {
  try {
    db.runSync("UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?", [
      customer.name,
      customer.phone,
      customer.email || null,
      id,
    ]);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const deleteCustomer = (id: number): void => {
  try {
    db.runSync("DELETE FROM customers WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const getAllInvoices = (): Invoice[] => {
  try {
    return db.getAllSync<Invoice>(`
      SELECT i.*, c.name as customer_name 
      FROM invoices i 
      LEFT JOIN customers c ON i.customer_id = c.id 
      ORDER BY i.date DESC
    `);
  } catch (error) {
    console.error("Error getting invoices:", error);
    return [];
  }
};

export const getInvoiceById = (id: number): InvoiceDetail | null => {
  try {
    const invoice = db.getFirstSync<Invoice>(
      `
      SELECT i.*, c.name as customer_name 
      FROM invoices i 
      LEFT JOIN customers c ON i.customer_id = c.id 
      WHERE i.id = ?
    `,
      [id]
    );

    if (!invoice) return null;

    const items = db.getAllSync<InvoiceItem>(
      `
      SELECT ii.*, i.name as item_name 
      FROM invoice_items ii 
      LEFT JOIN items i ON ii.item_id = i.id 
      WHERE ii.invoice_id = ?
    `,
      [id]
    );

    return { ...invoice, items };
  } catch (error) {
    console.error("Error getting invoice:", error);
    return null;
  }
};

export const addInvoice = (invoice: Omit<Invoice, "id">, items: Omit<InvoiceItem, "id" | "invoice_id">[]): number => {
  try {
    // Insert invoice
    const result = db.runSync(
      "INSERT INTO invoices (invoice_number, customer_id, date, subtotal, vat, total) VALUES (?, ?, ?, ?, ?, ?)",
      [invoice.invoice_number, invoice.customer_id, invoice.date, invoice.subtotal, invoice.vat, invoice.total]
    );

    const invoiceId = result.lastInsertRowId;

    // Insert invoice items and update inventory
    for (const item of items) {
      db.runSync(
        "INSERT INTO invoice_items (invoice_id, item_id, quantity, price, extended_amount) VALUES (?, ?, ?, ?, ?)",
        [invoiceId, item.item_id, item.quantity, item.price, item.extended_amount]
      );

      // Reduce inventory
      db.runSync("UPDATE items SET quantity = quantity - ? WHERE id = ?", [item.quantity, item.item_id]);
    }

    return invoiceId;
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
};

export const deleteInvoice = (id: number): void => {
  try {
    // Get invoice items to restore inventory
    const items = db.getAllSync<InvoiceItem>("SELECT * FROM invoice_items WHERE invoice_id = ?", [id]);

    // Restore inventory
    for (const item of items) {
      db.runSync("UPDATE items SET quantity = quantity + ? WHERE id = ?", [item.quantity, item.item_id]);
    }

    // Delete invoice (cascade will delete items)
    db.runSync("DELETE FROM invoices WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};

export const getNextInvoiceNumber = (): string => {
  try {
    const result = db.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM invoices");
    const count = result?.count || 0;
    return `INV-${String(count + 1).padStart(3, "0")}`;
  } catch (error) {
    console.error("Error getting next invoice number:", error);
    return "INV-001";
  }
};

// ==================== STATS ====================
export const getItemCount = (): number => {
  try {
    const result = db.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM items");
    return result?.count || 0;
  } catch (error) {
    console.error("Error getting item count:", error);
    return 0;
  }
};

export const getInvoiceCount = (): number => {
  try {
    const result = db.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM invoices");
    return result?.count || 0;
  } catch (error) {
    console.error("Error getting invoice count:", error);
    return 0;
  }
};

export const getCustomerCount = (): number => {
  try {
    const result = db.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM customers");
    return result?.count || 0;
  } catch (error) {
    console.error("Error getting customer count:", error);
    return 0;
  }
};
