import { Module } from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { CreditcardController } from './creditcard.controller';

@Module({
  controllers: [CreditcardController],
  providers: [CreditcardService],
})
export class CreditcardModule {}
