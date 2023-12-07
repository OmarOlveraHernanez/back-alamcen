import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class InProductDto {
    
    @ApiProperty()
    @IsString()
    id_product: string;

    @ApiProperty()
    @IsInt()
    amount: number;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    name: string;


    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    serie?: string;



}