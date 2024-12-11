/*
 * @Author: HHG
 * @Date: 2023-12-15 09:19:06
 * @LastEditTime: 2024-12-03 08:42:17
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\config\database.config.ts
 * @文件说明:
 */

export default () =>
  process.env.NODE_ENV == 'development'
    ? {
        // MONGODB_URI: 'mongodb://han:han1314.@110.19.168.249:27018/website-test'
        MONGODB_URI: 'mongodb://127.0.0.1:27017/financial-dev',
        serverSelectionTimeoutMS: 5000,  // 设置超时时间
      }
    : {
        // MONGODB_URI: 'mongodb://han:han1314.@192.168.0.101:27017/website-test',
        MONGODB_URI: 'mongodb://127.0.0.1:27017/financial',
        serverSelectionTimeoutMS: 5000,  // 设置超时时间
      };
