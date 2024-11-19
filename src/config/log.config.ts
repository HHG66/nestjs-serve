/*
 * @Author: HHG
 * @Date: 2023-12-18 09:24:17
 * @LastEditTime: 2024-08-22 18:22:47
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\config\log.config.ts
 * @文件说明: 
 */
export default () => (
  process.env.NODE_ENV == "development" ?
    {
      DIE_NAME: 'logs',// 日志保存的目录
      FILE_NAME: '%DATE%-dev.log',// 日志名称，占位符 %DATE% 取值为 datePattern 值。
      DATE_PATTERN: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
      ZIPPEDARCHIVE: true, // 是否通过压缩的方式归档被轮换的日志文件。
      MAXSIZE: '20m',// 设置日志文件的最大大小，m 表示 mb 。
      MAXFILES: '1',// maxFiles 用于限制保留的日志文件的数量，而不是天数
      FORMAT: 'YYYY-MM-DD HH:mm:ss' //记录时添加时间戳信息
    } : {
      DIE_NAME: 'logs',// 日志保存的目录
      FILE_NAME: '%DATE%.log',// 日志名称，占位符 %DATE% 取值为 datePattern 值。
      DATE_PATTERN: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
      ZIPPEDARCHIVE: true, // 是否通过压缩的方式归档被轮换的日志文件。
      MAXSIZE: '500m',// 设置日志文件的最大大小，m 表示 mb 。
      MAXFILES: '100',// maxFiles 用于限制保留的日志文件的数量，而不是天数
      FORMAT: 'YYYY-MM-DD HH:mm:ss' //记录时添加时间戳信息

    })