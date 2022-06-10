import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { Detalles_pedidosService } from './detalles_pedidos.service';
import { Detalles_pedidosEntity } from './detalles_pedidos.entity';
import { Detalles_pedidosDto } from './dto/detalles_pedidos.dto';

@Controller('detalles_pedidos')
export class Detalles_pedidosController {
    constructor(private detalles_pedidosService: Detalles_pedidosService){

    }

    @Get()
    async all(){
        return this.detalles_pedidosService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.detalles_pedidosService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: Detalles_pedidosDto){
        return this.detalles_pedidosService.create(dto);
    }

    @Post("/find")
    async getById(@Body() id_pedidos:number){
        return this.detalles_pedidosService.getById(id_pedidos);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.detalles_pedidosService.update(id,{
            name,
            precio
        });
    }

    @Get("quiz")
    async getAllQuiz(): Promise<Detalles_pedidosEntity[]> {
        return await this.detalles_pedidosService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Detalles_pedidosEntity> {
        return await this.detalles_pedidosService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<Detalles_pedidosEntity[]> {
        return await this.detalles_pedidosService.getAllQuizSum();
    }

    @Post("/products")
    async getproductsByIdPedidos(@Body() id_pedidos:number){
        return this.detalles_pedidosService.getproductsByIdPedidos(id_pedidos);
    }

    @Put("/update")
    async updateProducts(@Body('cart')cart:Array<{dto: Detalles_pedidosDto}>){
        return this.detalles_pedidosService.updateProducts(cart);
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.detalles_pedidosService.getAllQuiz(name);
    // }

        // @Body('cart')cart:Array<{dto: Almacen2Dto}>,
    //     @Body('id_sucursales') id_sucursales:number,
}
