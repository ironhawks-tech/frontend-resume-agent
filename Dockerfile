# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Only install deps first for faster rebuilds
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port (inside container)
EXPOSE 80

# Launch nginx in foreground
CMD ["nginx", "-g", "daemon off;"]