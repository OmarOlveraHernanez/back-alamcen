import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateInProductDto } from './dto/create-in-product.dto';
import { UpdateInProductDto } from './dto/update-in-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { InProduct } from './entities/in-product.entity';
import { Product } from 'src/products/entities';




@Injectable()
export class InProductsService {
  private readonly logger = new Logger('InProductsService');
  
  constructor(

    @InjectRepository(InProduct)
    private readonly inProductRepository: Repository<InProduct>,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>, 
  
    private readonly dataSource: DataSource,
  
  ) {}

  async create(createInProductDto: CreateInProductDto) {
    try {
      const {  product  , ...inproductDetails } = createInProductDto;

      let inProduct = this.inProductRepository.create({
        ...inproductDetails,
        product: await this.ProductRepository.findOne({ where: { id: product } })
      });
      

      await this.inProductRepository.save( inProduct );

      return { ...inProduct };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  findAll() {
    return `This action returns all inProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inProduct`;
  }

  update(id: number, updateInProductDto: UpdateInProductDto) {
    return `This action updates a #${id} inProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} inProduct`;
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
