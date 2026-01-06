# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies 
COPY package*.json ./
RUN npm install --production

# Copy source code 
COPY . .

#Expose port
EXPOSE 3000

# Start the application 
CMD ["node", "index.js"]

