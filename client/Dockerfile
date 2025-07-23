#region BUILD
FROM node:alpine AS build
WORKDIR /usr/src/app

# npm deps
COPY /app/package*.json ./
RUN npm install

# Angular source
COPY /app ./

# npm build
RUN npm run build -- --configuration production
#endregion

#region SERVE
FROM nginx:alpine

# Remove default nginx website and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy nginx configuration and angular app from build
COPY --from=build usr/src/app/nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/candy-frontend /usr/share/nginx/html

EXPOSE 80
#endregion
