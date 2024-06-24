FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
ENV REACT_APP_API_URL=minp.site
CMD ["npm", "run", "build"]

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx-1.27.0/conf/nginx.conf /etc/nginx/nginx.conf
# VOLUME /etc/letsencrypt/live/minp.site/
# VOLUME /etc/letsencrypt/live/www.minp.site/
# VOLUME letsencrypt:/etc/letsencrypt/
VOLUME /etc/letsencrypt
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]