import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put } from '@nestjs/common';
import { PedidosDto } from './dto/pedidos.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor(private pedidosService: PedidosService){

    }

    @Get()
    async all(){
       return this.pedidosService.all();
    }

    @Post("/getOne")
    async getOne(@Body('id_pedidos',ParseIntPipe) id_pedidos:number){
        return this.pedidosService.getOne(id_pedidos);
    }

    // @Post("/")
    // async create(@Body() dto: PedidosDto){
    //     return this.pedidosService.create(dto);
    // }


    @Put("/edit/:id_pedidos")
    async update(
        @Param('id_pedidos',ParseIntPipe) id_pedidos:number,
        @Body() dto: PedidosDto
        ){
        return this.pedidosService.update(id_pedidos,dto);
    }

    @Post("/save")
    async create(@Body() dto: PedidosDto){
        return this.pedidosService.create(dto);
    }

    // @Post("/save")
    // async create(
    //     @Body('fecha') fecha:Date,
    //     @Body('id_sucursales') id_sucursales:number,
    // ){
    //     return this.pedidosService.create({fecha,id_sucursales});
    // }


}
