import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put } from '@nestjs/common';
import { VentasDto } from './dto/ventas.dto';
import { VentasService } from './ventas.service';


@Controller('ventas')
export class VentasController {
    constructor(private ventasService: VentasService){

    }

    @Get()
    async all(){
       return this.ventasService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.ventasService.getOne(id);
    }

    // @Post("/")
    // async create(@Body() dto: VentasDto){
    //     return this.ventasService.create(dto);
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
        return this.ventasService.update(id,{
            razon,
            email,
            telefono,
            direccion,
            sku
        });
    }

    @Post("/save")
    async create(@Body() dto: VentasDto){
        return this.ventasService.create(dto);
    }

}
