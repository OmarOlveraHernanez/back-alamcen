import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InProductsService } from './in-products.service';
import { CreateInProductDto } from './dto/create-in-product.dto';
import { UpdateInProductDto } from './dto/update-in-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InProducts')
@Controller('in-products')
export class InProductsController {
  constructor(private readonly inProductsService: InProductsService) {}

  @Post()
  create(@Body() createInProductDto: CreateInProductDto) {
    return this.inProductsService.create(createInProductDto);
  }

  @Get()
  findAll() {
    return this.inProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInProductDto: UpdateInProductDto) {
    return this.inProductsService.update(+id, updateInProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inProductsService.remove(+id);
  }
}
