import { Injectable } from '@nestjs/common';
import { ValidateCreditcardDto } from './dto/validate-creditcard.dto';

export interface INumberPattern {
  code: string;
  name: string;
  size: number;
  format: Array<number>;
}

@Injectable()
export class CreditcardService {
  validate(validateCreditcardDto: ValidateCreditcardDto): boolean {
    const digits = validateCreditcardDto.cardNumber;
    const reverse = digits.split('').reverse().map(Number);
    const checksum = reverse.reduce((sum, digit, index) => {
      if (index % 2 === 0) {
        return sum + digit;
      }
      const doubledNumber = digit * 2;
      return sum + (doubledNumber > 9 ? doubledNumber - 9 : doubledNumber);
    }, 0);

    return checksum % 10 === 0;
  }

  findPatterns(): Array<INumberPattern> {
    return [
      {
        code: '3',
        name: 'American Express',
        size: 15,
        format: [4, 6, 5],
      },
      {
        code: '4',
        name: 'Visa',
        size: 16,
        format: [4, 4, 4, 4],
      },
      {
        code: '5',
        name: 'Mastercard',
        size: 16,
        format: [4, 4, 4, 4],
      },
      {
        code: null,
        name: 'Default',
        size: 16,
        format: [4, 4, 4, 4],
      },
    ];
  }
}
