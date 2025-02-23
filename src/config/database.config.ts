/*
 * @Author: HHG
 * @Date: 2023-12-15 09:19:06
 * @LastEditTime: 2025-02-23 20:10:11
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/config/database.config.ts
 * @文件说明:
 */

export default () =>{
  // console.log(process.env.NODE_ENV == 'development');
 let config= process.env.NODE_ENV == 'development'
  ? {
      // MONGODB_URI: 'mongodb://han:han1314.@110.19.168.249:27018/website-test'
      MONGODB_URI: 'mongodb://127.0.0.1:27017/financial-dev',
      // MONGODB_URI: 'mongodb://han:han1314.@1.25.137.190:27018/financial',
      serverSelectionTimeoutMS: 5000,  // 设置超时时间
    }
  : {
      // MONGODB_URI: 'mongodb://han:han1314.@192.168.0.101:27017/website-test',
      // MONGODB_URI: 'mongodb://han:han1314.@192.168.0.101:27017/financial',
      // MONGODB_URI: 'mongodb://han:han1314.@192.168.0.101:27017/financial',
      // MONGODB_URI: 'mongodb://han:han1314.@192.168.0.101:27017/financial',
      // MONGODB_URI: 'mongodb://han:han1314.@127.0.0.1:27017/financial',
      // MONGODB_URI: 'mongodb://han:han1314.@1.25.137.190:27018/financial',
      MONGODB_URI: 'mongodb://192.168.0.101:27017/financial',

      
      serverSelectionTimeoutMS: 50000,  // 设置超时时间
    };
    return config
}
 
