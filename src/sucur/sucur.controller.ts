import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { SucurEntity } from './sucur.entity';
import { SucurDto } from './dto/sucur.dto';
import { SucurService } from './sucur.service';


@Controller('sucur')
export class SucurController {

    constructor(private sucurService: SucurService){

    }

    @Get()
    async all(){
        return this.sucurService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.sucurService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: SucurDto){
        return this.sucurService.create(dto);
    }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.sucurService.getByName(name);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.sucurService.update(id,{
            name,
            precio
        });
    }

    // @Get("quiz")
    // async getAllQuiz(): Promise<SucurEntity[]> {
    //     return await this.sucurService.getAllQuiz();
    // }

    // @Get('quiz/:id')
    // async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<SucurEntity> {
    //     return await this.sucurService.getQuizById(id);
    // }

    // @Get("quiz/sum")
    // async getAllQuizSum(): Promise<SucurEntity[]> {
    //     return await this.sucurService.getAllQuizSum();
    // }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.sucurService.getAllQuiz(name);
    // }
}
