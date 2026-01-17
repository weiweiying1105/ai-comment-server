# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Runtime libraries needed by Prisma on Alpine
RUN apk add --no-cache openssl libc6-compat

# Install dependencies first for better cache hits
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client for linux-musl OpenSSL 3.0
RUN npx prisma generate

# Build Next.js (standalone output enabled in next.config.ts)
RUN npm run build

# Run stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

RUN apk add --no-cache openssl libc6-compat

# Copy minimal standalone server and assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

# Standalone build provides server.js entrypoint
CMD ["node", "server.js"]
