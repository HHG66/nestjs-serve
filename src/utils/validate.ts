/*
 * @Author: HHG
 * @Date: 2025-01-14 16:12:36
 * @LastEditTime: 2025-02-17 11:10:51
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\utils\validate.ts
 * @文件说明: 
 */

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


// 自定义验证器类 数字或者为空
@ValidatorConstraint({ name: 'isNumberOrNullOrUndefined', async: false })
export class IsNumberOrNullOrUndefinedConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // 检查值是否为 null、undefined 或数字
    return value === null || value === undefined || (typeof value === 'number' && !isNaN(value));
  }

  defaultMessage(args: ValidationArguments) {
    // 自定义错误消息
    return `${args.property} 必须是数字或为空`;
  }
}

// 自定义验证器类 ISO 8601 时间字符串或者空
@ValidatorConstraint({ async: false })
export class IsDateStringOrEmptyConstraint implements ValidatorConstraintInterface {
  label: string;
  constructor(label: string) {
    // console.log(label); // 这里可以获取到你在装饰器中传入的参数
    this.label = label;

  }
  validate(value: any, args: ValidationArguments) {
    let validDate = new Date(value).toISOString()
    if (validDate === null || validDate === undefined || validDate === '') {
      return true; // 为空时验证通过
    }
    // 这里你可以添加你想要的日期字符串格式验证逻辑
    // 例如，使用正则表达式来检查 ISO 8601 格式
    const dateStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
    return dateStringRegex.test(validDate);
  }

  defaultMessage(args: ValidationArguments) {
    return `${this.label} 必须为时间格式或者非必填`;
  }
}

export function IsDateStringOrEmpty(label: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [label],
      validator: IsDateStringOrEmptyConstraint,
    });
  };
}