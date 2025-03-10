# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the backend port (adjust if needed)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
