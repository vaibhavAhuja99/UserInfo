FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM node:16-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package.json /app/package-lock.json ./
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/build ./build
RUN rm -rf BUILD_IMAGE
RUN rm -rf deps
USER reactjs
EXPOSE 3000
CMD ["npm","start"]