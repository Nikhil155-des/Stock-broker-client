# 📈 Stock Broker Client Web Dashboard

A real-time stock broker client dashboard that allows users to subscribe to stocks and view live price updates with interactive charts — inspired by platforms like **Zerodha** and **Groww**.

---

## 👨‍🎓 Student Details

- **Name:** Nikhil Deshpande  
- **USN:** 01FE22BCI017  

---

## 🧩 Project Overview

This project is a web-based stock dashboard that simulates real-time stock price updates using randomly generated data.  

Each user can log in using an email ID, subscribe to selected stocks, and view **live-updating charts** without refreshing the page.

The application supports **multiple users simultaneously** and ensures that each user only sees the stocks they have subscribed to.

---

## 🚀 Features

- 🔐 Email-based login
- 📊 Live stock price updates (every second)
- 🔄 Real-time updates without page refresh
- ⭐ Subscribe / Unsubscribe to stocks
- 📉 Mini charts on stock cards
- 📈 Detailed expandable live charts with:
  - Price axis
  - Time axis (HH:MM:SS)
  - Date display
- 👥 Multi-user support using browser tabs
- 🎨 Clean, professional UI (Zerodha/Groww-inspired)
- 🚪 Logout functionality

---

## 📦 Supported Stocks

Only the following **5 stock ticker codes** are supported:

- GOOG  
- TSLA  
- AMZN  
- META  
- NVDA  

---

## 🛠️ Tech Stack Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5 Canvas (custom chart rendering)
- Tailwind CSS
- React Hooks (`useState`, `useEffect`, `useRef`)

### Backend / Logic
- Node.js runtime
- Random price generation
- In-memory data handling
- Real-time updates using intervals

> ⚠️ No real stock market APIs are used — all prices are randomly generated as per assignment requirements.

---

## ⚙️ Project Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/stock-broker-dashboard.git
cd stock-broker-dashboard
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Run the Development Server
bash
Copy code
npm run dev
4️⃣ Open in Browser
arduino
Copy code
http://localhost:5173
🧭 How to Use the Website
🔐 Login
Enter any valid email ID

Click Login

You will be redirected to the dashboard

📊 Subscribe to Stocks
Click Subscribe on any stock card

Live price and mini chart will appear instantly

Prices update every 1 second

📈 View Detailed Chart
Click “View detailed chart”

A modal opens with:

Live line chart

Price axis

Time & date labels

➖ Unsubscribe
Click Unsubscribe

Stock price and chart disappear immediately

🚪 Logout
Click Logout

User session is cleared and redirected to login page

👥 Multi-User Support
Open the website in multiple browser tabs

Login using different email IDs

Each user has:

Independent subscriptions

Independent live charts

Asynchronous updates

📋 Assignment Requirements Checklist
Requirement	Status
Email login	✅
5 fixed stocks	✅
Subscribe / Unsubscribe	✅
Live price updates	✅
No page refresh	✅
Multi-user support	✅
Mini & detailed charts	✅
Professional UI	✅
Logout functionality	✅

📌 Conclusion
This project successfully demonstrates:

Real-time UI updates

Interactive data visualization

Multi-user asynchronous behavior

Clean and scalable frontend architecture

All assignment requirements have been fully satisfied.




