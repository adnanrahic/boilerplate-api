FROM alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs nodejs-npm
COPY package.json package-lock.json ./
RUN npm install --production

#

FROM alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs
COPY . .
COPY --from=builder /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD node app.js