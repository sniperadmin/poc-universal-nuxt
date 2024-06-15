# The jitesoft/node-yarn:hydrogen-slim is best for building
FROM jitesoft/node-yarn:hydrogen-slim AS build
# Identify maintainer of image
LABEL version="0.0.2"
LABEL maintainer="nasrgalal"
# Identify environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
# create work directory in app folder
WORKDIR /app/
COPY package.json .
RUN yarn
COPY . .
RUN yarn run build

FROM node:current-alpine AS prod
# Copy built app from the "build" image
COPY --from=build /app/.output /.output

EXPOSE 3000
CMD [ "node", "/.output/server/index.mjs" ]
