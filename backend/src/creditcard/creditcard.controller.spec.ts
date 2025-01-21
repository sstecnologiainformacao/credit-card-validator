import { Test, TestingModule } from '@nestjs/testing';
import { CreditcardController } from './creditcard.controller';
import { CreditcardService } from './creditcard.service';
import { ValidateCreditcardDto } from './dto/validate-creditcard.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CreditcardController', () => {
  let controller: CreditcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditcardController],
      providers: [CreditcardService],
    }).compile();

    controller = module.get<CreditcardController>(CreditcardController);
  });

  it('should test a valid credit card number', () => {
    const dto: ValidateCreditcardDto = new ValidateCreditcardDto();
    dto.cardNumber = '374245455400126';
    const isValid = controller.validate(dto);
    expect(isValid).toBeTruthy();
  });

  it('should test a invalid credit card number', () => {
    const dto: ValidateCreditcardDto = new ValidateCreditcardDto();
    dto.cardNumber = '374245455400127';
    try {
      controller.validate(dto); // método síncrono
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Invalid credit card number');
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
