# SafePass Manager

![SafePass Manager Banner](https://img.shields.io/badge/SafePass-Manager-blueviolet?style=for-the-badge&logo=appveyor)

SafePass Manager is a secure and intuitive web-based application designed to help you safely store and manage your various online passwords. Forget the hassle of remembering countless unique passwords; with SafePass Manager, you get a centralized dashboard to easily add, view, and organize all your login credentials.

---

## 🚀 Technologies Used

This project leverages a modern and robust full-stack approach to deliver a seamless and secure experience.

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

The user interface is built with **React**, a declarative JavaScript library for building interactive UIs. **Vite** is used as the lightning-fast build tool for an efficient development experience, and **MUI (Material-UI)** provides a beautiful and accessible component library based on Google's Material Design.

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

The powerful backend API is developed with **Node.js**, a JavaScript runtime, utilizing **Express.js**, a fast, minimalist web framework, to handle requests, user authentication, and data management.

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

All user data and password records are securely stored in **MongoDB**, a flexible NoSQL document database.

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

The frontend is deployed with **Vercel** for optimal performance and content delivery, while the backend API is hosted on **Render** for reliable and scalable service.

---

## ✨ Key Features

* **Centralized Password Dashboard**: A clean and easy-to-use interface to manage all your password records.
* **Secure Credential Storage**: Safely store your website logins and sensitive information.
* **Flexible User Authentication**:
    * **Email Registration & Login**: Create and access your account using a traditional email and password setup.
    * **Gmail Direct Login**: Seamlessly sign in using your existing Google account for quick access.
* **Add & Manage Records**: Easily add new password entries and update or view existing ones.

---

## 📦 Getting Started

Follow these steps to get SafePass Manager up and running on your local machine for development or testing.

### Prerequisites

Make sure you have the following installed:

* **Git**
* **Node.js** (includes `npm`; `yarn` is also an option)
* **MongoDB** (either locally installed or access to a cloud-hosted instance like MongoDB Atlas)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/chaohao1214/safepass.git](https://github.com/chaohao1214/safepass.git)
    cd safepass
    ```

2.  **Backend Setup**:
    * Navigate into your backend directory (e.g., `cd backend` if your project structure separates frontend/backend, otherwise stay in the root).
    * Install Node.js dependencies:
        ```bash
        npm install
        # OR
        yarn install
        ```
    * **Configure Environment Variables**: Create a `.env` file in your backend root directory and add the following:
        ```ini
        # --- Common Environment Variables ---
        PORT=5000 # Or any port you prefer for local development
        MONGO_URI="your_mongodb_connection_string" # e.g., mongodb://localhost:27017/safepass_db or your Atlas URI
        JWT_SECRET="a_very_secure_secret_key_for_jwt" # Change this to a strong, random string

        # --- Google OAuth Environment Variables ---
        GOOGLE_CLIENT_ID="your_google_oauth_client_id"
        GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
        GOOGLE_CALLBACK_URL="http://localhost:5000/auth/google/callback" # For local development
        # For deployed backend, this would be your Render URL: e.g., "[https://your-render-backend-url.onrender.com/auth/google/callback](https://your-render-backend-url.onrender.com/auth/google/callback)"

        # Add any other necessary backend environment variables here
        ```
        *You'll need to obtain Google OAuth credentials from the [Google Cloud Console](https://console.cloud.google.com/) for Gmail direct login. Ensure you add the correct callback URLs (for both local and deployed environments) to your authorized redirect URIs in the Google Cloud Console.*

3.  **Frontend Setup**:
    * Navigate into your frontend directory (e.g., `cd frontend`).
    * Install Node.js dependencies:
        ```bash
        npm install
        # OR
        yarn install
        ```
    * **Configure Environment Variables**: Create a `.env` file in your frontend root directory:
        ```ini
        # --- API Base URL for Frontend ---
        # For local development:
        VITE_API_BASE_URL="http://localhost:5000/api"
        # For deployed frontend (update this if needed, depending on how your frontend fetches data):
        # VITE_API_BASE_URL="[https://your-render-backend-url.onrender.com/api](https://your-render-backend-url.onrender.com/api)"

        # Add any other necessary frontend environment variables
        ```

### Running the Application

1.  **Start the Backend Server**:
    * From your backend directory:
        ```bash
        npm start
        # OR
        node server.js # Or whatever your main backend entry file is
        ```
    The backend will typically run on the port specified in your `.env` file (e.g., `http://localhost:5000`).

2.  **Start the Frontend Development Server**:
    * From your frontend directory:
        ```bash
        npm run dev
        # OR
        yarn dev
        ```
    The frontend will typically run on `http://localhost:5173` (Vite's default port) or similar.

Once both backend and frontend services are running, you can access SafePass Manager in your web browser!

---

## Author

Made by Chaohao Zhu.
