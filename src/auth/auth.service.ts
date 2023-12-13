import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUser } from './entities/login.entity';
import { Almacen } from 'src/almacen/entities/almacen.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Almacen)
    private readonly alamcenRepository: Repository<Almacen>,

    @InjectRepository(LoginUser)
    private readonly loginUserRepository: Repository<LoginUser>,

    private readonly jwtService: JwtService,
  ) {}
  

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        almacenes: true,
      }
    })

    return products.map( ( product ) => ({
      ...product
    }))
  }

  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, almacenes , ...userData } = createUserDto;
      let almacenes_entity = [];
      if(almacenes){
        almacenes_entity = await this.alamcenRepository.findBy({ id: In(almacenes ) })
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
        almacenes: almacenes_entity
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto , loginUser: any ) {

    const { password, email } = loginUserDto;
    
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }, //! OJO!,
      relations: ["almacenes"]
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
    loginUser.user = user;
    const login_user = this.loginUserRepository.create(loginUser);
   
    const response_log: any = await this.loginUserRepository.save(login_user)
    
    return {
      ...user,
      token: this.getJwtToken({ id: user.id ,id_log: response_log.id})
    };
  }

  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }


  
  private getJwtToken( payload: JwtPayload ) {
  
    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }





}
