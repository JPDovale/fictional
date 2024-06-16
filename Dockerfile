FROM electronuserland/builder:wine
WORKDIR /app

COPY package.json .
COPY package-lock.json .

COPY node_modules /app/node_modules

COPY . .

RUN npm run package:dev

# docker run --rm -it -v $(pwd)/:/app fictional
