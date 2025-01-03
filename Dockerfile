# 使用Node.js基础镜像  
FROM node:18.17.1

# 设置工作目录
WORKDIR /app


# 安装依赖
RUN npm install

# 构建项目
RUN npm run build

# 复制项目文件到容器中
COPY . /app

# 定义环境变量  
ENV NODE_ENV=production

# 检查 Node.js 版本（可选）
RUN node -v

# 启动应用程序  
CMD ["npm", "run", "start:prod"]

# 暴露3000端口  
EXPOSE 3000
