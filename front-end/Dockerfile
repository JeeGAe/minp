FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
ENV REACT_APP_API_URL=107.23.142.248
CMD ["npm", "run", "build"]

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx-1.27.0/conf/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]