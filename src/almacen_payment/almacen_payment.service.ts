import { Injectable } from '@nestjs/common';
import { CreateAlmacenPaymentDto } from './dto/create-almacen_payment.dto';
import { UpdateAlmacenPaymentDto } from './dto/update-almacen_payment.dto';

@Injectable()
export class AlmacenPaymentService {
  create(createAlmacenPaymentDto: CreateAlmacenPaymentDto) {
    return 'This action adds a new almacenPayment';
  }

  findAll() {
    return `This action returns all almacenPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} almacenPayment`;
  }

  update(id: number, updateAlmacenPaymentDto: UpdateAlmacenPaymentDto) {
    return `This action updates a #${id} almacenPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} almacenPayment`;
  }
}
