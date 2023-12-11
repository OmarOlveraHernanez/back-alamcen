import { Module } from '@nestjs/common';
import { AlmacenPaymentService } from './almacen_payment.service';
import { AlmacenPaymentController } from './almacen_payment.controller';

@Module({
  controllers: [AlmacenPaymentController],
  providers: [AlmacenPaymentService]
})
export class AlmacenPaymentModule {}
