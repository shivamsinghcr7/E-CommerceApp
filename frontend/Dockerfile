# Use official Node image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies first (to leverage Docker cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build"]
