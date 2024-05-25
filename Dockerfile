# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the root directory
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
