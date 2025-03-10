# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Build the frontend (adjust for React, Flutter, etc.)
RUN npm run build

# Expose the frontend port (React: 3000, Flutter: adjust as needed)
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
