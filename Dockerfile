# Use official Node.js LTS image
FROM node:18

# Install build tools (required for modules like bcrypt)
RUN apt-get update && apt-get install -y build-essential python3

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with verbose logging for debugging
RUN npm install --production --verbose

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
