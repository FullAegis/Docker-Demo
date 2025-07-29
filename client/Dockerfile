#region BUILD
FROM node:alpine AS build

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
COPY /app/package*.json ./
RUN npm install
RUN mkdir -p /app
RUN mv ./node_modules /app/node_modules

# Angular source
WORKDIR /app
COPY /app/ ./

# Nginx configuration
COPY ["nginx.conf", "."]

# npm build
RUN npm run build -- --configuration production
#endregion


#region SERVE
FROM nginx:alpine

# Remove default nginx website and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy nginx configuration and angular app from build
COPY --from=build /app/dist/candy-frontend/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 8080
#endregion
