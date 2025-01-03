# 使用 Node.js 官方镜像作为基础镜像
FROM node:18.17.1 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 设置镜像的 npm registry
RUN npm config set registry https://registry.npmmirror.com

# 安装 PM2
RUN npm install pm2@5.4.3 -g

# 安装依赖
RUN npm ci

# 复制其他源代码
COPY . .

# 编译 NestJS 项目
RUN npm run build

# 定义环境变量
ENV NODE_ENV=production

# 启动生产环境应用（通过 PM2）
CMD ["pm2-runtime", "start", "dist/main.js", "--name", "nestjs-app"]

# 暴露应用的端口
EXPOSE 3001
