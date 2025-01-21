import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { ValidateCreditcardDto } from './dto/validate-creditcard.dto';

@Controller('creditcard')
export class CreditcardController {
  constructor(private readonly creditcardService: CreditcardService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  validate(@Body() validateCreditcardDto: ValidateCreditcardDto) {
    const result: boolean = this.creditcardService.validate(
      validateCreditcardDto,
    );
    if (!result) {
      throw new HttpException(
        'Invalid credit card number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      result,
    };
  }

  @Get('/patterns')
  findPatterns() {
    const result = this.creditcardService.findPatterns();
    return {
      result,
    };
  }
}
