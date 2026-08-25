# ---------- Base: shared deps ----------
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund

# ---------- Development ----------
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# ---------- Build (production assets) ----------
FROM base AS build
COPY . .
ARG REACT_APP_YOUR_SERVICE_ID=dummy-service-id
ARG REACT_APP_YOUR_TEMPLATE_ID=dummy-template-id
ARG REACT_APP_YOUR_PUBLIC_KEY=dummy-public-key
ENV REACT_APP_YOUR_SERVICE_ID=$REACT_APP_YOUR_SERVICE_ID
ENV REACT_APP_YOUR_TEMPLATE_ID=$REACT_APP_YOUR_TEMPLATE_ID
ENV REACT_APP_YOUR_PUBLIC_KEY=$REACT_APP_YOUR_PUBLIC_KEY
RUN npm run build

# ---------- Production (nginx) ----------
FROM nginx:1.29-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]