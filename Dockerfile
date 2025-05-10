FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Expose the port defined in environment variables (default to 8787)
EXPOSE 8787

# Command to run the application
CMD ["npm", "start"] 