# Etapa 1: Construcción
FROM node:20-alpine AS build

WORKDIR /app

ARG NEXT_PUBLIC_IMAGGA_API_KEY
ARG NEXT_PUBLIC_IMAGGA_API_SECRET

ENV NEXT_PUBLIC_IMAGGA_API_KEY=${NEXT_PUBLIC_IMAGGA_API_KEY}
ENV NEXT_PUBLIC_IMAGGA_API_SECRET=${NEXT_PUBLIC_IMAGGA_API_SECRET}

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]