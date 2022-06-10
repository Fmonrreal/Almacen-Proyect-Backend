import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { StockDto } from './dto/stock.dto';
import { StockService } from './stock.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { StockEntity } from './stock.entity';


@Controller('stock')
export class StockController {

    constructor(private stockService: StockService){

    }

        @Get()
        async all(){
        return this.stockService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.stockService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: StockDto){
        return this.stockService.create(dto);
    }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.stockService.getByName(name);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.stockService.update(id,{
            name,
            precio
        });
    }

    @Get("quiz")
    async getAllQuiz(): Promise<StockEntity[]> {
        return await this.stockService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<StockEntity> {
        return await this.stockService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<StockEntity[]> {
        return await this.stockService.getAllQuizSum();
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.stockService.getAllQuiz(name);
    // }
}
