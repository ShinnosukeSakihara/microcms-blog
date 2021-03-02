FROM node:12
WORKDIR /src
COPY . .
RUN yarn install \\
  --prefer-offline \\
  --frozen-lockfile \\
  --non-interractive \\
  --production=false
RUN yarn build
CMD ["yarn", "start"]
