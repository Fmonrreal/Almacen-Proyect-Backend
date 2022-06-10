import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorDto } from './dto/proveedor.dto';
import { string } from 'joi';

@Controller('proveedor')
export class ProveedorController {
    constructor(private proveedorService: ProveedorService){

    }

    @Get()
    async all(){
       return this.proveedorService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.proveedorService.getOne(id);
    }

    @Post("/")
    async create(@Body() dto: ProveedorDto){
        return this.proveedorService.create(dto);
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
        return this.proveedorService.update(id,{
            razon,
            email,
            telefono,
            direccion,
            sku
        });
    }

   


    
}
