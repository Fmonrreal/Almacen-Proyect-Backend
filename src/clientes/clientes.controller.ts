import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,Delete,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesDto } from './dto/clientes.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clientesService: ClientesService){

    }
    
    @Post("/")
    async create(@Body() dto: ClientesDto){
        return this.clientesService.create(dto);
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.clientesService.getOne(id);
    }

    @Post("/find")
    async getByName(@Body() nombre:string){
        return this.clientesService.getByName(nombre);
    }

    @Put("/edit/:id_clientes")
    async update(
        @Param('id_clientes',ParseIntPipe) id_clientes:number,
        @Body() dto: ClientesDto
        ){
        return this.clientesService.update(id_clientes,dto);
    }

    @Delete("/borrar/:id_clientes")
    async deleteOne(
        @Param('id_clientes',ParseIntPipe) id_clientes:number,
        ){
        return this.clientesService.deleteOne(id_clientes);
    }

}
