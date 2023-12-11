import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlmacenPaymentService } from './almacen_payment.service';
import { CreateAlmacenPaymentDto } from './dto/create-almacen_payment.dto';
import { UpdateAlmacenPaymentDto } from './dto/update-almacen_payment.dto';

@Controller('almacen-payment')
export class AlmacenPaymentController {
  constructor(private readonly almacenPaymentService: AlmacenPaymentService) {}

  @Post()
  create(@Body() createAlmacenPaymentDto: CreateAlmacenPaymentDto) {
    return this.almacenPaymentService.create(createAlmacenPaymentDto);
  }

  @Get()
  findAll() {
    return this.almacenPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.almacenPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlmacenPaymentDto: UpdateAlmacenPaymentDto) {
    return this.almacenPaymentService.update(+id, updateAlmacenPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.almacenPaymentService.remove(+id);
  }
}
