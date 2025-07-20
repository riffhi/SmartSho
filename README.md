# SmartSho E-commerce Platform 🛍️🌿

Welcome to **SmartSho**, a modern, feature-rich e-commerce platform inspired by Meesho. This project goes beyond a standard clone by integrating advanced features like an AI-powered multilingual chatbot for buyers and sellers, a sustainability rewards program ("GreenBits"), and dynamic eco-friendly product scoring.

![SmartSho Homepage](https://i.imgur.com/your-screenshot-url.png) 

---

## ✨ Key Features

### 🛒 Core E-commerce
* **Product Discovery:** Browse products by category, featured collections, and best-sellers.
* **Dynamic Product Grid:** View products in a clean, responsive grid layout.
* **Product Details Modal:** Quick view of product details without leaving the page.
* **Shopping Cart:** A fully functional cart with state management for adding, updating, and removing items.
* **Responsive Design:** A seamless experience across desktop and mobile devices.

### 🌿 Sustainability & Green Initiatives
* **GreenBharat Section:** A dedicated marketplace for certified eco-friendly products.
* **GreenBits Rewards System:** Earn "GreenBits" by returning product packaging. Redeem points for exclusive discounts and rewards.
* **Packaging Return System:** A complete backend workflow for users to request package pickups, track status, and earn rewards upon recycling.
* **Sustainability Scores:** Products are rated on a 1-10 scale for their environmental impact, using a cached system with a static data fallback.

### 🤖 AI-Powered Chatbots
* **Multilingual Seller Chatbot:** Sellers get data-driven advice on inventory, sales trends, and restocking. It understands queries in multiple Indian languages (like Hindi, Marathi) and responds in the native script.
* **Multilingual Buyer Chatbot:** Buyers can ask for product recommendations, eco-friendly alternatives, and track orders in their preferred language.

### 🌐 Internationalization & Accessibility
* **Google Translate Integration:** A custom top-bar and floating widget allow users to translate the entire site into multiple Indian languages instantly.
* **i18next Support:** Core UI elements are translated using a standard i18n library for scalability.

### 💼 Seller Portal
* **Secure Authentication:** JWT-based login and signup system for sellers.
* **Supplier Dashboard:** A dedicated page for sellers to manage their products and get insights (powered by the Seller Chatbot).

---

## 🛠️ Tech Stack

| Area       | Technology                                                                                                  |
| :--------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Lucide React, i18next, React Router                                  |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT (for Auth), bcryptjs                                            |
| **AI/ML** | OpenRouter API (for accessing models like DeepSeek), Google Generative AI (optional)                        |
| **Database** | MongoDB Atlas                                                                                               |

---

## 🚀 Getting Started: Running Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

* **Node.js:** Version 18.x or higher.
* **npm** or **yarn:** Package manager for Node.js.
* **MongoDB:** A running instance of MongoDB. You can use a local installation or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
* **API Keys:**
    * **OpenRouter API Key:** Create a free account at [OpenRouter.ai](https://openrouter.ai/) to get an API key for the chatbots.

### ⚙️ Installation & Setup

#### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/riffhi-smartsho.git](https://github.com/your-username/riffhi-smartsho.git)
cd riffhi-smartsho
```
#### 2. Backend Setup
The backend consists of two services that need to run concurrently: the main API server and the chatbot server.

### a. Install Dependencies:
Navigate to the backend directory and install the required packages.

```bash
cd backend
npm install
```

### b. Configure Environment Variables:
Main API Server: Create a .env file in the riffhi-smartsho/backend/ directory.
```bash
# riffhi-smartsho/backend/.env

MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_strong_jwt_secret_key"
PORT=5000
```

Chatbot Server: Create a .env file inside the riffhi-smartsho/backend/chatbot/ directory.
```bash
# riffhi-smartsho/backend/chatbot/.env

OPENROUTER_API_KEY="your_openrouter_api_key"
```
### c. Run the Backend Servers:
You'll need two separate terminal windows for this.

Terminal 1: Start the Main API Server
```bash
# Make sure you are in the riffhi-smartsho/backend directory
node src/server.js
```

✅ Your main API server should now be running on http://localhost:5000.

Terminal 2: Start the Chatbot Server
```bash
# Make sure you are in the riffhi-smartsho/backend directory
node chatbot/index.js
```

🤖 Your chatbot server should now be running on http://localhost:5001.

#### 3. Frontend Setup
### a. Install Dependencies:
In a new terminal, navigate to the root project directory.
```bash
# In riffhi-smartsho/
npm install
```

### b. Configure Environment Variables:
Create a .env file in the root riffhi-smartsho/ directory.
```bash
# riffhi-smartsho/.env

VITE_OPENROUTER_KEY_BUYER="your_same_openrouter_api_key"
```

### c. Run the Frontend Development Server:
```bash
# In riffhi-smartsho/
npm run dev
```


🎉 You're all set! Open your browser and navigate to http://localhost:5173 to see the application in action.

#### 🌐 Environment Variables Summary
For clarity, here is a summary of all the environment variables you need to set up.

Backend (riffhi-smartsho/backend/.env)
MONGO_URI: Your MongoDB connection string.

JWT_SECRET: A long, random string used for signing authentication tokens.

PORT: The port for the main Express server (defaults to 5000).

Chatbot Backend (riffhi-smartsho/backend/chatbot/.env)
OPENROUTER_API_KEY: Your API key from OpenRouter.ai(deepseek free model), used for the seller chatbot.

Frontend (riffhi-smartsho/.env)
VITE_OPENROUTER_KEY_BUYER: Your API key from OpenRouter.ai(deepseek free model), used for the buyer chatbot.



