# Inventory & Sales Management App

A comprehensive mobile application built with React Native and Expo for managing inventory, customers, and sales transactions. This app provides an intuitive interface for small to medium-sized businesses to track their products, manage customer relationships, and process sales invoices efficiently.

## Demo

📹 [Watch Demo Video](https://drive.google.com/file/d/1Uf6qli9dn1zlK3MQfAaiFfGUDtmQHM1n/view?usp=drive_link)

## Features

- **User Authentication**: Secure login system with encrypted credential storage
- **Dashboard**: Overview of key metrics including total items, customers, and invoices
- **Inventory Management**:
  - Add, edit, and delete items
  - Organize items by categories
  - Track stock quantities and prices
  - Real-time inventory tracking
- **Customer Management**:
  - Maintain customer database
  - Store contact information (name, phone, email)
  - Quick customer lookup and search
- **Transaction Management**:
  - Create detailed sales invoices
  - Add multiple items to invoices
  - Automatic VAT calculation (14%)
  - Real-time stock validation
  - Invoice history and tracking
- **Search & Filter**: Quick search functionality across all modules
- **Responsive Design**: Optimized for various screen sizes

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs, Stack Navigation)
- **Database**: Expo SQLite for local data storage
- **State Management**: React Context API
- **UI Components**: Custom reusable components
- **Security**: Expo Secure Store for credential management
- **Icons**: Expo Vector Icons (Ionicons)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional but recommended)
- [Expo Go app](https://expo.dev/client) on your mobile device for testing

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PeterTorki/inventory-sales-app.git
   cd inventory-sales-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator or `i` for iOS simulator

## Project Structure

```
inventory-sales-app/
├── assets/                 # Images, fonts, and other static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ActionButtons.tsx
│   │   ├── AppButton.tsx
│   │   ├── AppInput.tsx
│   │   ├── AppModal.tsx
│   │   ├── AppSearch.tsx
│   │   ├── AppText.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Header.tsx
│   │   └── ReusableDropdown.tsx
│   ├── constants/         # App-wide constants
│   │   ├── app.ts
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   └── sizes.ts
│   ├── context/          # React Context providers
│   │   └── AuthContext.tsx
│   ├── database/         # SQLite database setup and queries
│   │   ├── db.ts
│   │   └── queries.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useSearch.ts
│   ├── navigation/       # Navigation configuration
│   │   ├── AppNavigation.tsx
│   │   ├── AuthStack.tsx
│   │   ├── CustomersStack.tsx
│   │   ├── ItemsStack.tsx
│   │   ├── MainStack.tsx
│   │   ├── MainTabs.tsx
│   │   ├── TransactionsStack.tsx
│   │   └── withSafeArea.tsx
│   ├── screens/          # App screens
│   │   ├── auth/         # Authentication screens
│   │   ├── customers/    # Customer management screens
│   │   ├── items/        # Inventory management screens
│   │   ├── transactions/ # Invoice management screens
│   │   └── DashboardScreen/
│   ├── styles/           # Shared styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── App.tsx               # App entry point
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Database Schema

The app uses SQLite with the following main tables:

- **categories**: Product categories
- **items**: Inventory items with pricing and stock information
- **customers**: Customer contact information
- **invoices**: Sales invoice headers
- **invoice_items**: Invoice line items

## Usage

### First Time Setup

1. Launch the app
2. Create an account with your email and password
3. Login with your credentials

### Managing Inventory

1. Navigate to the **Items** tab
2. Click **Add Item** to create new products
3. Use **Categories** to organize items
4. View **Inventory** to see stock levels

### Creating Invoices

1. Go to the **Transactions** tab
2. Click **Create Invoice**
3. Select a customer from the dropdown
4. Add items with quantities
5. Review the calculated totals (subtotal + 14% VAT)
6. Click **Create Invoice** to finalize

### Managing Customers

1. Navigate to the **Customers** tab
2. Click **Add Customer** to create new customer records
3. Search and filter customers as needed
4. Edit or delete customer information

## Configuration

### Customizing VAT Rate

The VAT rate is currently set to 14%. To change it, update the calculation in:

- `src/screens/transactions/CreateInvoiceScreen/services.ts`
- `src/screens/transactions/CreateInvoiceScreen/components/InvoiceForm.tsx`

### Theme Customization

Colors and theme settings can be modified in:

- `src/constants/colors.ts`
- `src/constants/sizes.ts`
- `src/constants/fonts.ts`

## Scripts

```bash
# Start development server
npm start

# Start with tunnel connection (for testing on external networks)
npm start -- --tunnel

# Clear cache and start
npm start -- --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Building for Production

### Android (APK/AAB)

```bash
# Build APK
npx eas build --platform android --profile preview

# Build AAB for Play Store
npx eas build --platform android --profile production
```

### iOS (IPA)

```bash
# Build for App Store
npx eas build --platform ios --profile production
```

Note: Building for production requires an [Expo EAS account](https://expo.dev/eas).

## Troubleshooting

### Common Issues

**Issue**: "Expo Go app won't connect"

- Ensure your phone and computer are on the same network
- Try using tunnel mode: `npx expo start --tunnel`

**Issue**: "Database errors on startup"

- Clear app data and restart
- Check if SQLite tables are properly initialized in `src/database/db.ts`

**Issue**: "Navigation errors"

- Clear Metro bundler cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Peter Torki - [@PeterTorki](https://github.com/PeterTorki)

Project Link: [https://github.com/PeterTorki/inventory-sales-app](https://github.com/PeterTorki/inventory-sales-app)

## Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
