FROM node:18-alpine

# Install OpenSSL (needed by Prisma engine)
RUN apk add --no-cache openssl
RUN npm install -g typescript

WORKDIR /src

# Copy only package.json and lock file first
COPY package*.json ./

# Install deps including prisma
RUN npm install

# Copy everything else
COPY . .

# Generate Prisma client for the current platform
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
