import { PartialType } from '@nestjs/mapped-types';
import { CreateLiabilityDto } from './create-liability.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, Max, Min, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

// 自定义验证器，用于验证 currentPeriod 是否小于或等于 totalPeriod
@ValidatorConstraint({ name: 'isCurrentPeriodValid', async: false })
class IsCurrentPeriodValidConstraint implements ValidatorConstraintInterface {
  validate(currentPeriod: any, args: ValidationArguments) {
    const object = args.object as UpdateLiabilityInfoDto; // 将验证的对象转换为 Loan 类型
    return typeof currentPeriod === 'number' &&
      typeof object.totalPeriod === 'number' &&
      currentPeriod >= 1 &&
      currentPeriod <= object.totalPeriod;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Current period must be between 1 and total period';
  }
}

export function IsCurrentPeriodValid() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      constraints: [],
      validator: IsCurrentPeriodValidConstraint,
    });
  };
}
export class UpdateLiabilityInfoDto extends PartialType(CreateLiabilityDto) {
  @IsNotEmpty({ message: '请选择数据' })
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: '请输入正确贷款年限' }) // 期数至少为 1
  loanPeriod: number; // 贷款期限(年限)

  @IsNotEmpty()
  @IsNumber()
  @Min(1) // 期数至少为 1
  totalPeriod: number; // 期数

  @IsNotEmpty()
  @IsNumber()
  @Min(1) // 每年还款次数至少为 1
  paymentsPerYearNum: number; // 每年还款次数

  @IsNotEmpty()
  @IsDateString({}, { message: '请选择贷款开始时间' })
  loanInitiationTime: number; // 贷款开始时间 

  @IsNotEmpty()
  @IsNumber()
  @Min(1) // 当前期数至少为 1
  @IsCurrentPeriodValid()  // 当前期数不能超过总期数（这里是一个动态最大值，需要自定义实现或使用其他方法）
  currentPeriod: number; // 当前期数

}

