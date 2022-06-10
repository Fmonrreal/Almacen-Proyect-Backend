import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,Delete,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { SucursalesService } from './sucursales.service';
import { SucursalesDto } from './dto/sucursales.dto';
import { SucursalesEntity } from './sucursales.entity';


@Controller('sucursales')
export class SucursalesController {
    constructor(private sucursalesService: SucursalesService){

    }

    @Get()
    async all(){
        return this.sucursalesService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.sucursalesService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: SucursalesDto){
        return this.sucursalesService.create(dto);
    }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.sucursalesService.getByName(name);
    }

    @Put("/edit/:id_sucursales")
    async update(
        @Param('id_sucursales',ParseIntPipe) id_sucursales:number,
        @Body() dto: SucursalesDto
        ){
        return this.sucursalesService.update(id_sucursales,dto);
    }

    @Delete("/borrar/:id_sucursales")
    async deleteOne(
        @Param('id_sucursales',ParseIntPipe) id_sucursales:number,
        ){
        return this.sucursalesService.deleteOne(id_sucursales);
    }

    // @Get("quiz")
    // async getAllQuiz(): Promise<SucurEntity[]> {
    //     return await this.sucursalesService.getAllQuiz();
    // }

    // @Get('quiz/:id')
    // async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<SucurEntity> {
    //     return await this.sucursalesService.getQuizById(id);
    // }

    // @Get("quiz/sum")
    // async getAllQuizSum(): Promise<SucurEntity[]> {
    //     return await this.sucursalesService.getAllQuizSum();
    // }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.sucursalesService.getAllQuiz(name);
    // }
}
