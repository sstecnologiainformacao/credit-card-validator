import { Test, TestingModule } from '@nestjs/testing';
import { CreditcardService } from './creditcard.service';
import { ValidateCreditcardDto } from './dto/validate-creditcard.dto';

describe('CreditcardService', () => {
  let service: CreditcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditcardService],
    }).compile();

    service = module.get<CreditcardService>(CreditcardService);
  });

  it('should test a valid credit card number', () => {
    const dto: ValidateCreditcardDto = new ValidateCreditcardDto();
    dto.cardNumber = '374245455400126';
    const isValid = service.validate(dto);
    expect(isValid).toBeTruthy();
  });

  it('should test a invalid credit card number', () => {
    const dto: ValidateCreditcardDto = new ValidateCreditcardDto();
    dto.cardNumber = '374245455400127';
    const isValid = service.validate(dto);
    expect(isValid).toBeFalsy();
  });
});
