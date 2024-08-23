/*
 * @Author: HHG
 * @Date: 2023-12-16 15:05:33
 * @LastEditTime: 2023-12-16 16:15:08
 * @LastEditors: 韩宏广
 * @FilePath: \website\src\utils\getReqMainInfo.ts
 * @文件说明: 
 */
import { Request } from 'express';

export const getReqMainInfo: (req: Request) => {
  [prop: string]: any;
} = (req) => {
  const { query, headers, url, method, body, connection } = req;

  // 获取 IP
  const xRealIp = headers['X-Real-IP'];
  const xForwardedFor = headers['X-Forwarded-For'];
  const { ip: cIp } = req;
  const { remoteAddress } = connection || {};
  const ip = xRealIp || xForwardedFor || cIp || remoteAddress;

  return {
    url,
    host: headers.host,
    ip,
    method,
    query,
    body,
  };
};