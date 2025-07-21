# SmartSho: A Sustainable Commerce Ecosystem 🛍️🌿
Sub theme : E commerce AI Agent

SmartSho is an intelligent, AI-powered platform that transforms the e-commerce experience into India's first comprehensive sustainable commerce ecosystem. It seamlessly integrates inventory optimization, sustainability scoring, green supplier networks, and circular economy principles into one unified platform.

---
🌐 **Live Demo:** https://meshowxx-9tg7.vercel.app/
---

## ✨ Key Features

Based on four core pillars, SmartSho offers a unique and powerful set of features for both buyers and sellers.

### 🤖 AI-Powered Seller & Buyer Agents
* **Demand Prediction:** A smart chatbot for sellers that predicts product demand to prevent overstocking and reduce waste.
* **Personalized Suggestions:** Delivers tailored product recommendations and shopping guidance for buyers.
* **Green Recommendations:** Intelligently suggests sustainable and eco-friendly products based on buyer interests and Browse history.

### 🌐 Inclusive Multi-Language Support
* **Complete Localized Experience:** Offers a seamless shopping journey in multiple Indian languages.
* **Regional Dialect Recognition:** The AI-powered chatbot understands regional dialects for more natural and effective communication.
* **Cultural Context:** Incorporates cultural nuances to provide a truly inclusive and accessible commerce experience for all users.

### ♻️ Smart Recycling & GreenBits Rewards
* **Automated Packaging Returns:** A streamlined, automated system for users to return used packaging with ease.
* **GreenBits (Eco-coins):** A rewarding circular economy model where users earn "GreenBits" for every returned box.
* **Optimized Pickups:** The system automatically schedules pickups in a neighborhood once a threshold of returns (e.g., 50+) is met, ensuring efficiency.
* **Zero-Waste Initiative:** Recycled boxes are used to reduce production costs and energy, pushing towards a zero-waste goal.

### 🌿 Dynamic Sustainability Scoring System
* **10-Point Sustainability Rating:** Every product is given a clear and transparent sustainability score from 1 to 10.
* **AI Auto-Tagging:** An AI model analyzes product data (materials, packaging, lifecycle) to automatically tag items as "green".
* **Transparent Scoring:** Users can view detailed explanations behind each product's score, empowering them to make informed, eco-conscious decisions.

---

## 🛠️ Tech Stack

| Area       | Technology                                                                                                  |
| :--------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Lucide React, React Router                                  |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT (for Auth), bcryptjs                                            |
| **AI/ML** | OpenRouter API (for accessing models like DeepSeek), Google Generative AI (optional)                        |
| **Database** | MongoDB Atlas                                                                                               |
| **Deployment** | Frontend: Vercel, Backend: Deployed and connected via API endpoints                                    |

---

## 🚀 Getting Started: Running Locally

The backend services are already deployed and running in production. You only need to set up the frontend to run the project locally.

### Prerequisites

* **Node.js:** Version 18.x or higher.
* **npm** or **yarn:** Package manager for Node.js.
* **API Keys:**
    * **OpenRouter API Key:** Create a free account at [OpenRouter.ai](https://openrouter.ai/) to get an API key for the chatbots.

### ⚙️ Installation & Setup

#### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/riffhi-smartsho.git](https://github.com/your-username/riffhi-smartsho.git)
cd riffhi-smartsho
```

#### 2. Frontend Setup

### a. Install Dependencies:
Navigate to the root project directory and install the required packages.
```bash
# In riffhi-smartsho/
npm install
```

### b. Configure Environment Variables:
Create a `.env` file in the root `riffhi-smartsho/` directory.
```bash
# riffhi-smartsho/.env

VITE_OPENROUTER_KEY_BUYER="your_openrouter_api_key"
```

### c. Run the Frontend Development Server:
```bash
# In riffhi-smartsho/
npm run dev
```

🎉 You're all set! Open your browser and navigate to http://localhost:5173 to see the application in action.

The frontend will automatically connect to the deployed backend services, so you don't need to worry about running any backend servers locally.

#### 🌐 Environment Variables Summary

**Frontend Only (riffhi-smartsho/.env)**
* `VITE_OPENROUTER_KEY_BUYER`: Your API key from OpenRouter.ai (DeepSeek free model), used for the buyer chatbot.

**Note:** The backend environment variables are already configured in the production deployment, so you don't need to set them up locally.



---

## Open Source Attributes

React 18.3.1
License: MIT
Role: The core library for building our user interface. 
Source: github.com/facebook/react

Vite 5.4.2 
License: MIT 
Role: High-performance build tool and development server for the frontend. 
Source: github.com/vitejs/vite

TypeScript 5.5.3 
License: Apache 2.0 
Role: Provides static typing for robust and scalable code. 
Source: github.com/microsoft/TypeScript

Tailwind CSS 3.4.1 
License: MIT 
Role: A utility-first CSS framework for rapid and consistent styling. 
Source: github.com/tailwindlabs/tailwindcss

React Router 7.6.3 
License: MIT 
Role: Handles all client-side page navigation and routing. 
Source: github.com/remix-run/react-router

Node.js 
License: MIT 
Role: The JavaScript runtime environment that executes our backend code. 
Source: github.com/nodejs/node

Express 5.1.0 
License: MIT 
Role: The web application framework used to build our robust APIs. 
Source: github.com/expressjs/express

Mongoose 8.16.3 
License: MIT 
Role: An Object Data Modeling (ODM) library for interacting with our MongoDB database. 
Source: github.com/Automattic/mongoose

jsonwebtoken 9.0.2 
License: MIT 
Role: Creates and verifies JSON Web Tokens (JWT) for secure user authentication. 
Source: github.com/auth0/node-jsonwebtoken

bcryptjs 3.0.2 
License: MIT 
Role: A library to hash user passwords for secure storage in the database. 
Source: github.com/dcodeIO/bcrypt.js

dotenv 17.2.0 
License: BSD-2-Clause 
Role: Manages all environment variables for secure configuration. 
Source: github.com/motdotla/dotenv