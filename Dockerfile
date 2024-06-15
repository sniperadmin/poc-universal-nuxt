# use node 18 alpine image
# FROM oven/bun:1
FROM jitesoft/node-yarn:hydrogen-slim

# Identify maintainer of image
LABEL version="0.0.1"
LABEL maintainer="nasrgalal"

# Identify environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

# update the image to the latest packages
# RUN apt update && apt upgrade -y

# create work directory in app folder
WORKDIR /app/

COPY package.json .
RUN yarn
COPY . .
RUN yarn run build

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
