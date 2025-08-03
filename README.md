# 🍽️ FoodExpress - Food Delivery Web App

A stylish and modern food delivery application built using Angular and Node.js. Users can browse restaurants, view menus, place orders, and manage delivery requests. Admin can add new deliveries and monitor the order list.


## ✨ Features

### 🧑‍🍳 User Side
- Browse restaurants and meals
- View menu items with images and prices
- Add food to cart and place orders
- Filter by category, search items, and pagination
- Responsive UI with smooth navigation

### 👨‍💼 Admin/Delivery Side
- Add new deliveries (create delivery API)
- View all deliveries (list deliveries API)

### 🛡️ Authentication (optional)
- Secure routes with JWT or AuthGuard 

### 📊 Dashboard (optional)

- Restaurants
- Different food categories

---

## 🛠️ Tech Stack

| Layer     | Tech                      |
|-----------|---------------------------|
| Frontend  | Angular, HTML/CSS, Angular Material or Tailwind |
| Backend   | Node.js, Express.js       |
| Database  | MongoDB with Mongoose     |
| Deployment| Vercel (frontend), Render (backend) |

---

## 📂 Folder Structure

```
food-order-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── shared/
│   |   |   |      └── services/      
|   |   |   |      └── guard/
|   |   |   |      └── interceptor/
|   └── angular.json
└── README.md
```

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js
- Angular CLI
- MongoDB Atlas (or local MongoDB)

---

### ▶️ Backend Setup

```bash
cd backend
npm install
node index.js
```

### ▶️ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

## 🌐 Live Demo : 
[click here to visit] https://food-express-mauve.vercel.app

---

## 🛡️ Environment Variables

Create `.env` in `backend/` folder with the following:

```env
PORT=3000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

---

## 🙋‍♂️ Author

  **[Sabari Suresh]**  
🔗 [GitHub](https://github.com/SabariiSuresh)
