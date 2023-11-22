import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacen } from './entities/almacen.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [AlmacenController],
  imports: [
    TypeOrmModule.forFeature([ Almacen ]),
    AuthModule,
  ],
  exports: [
    AlmacenService,
    TypeOrmModule,
  ],
  providers: [AlmacenService],
})
export class AlmacenModule {}
