# Use the official Node.js image as the base image for the build stage
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Use the official Nginx image as the base image for the production stage
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the application will run on
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
