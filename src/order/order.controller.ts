import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { string } from 'joi';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){

    }

    @Get()
    async all(){
       return this.orderService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.orderService.getOne(id);
    }

    // @Post("/")
    // async create(@Body() dto: OrderDto){
    //     return this.orderService.create(dto);
    // }


    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('razon') razon:string,
        @Body('email') email:string,
        @Body('telefono') telefono:string,
        @Body('direccion') direccion:string,
        @Body('sku') sku:string,
        ){
        return this.orderService.update(id,{
            razon,
            email,
            telefono,
            direccion,
            sku
        });
    }

    @Post("/save")
    async create(@Body() dto: OrderDto){
        return this.orderService.create(dto);
    }

    
}
