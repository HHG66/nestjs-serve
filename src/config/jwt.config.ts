/*
 * @Author: HHG
 * @Date: 2024-01-03 19:07:04
 * @LastEditTime: 2024-01-03 19:22:11
 * @LastEditors: 韩宏广
 * @FilePath: \website-nest\src\config\jwtConfig.ts
 * @文件说明: 
 */
export default () => (
  process.env.NODE_ENV == "development" ? {
    secret: 'hanhongguang', // 秘钥
    accessTokenExpiresIn: '24h'
  } : {
    secret: 'hanhongguang', // 秘钥
    accessTokenExpiresIn: '1h'
  }) 