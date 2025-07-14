# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application source code
COPY . .

# Build the application for production
# Replace 'your-angular-project-name' with your actual project name in angular.json
RUN npm run build -- --configuration production

# Stage 2: Serve the application with NGINX
FROM nginx:alpine
# Copy the built artifacts from the 'build' stage
COPY --from=build /usr/src/app/dist/FullstackDockerDemo /usr/share/nginx/html

# Expose port 80 
EXPOSE 80

# When the container starts, nginx will start automatically