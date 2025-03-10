### **Updated README.md with Docker Deployment Option**  

Here's your **README.md** with the **Docker deployment instructions** added.  

---

# 🌾 **Agricultural Products App**  

## 📌 **Project Overview**  
The **Agricultural Products App** is a **mobile and Progressive Web Application (PWA)** designed to help **local farmers in Cameroon** **advertise their agricultural products**, while enabling buyers to browse, place orders, and make payments via **MTN Mobile Money and Orange Money**.  

This project utilizes **AWS Free Tier services**, ensuring a **scalable, secure, and cost-effective infrastructure**.  

---

## 🏗 **Architectural Diagram**  
Below is the architectural diagram of the application:  

![Agricultural Products App Architecture](https://github.com/BishopDavid7/Agricultural-Products-App/blob/main/docs/AgriculturalAppProject2.png)  

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
│   ├── controllers/              # API Controllers
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   ├── models/                   # Database Models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   ├── routes/                    # API Routes
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   ├── lambda-functions/          # AWS Lambda Handlers
│   ├── api/                       # AppSync GraphQL API
│   ├── server.js                   # Express.js Server
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   ├── public/
│   ├── index.js
│   ├── package.json
│── infrastructure/  
│   ├── agri-app-template.yaml      # ✅ CloudFormation Template
│   ├── deployment-scripts/         # (Optional) Deployment Scripts
│   ├── README.md                   # Documentation for Infrastructure Setup
│── amplify/                         # AWS Amplify Project
│── docs/                             # Documentation and Diagrams
│   ├── AgriculturalAppProject2.png  # Architecture Diagram
│── .github/  
│   ├── workflows/                   # (Optional) CI/CD GitHub Actions
│── README.md                        # Project Documentation
│── docker-compose.yml               # Docker Compose for Multi-Service Deployment
│── Dockerfile.backend               # Dockerfile for Backend
│── Dockerfile.frontend              # Dockerfile for Frontend
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

## 🐳 **Deploying with Docker**  

### **1️⃣ Install Docker & Docker Compose**  
Ensure you have **Docker** installed on your system:  
👉 [Download Docker](https://www.docker.com/get-started)  

### **2️⃣ Build & Run with Docker Compose**  

#### **Docker Compose File (`docker-compose.yml`)**
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.backend
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env
    depends_on:
      - frontend

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

#### **Dockerfile for Backend (`Dockerfile.backend`)**
```dockerfile
# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port and start server
EXPOSE 4000
CMD ["npm", "start"]
```

#### **Dockerfile for Frontend (`Dockerfile.frontend`)**
```dockerfile
# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
```

### **3️⃣ Build & Run the Containers**
Run the following command to build and start the app using Docker Compose:  
```bash
docker-compose up --build -d
```

To stop the containers:  
```bash
docker-compose down
```

---

## 🏗 **Deploying with AWS CloudFormation**  

1. **Navigate to the `infrastructure/` directory**  
   ```bash
   cd infrastructure
   ```
2. **Deploy the CloudFormation stack**  
   ```bash
   aws cloudformation create-stack --stack-name AgriAppStack \
     --template-body file://agri-app-template.yaml \
     --capabilities CAPABILITY_NAMED_IAM
   ```
3. **Monitor Stack Creation**  
   ```bash
   aws cloudformation describe-stacks --stack-name AgriAppStack
   ```
4. **Once the stack is successfully created, get the outputs to configure your app.**  
   ```bash
   aws cloudformation describe-stacks --stack-name AgriAppStack --query "Stacks[0].Outputs"
   ```

---

## 📬 **Contact & Support**  
📧 **Email**: p.fonjock@gmail.com  
🐙 **GitHub**: [BishopDavid7](https://github.com/BishopDavid7)  
🔗 **LinkedIn**: [Pascal E. Ekenya Fonjock](https://www.linkedin.com/in/pascal-e-ekenya-fonjock-32151045)  

> **Let’s build something great together!** 🚀🌍  

---

