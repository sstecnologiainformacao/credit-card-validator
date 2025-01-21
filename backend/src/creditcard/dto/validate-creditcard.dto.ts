import { IsString, Length, Matches } from 'class-validator';

export class ValidateCreditcardDto {
  @IsString()
  @Length(13, 16)
  @Matches(/^\d+$/, {
    message:
      'The value representing the credit card number must contain only digits.',
  })
  cardNumber: string;
}
