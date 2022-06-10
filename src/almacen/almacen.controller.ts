import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { AlmacenService } from './almacen.service';
import { AlmacenEntity } from './almacen.entity';
import { AlmacenDto } from './dto/almacen.dto';
import { Almacen2Dto } from './dto/almacen2.dto';


@Controller('almacen')
export class AlmacenController {
    constructor(private almacenService: AlmacenService){

    }

        @Get()
        async all(){
        return this.almacenService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.almacenService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: AlmacenDto){
        return this.almacenService.create(dto);
    }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.almacenService.getByName(name);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.almacenService.update(id,{
            name,
            precio
        });
    }

    @Get("quiz")
    async getAllQuiz(): Promise<AlmacenEntity[]> {
        return await this.almacenService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<AlmacenEntity> {
        return await this.almacenService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<AlmacenEntity[]> {
        return await this.almacenService.getAllQuizSum();
    }


    @Put("/editQuantity/:id_articulos_provedores")
    async updateQuantity(
        @Param('id_articulos_provedores',ParseIntPipe) id_articulos_provedores:number,
        @Body('cantidad') cantidad:number,
        ){
        return this.almacenService.updateQuantity(id_articulos_provedores,
            {cantidad},
        );
    }

    @Put("/transferQuantity/:id_articulos_provedores")
    async transferQuantity(
        @Param('id_articulos_provedores',ParseIntPipe) id_articulos_provedores:number,
        @Body('cantidad') cantidad:number,
        @Body('sucursal_inicial') sucursal_inicial:number,
        @Body('sucursal_final') sucursal_final:number,
        ){
        return this.almacenService.transferQuantity(id_articulos_provedores,
            {cantidad},sucursal_inicial,sucursal_final
        );
    }

    @Post("/AddQuantity")
    async addQuantity(
        // @Body('articulos') articulos:Array<{id_articulos_provedores:number;cantidad:number}>,
        @Body('cart')cart:Array<{dto: Almacen2Dto}>,
        @Body('id_sucursales') id_sucursales:number,
        ){
        return this.almacenService.addQuantity(cart,id_sucursales
        );
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.almacenService.getAllQuiz(name);
    // }
}
