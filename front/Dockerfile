# The first stage
# Build React static files
FROM node:16.13.1-alpine as build


#RUN mkdir -p /app
#RUN ls -l && cd .. && ls -l
WORKDIR /app/

#RUN cp -a /front/package.json /app && cp -a /front/package-lock.json /app
COPY package.json .
COPY package-lock.json .

RUN npm install

ARG REACT_APP_API_ORIGIN

ENV REACT_APP_API_ORIGIN=$REACT_APP_API_ORIGIN

# RUN npm ci --silent
#RUN cp -a /front/. /app
COPY . .

RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY heroku/development/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY heroku/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
