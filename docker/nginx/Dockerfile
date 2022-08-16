# The first stage
# Build React static files
FROM node:16.13.1-alpine as build

WORKDIR /app/
COPY ./front/package.json /app/
COPY ./front/package-lock.json /app/
RUN npm ci --silent
COPY ./front/ /app/
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
