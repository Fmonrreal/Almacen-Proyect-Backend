import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put,Delete } from '@nestjs/common';
import { ProvedoresDto } from './dto/provedores.dto';
import { ProvedoresService } from './provedores.service';

@Controller('provedores')
export class ProvedoresController {
    constructor(private provedoresService: ProvedoresService){

    }

    @Get()
    async all(){
       return this.provedoresService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.provedoresService.getOne(id);
    }

    @Post("/")
    async create(@Body() dto: ProvedoresDto){
        return this.provedoresService.create(dto);
    }


    // @Put("/edit/:id")
    // async update(
    //     @Param('id',ParseIntPipe) id:number,
    //     @Body('razon') razon:string,
    //     @Body('email') email:string,
    //     @Body('telefono') telefono:string,
    //     @Body('direccion') direccion:string,
    //     @Body('sku') sku:string,
    //     ){
    //     return this.provedoresService.update(id,{
    //         razon,
    //         email,
    //         telefono,
    //         direccion,
    //         sku
    //     });
    // }

    @Post("/find")
    async getByName(@Body() nombre:string){
        return this.provedoresService.getByName(nombre);
    }

    @Put("/edit/:id_provedores")
    async update(
        @Param('id_provedores',ParseIntPipe) id_provedores:number,
        @Body() dto: ProvedoresDto
        ){
        return this.provedoresService.update(id_provedores,dto);
    }

    @Delete("/borrar/:id_provedores")
    async deleteOne(
        @Param('id_provedores',ParseIntPipe) id_provedores:number,
        ){
        return this.provedoresService.deleteOne(id_provedores);
    }

   


    
}
