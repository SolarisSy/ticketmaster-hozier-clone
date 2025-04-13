# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
# Use package-lock.json for deterministic installs
COPY package.json package-lock.json ./
# Using --legacy-peer-deps as it was used in nixpacks.toml and might be needed
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the application
# This runs tsc and vite build, outputting to /app/dist
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx's web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
# We will create this file next
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# The base Nginx image already includes CMD ["nginx", "-g", "daemon off;"]
# So we don't need to specify it again.
