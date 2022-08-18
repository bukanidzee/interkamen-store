# The first stage
# Build React static files
FROM node:16.13.1-alpine as build

WORKDIR /app/
COPY ./front/package.json ./
COPY ./front/package-lock.json ./

RUN npm install

ARG REACT_APP_API_ORIGIN

ENV REACT_APP_API_ORIGIN=$REACT_APP_API_ORIGIN

# RUN npm ci --silent
COPY ./front/ ./

RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
