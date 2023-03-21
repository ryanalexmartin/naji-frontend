# Use the official Nginx image as a base image
FROM nginx:1.21

# Copy the built frontend assets to the Nginx directory
COPY dist /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80
