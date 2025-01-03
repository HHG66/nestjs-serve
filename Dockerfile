# 使用 Node.js 官方镜像作为基础镜像
FROM node:18.17.1 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 以便安装依赖
COPY package*.json ./

# 安装依赖
RUN npm i

# 复制源代码到容器中
COPY . .

# 编译 NestJS 项目
RUN npm run build

# 使用更轻量的镜像来运行应用
FROM node:18.17.1-alpine

# 设置工作目录
WORKDIR /app

# 只复制构建后的产物和运行所需的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# 定义环境变量
ENV NODE_ENV=production

# 启动生产环境应用
# CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:prod"]


# 暴露应用的端口
EXPOSE 3000
