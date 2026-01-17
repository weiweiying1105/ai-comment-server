# ================== 构建阶段 ==================
FROM node:20-alpine AS builder
WORKDIR /app

# 运行时库：用 openssl(不是 openssl-dev)
RUN apk add --no-cache openssl libc6-compat

# pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 先拷依赖文件，提高缓存命中
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web-next/package.json apps/web-next/package.json

RUN pnpm config set node-linker hoisted
RUN pnpm install --filter web-next... --frozen-lockfile

# 再拷代码
COPY . .

# 关键：避免仓库里带的旧生成物污染（你现在报错路径就是它）
RUN rm -rf /app/apps/web-next/prisma/src/generated || true
RUN rm -rf /app/apps/web-next/node_modules/.prisma || true

WORKDIR /app/apps/web-next

# 生成 Prisma + 构建 Next
RUN pnpm prisma generate

# 打印引擎文件名：必须出现 openssl-3.0.x
RUN ls -la prisma/src/generated/prisma | grep libquery || true

RUN pnpm build

# ================== 运行阶段 ==================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

RUN apk add --no-cache openssl libc6-compat

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY --from=builder /app /app

WORKDIR /app/apps/web-next
EXPOSE 8000

CMD ["pnpm", "start", "-p", "8000"]

# 目标目录：/

# Dockerfile 名称：apps/web-next/Dockerfile

# 服务端口：8000（并且 start 用 -p 8000）
