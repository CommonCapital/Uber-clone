# Ryde - A Full-Stack Uber Clone

![Ryde Banner](https://img.shields.io/badge/Ryde-Uber%20Clone-black?style=for-the-badge&logo=uber)

Ryde is a production-ready, full-stack mobile application built with **Expo**, **React Native**, and **TypeScript**. It replicates the core functionality of Uber, featuring real-time map integration, location-based searches, secure authentication, and a complete ride-booking flow with integrated payments.

## 🚀 Teck Stack

- **Frontend:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless)
- **Payments:** [Stripe](https://stripe.com/)
- **Maps & Location:** [Google Maps API](https://developers.google.com/maps), [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/), [Geoapify](https://www.geoapify.com/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)

## ✨ Key Features

- **Onboarding Flow:** Beautiful three-step onboarding process with smooth transitions.
- **Secure Authentication:** Email and Google OAuth sign-in/sign-up powered by Clerk.
- **Real-time Map Integration:** Current location tracking and dynamic ride routing using Google Maps.
- **Place Search:** Autocomplete functionality for selecting destinations via Google Places API and Geoapify.
- **Ride Booking:** Select from multiple vehicle types with dynamic pricing based on distance.
- **Stripe Payments:** Secure credit card processing for ride bookings.
- **Ride History:** Track all previous trips with detailed information.
- **Profile Management:** Update user details and manage accounts.
- **Responsive UI:** Modern, "orange-themed" brutalist design optimized for all screen sizes.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo Go](https://expo.dev/go) app on your mobile device (for testing)
- [Stripe Account](https://stripe.com/) (for payments)
- [Clerk Account](https://clerk.com/) (for authentication)
- [Google Cloud Project](https://console.cloud.google.com/) (for Maps API)
- [Neon Account](https://neon.tech/) (for PostgreSQL database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ryde-uber-clone.git
   cd ryde-uber-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   DATABASE_URL=your_neon_db_url
   EXPO_PUBLIC_SERVER_URL=http://localhost:8081
   EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_key
   EXPO_PUBLIC_GOOGLE_API_KEY=your_google_maps_key
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the application:**
   ```bash
   npx expo start
   ```

   Scan the QR code with your Expo Go app to view the project on your device.

## 📁 Project Structure

```text
├── app/               # Expo Router routes (api, auth, root)
├── assets/            # Images, icons, and fonts
├── components/        # Reusable UI components
├── constant/          # Static data and image/icon references
├── lib/               # Utility functions and API clients
├── store/             # Zustand state stores
├── types/             # TypeScript definitions
├── tailwind.config.js # NativeWind configuration
└── app.json           # Expo project configuration
```

## 🔐 Configuration Highlights

- **NativeWind:** Seamlessly uses Tailwind CSS classes for styling React Native components.
- **Clerk Expo:** Handles session management and OAuth flows out-of-the-box.
- **Stripe React Native:** Provides a native checkout experience for mobile payments.
- **Neon Serverless:** Allows for efficient, scalable database queries directly from the edge.

## 📸 Screenshots

| Onboarding | Home | Search | Booking |
| :---: | :---: | :---: | :---: |
| ![Onboarding](https://placehold.co/200x400?text=Onboarding) | ![Home](https://placehold.co/200x400?text=Home) | ![Search](https://placehold.co/200x400?text=Search) | ![Booking](https://placehold.co/200x400?text=Booking) |

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Your Name]
