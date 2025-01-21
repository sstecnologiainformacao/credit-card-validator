import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CreditcardModule } from './creditcard/creditcard.module';

@Module({
  imports: [CreditcardModule],
  providers: [AppService],
})
export class AppModule {}
