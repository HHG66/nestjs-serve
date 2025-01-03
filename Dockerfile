# 使用Node.js基础镜像  
FROM node:18.17.1  
  
RUN pwd
RUN ls

# 设置工作目录
WORKDIR /app

COPY ${WORKSPACE} /app

# 安装依赖项  
RUN node -v
RUN pwd  
RUN ls 

# 安装依赖
#RUN npm run  install
#RUN npm run  build

  
# 定义环境变量  
ENV NODE_ENV=production  
  
# 启动应用程序  
CMD ["npm", "run", "start:prod"]  
  
# 暴露3000端口  
EXPOSE 3000


#RUN docker login --username=242151578700@qq.com registry.cn-wulanchabu.aliyuncs.com    
#RUN docker tag [ImageId] registry.cn-wulanchabu.aliyuncs.com/hhg-website/website-serve:[镜像版本号]    
#RUN docker push registry.cn-wulanchabu.aliyuncs.com/hhg-website/website-serve:[镜像版本号]