import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './dto/supplier.dto';
import { string } from 'joi';

@Controller('Supplier')
export class SupplierController {
    constructor(private supplierService: SupplierService){

    }

    @Get()
    async all(){
       return this.supplierService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.supplierService.getOne(id);
    }

    @Post("/")
    async create(@Body() dto: SupplierDto){
        return this.supplierService.create(dto);
    }


    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('razon') razon:string,
        @Body('email') email:string,
        @Body('telefono') telefono:string,
        @Body('direccion') direccion:string,
        @Body('sku') sku:string,
        ){
        return this.supplierService.update(id,{
            razon,
            email,
            telefono,
            direccion,
            sku
        });
    }

   


    
}
