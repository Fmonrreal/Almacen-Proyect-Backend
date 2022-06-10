import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { Detalles_ventasService } from './detalles_ventas.service';
import { Detalles_ventasEntity } from './detalles_ventas.entity';
import { DetallesVentasDto } from './dto/detalles_ventas.dto';


@Controller('detalles_ventas')
export class Detalles_ventasController {
    constructor(private detalles_ventasService: Detalles_ventasService){

    }

    @Get()
    async all(){
        return this.detalles_ventasService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.detalles_ventasService.getOne(id);
    }

    @Post("/")
    async create(@Body() dto: DetallesVentasDto){
        return this.detalles_ventasService.create(dto);
    }

    @Post("/find")
    async getById(@Body() id_ventas:number){
        return this.detalles_ventasService.getById(id_ventas);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.detalles_ventasService.update(id,{
            name,
            precio
        });
    }

    @Get("quiz")
    async getAllQuiz(): Promise<Detalles_ventasEntity[]> {
        return await this.detalles_ventasService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Detalles_ventasEntity> {
        return await this.detalles_ventasService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<Detalles_ventasEntity[]> {
        return await this.detalles_ventasService.getAllQuizSum();
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.detalles_ventasService.getAllQuiz(name);
    // }
}