# Multi-stage Dockerfile for building and serving the Vue frontend
# Build stage
FROM node:18-alpine AS build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies (use package-lock/yarn.lock if present for reproducible builds)
COPY package*.json ./
COPY yarn.lock ./
RUN npm ci --silent

# Copy source and build
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=${VUE_APP_API_URL}
ENV NODE_ENV=production
RUN npm run build

# Production stage - use nginx to serve built assets
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to enable SPA routing (fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

