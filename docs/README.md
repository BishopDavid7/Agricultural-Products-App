# README.md file for the Agricultural Products App

# 🌾 **Agricultural Products App**  

## 📌 **Project Overview**  
The **Agricultural Products App** is a **mobile and Progressive Web Application (PWA)** designed to help **local farmers in Cameroon** **advertise their agricultural products**, while enabling buyers to browse, place orders, and make payments via **MTN Mobile Money and Orange Money**.  

This project utilizes **AWS Free Tier services**, ensuring a **scalable, secure, and cost-effective infrastructure**.  

---

🏗️ Architecture Diagram
Below is the architectural diagram of the application:

https://github.com/BishopDavid7/Agricultural-Products-App/blob/main/docs/AgriculturalAppProject2.png

https://github.com/BishopDavid7/Agricultural-Products-App/raw/main/docs/AgriculturalAppProject2.png
---

## 🎯 **Key Features**  
✅ **User Registration & Authentication** – Secure signup/login for farmers and buyers.  
✅ **Product Listings** – Farmers can post product details, images, and pricing.  
✅ **Order Management** – Buyers can place orders and select pickup or delivery.  
✅ **Mobile Money Payments** – Secure payments via **MTN MoMo & Orange Money**.  
✅ **Real-Time Notifications** – SMS notifications for order confirmations and updates.  
✅ **AWS-Powered Infrastructure** – Secure, scalable, and cost-effective using **serverless architecture**.  

---

## 🛠️ **Tech Stack**  

### 🌐 **Frontend**  
- **React Native / Flutter** – Mobile App  
- **ReactJS** – Progressive Web App (PWA)  
- **AWS Amplify** – Hosting and authentication  

### 🏗 **Backend**  
- **AWS AppSync** – GraphQL API  
- **AWS Lambda** – Serverless backend logic  
- **AWS DynamoDB** – NoSQL database for storing products, users, and orders  
- **Amazon S3** – Image storage for product photos  

### 💳 **Payment Integration**  
- **MTN MoMo API** – Secure mobile money transactions  
- **Orange Money API** – Alternative payment processing  

### 📡 **Notifications & Messaging**  
- **Amazon SNS** – SMS alerts for order confirmations and status updates  

---

## 📁 **Project Structure**  

```
Agricultural-Products-App/
│── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   ├── server.js
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   ├── public/
│   ├── index.js
│── amplify/ (AWS Amplify Project)
│── docs/
│   ├── AgriculturalAppProject2.png   <-- (Architecture Diagram)
│── README.md
```

---

## 🚀 **Setup Instructions**  

### 🖥 **1. Clone the Repository**  
```bash
git clone https://github.com/BishopDavid7/Agricultural-Products-App.git
cd Agricultural-Products-App
```

### ⚙️ **2. Install Dependencies**  
#### Backend  
```bash
cd backend
npm install
```
#### Frontend  
```bash
cd frontend
npm install
```

### 🛠 **3. Set Up AWS Amplify**  
```bash
amplify init
amplify add auth
amplify push
```

### 🔧 **4. Configure Environment Variables**  
Create a `.env` file in the `backend/` folder and add:  
```
MTN_MOMO_API_KEY=your_api_key
ORANGE_MONEY_API_KEY=your_api_key
AWS_REGION=us-east-1
```

### 🏃 **5. Start Development Server**  
#### Backend  
```bash
cd backend
npm start
```
#### Frontend  
```bash
cd frontend
npm start
```

---

## 🏆 **Project Goals & Impact**  
📢 **Empower Local Farmers** – Provide farmers with a digital platform to sell their produce.  
💰 **Facilitate Mobile Payments** – Secure transactions using **MTN MoMo & Orange Money**.  
🚀 **Scalable Solution** – Built on **AWS for high availability and cost-efficiency**.  

---

## 🤝 **Contributing**  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit changes: `git commit -m "Add new feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Submit a pull request.  

---

## 📬 **Contact & Support**  
📧 **Email**: p.fonjock@gmail.com  
🐙 **GitHub**: [BishopDavid7](https://github.com/BishopDavid7)  
🔗 **LinkedIn**: [Pascal E. Ekenya Fonjock](https://www.linkedin.com/in/pascal-e-ekenya-fonjock-32151045)  

> **Let’s build something great together!** 🚀🌍  

---


