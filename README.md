# 🏡 HomeNest Backend API

## 🌐 Live API

👉 https://home-nest-backend.vercel.app

---

## 📌 Overview

This is the backend server for **HomeNest**, a real estate listing platform.
It provides RESTful APIs for managing properties, user-specific listings, and property reviews with secure authentication support.

---

## 🚀 Core Features

* 🏠 **Property CRUD Operations** (Create, Read, Update, Delete)
* 🔐 **JWT-based Authentication & Authorization**
* 👤 **User-specific Data Filtering** (My Properties, My Reviews)
* 🔎 **Search Functionality** (by property name)
* 🔽 **Server-side Sorting** (price, date, etc.)
* 🌟 **Ratings & Reviews System**
* ⚡ **Fast REST API with Express.js**
* 🗂️ **MongoDB Integration with Structured Collections**
* 🛡️ **Protected Routes for Secure Data Access**
* 🔄 **Real-time Data Updates after CRUD operations**

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Native Driver)
* JSON Web Token (JWT)
* dotenv
* CORS

---

## 📂 Project Structure

```id="2y1clw"
server/
├── index.js        # Main server entry point
├── routes/         # API routes
├── middleware/     # Auth middleware (JWT verification)
├── config/         # DB connection
└── .env            # Environment variables
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```id="r8o9vj"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📡 API Endpoints

### 🔹 Properties

* `POST /properties` → Add new property
* `GET /properties` → Get all properties (supports search & sort)
* `GET /properties/:id` → Get single property details
* `GET /my-properties?email=` → Get logged-in user's properties
* `PUT /properties/:id` → Update property
* `DELETE /properties/:id` → Delete property

---

### 🔹 Reviews

* `POST /reviews` → Add review
* `GET /reviews?propertyId=` → Get reviews for a property
* `GET /my-reviews?email=` → Get user reviews

---

## 🔐 Authentication Flow

* User logs in via Firebase (client-side)
* Firebase token is sent to backend
* Backend verifies token (optional: Firebase Admin SDK)
* JWT is issued for protected API access
* Middleware protects sensitive routes

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```id="9y2b9m"
git clone https://github.com/dev-peyas9911/home-nest-backend.git
cd homenest-server
```

### 2️⃣ Install Dependencies

```id="xkq1rs"
npm install
```

### 3️⃣ Run Server

```id="y0l9pr"
npm run dev
```

---

## 🧪 Testing API

You can test endpoints using:

* Postman
* Thunder Client
* Insomnia

---

## 🔄 Future Improvements

* 🔐 Firebase Admin SDK token verification
* 📊 Advanced filtering (location, category)
* 📦 Pagination for large datasets
* 🧠 Recommendation system
* 🚀 Rate limiting & security enhancements

---

## 👨‍💻 Author

**Peyas Barmon**
Frontend Developer

---

## ⭐ Support

If you find this project helpful, give it a ⭐ on GitHub!
