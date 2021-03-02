FROM node:12
WORKDIR /src
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
