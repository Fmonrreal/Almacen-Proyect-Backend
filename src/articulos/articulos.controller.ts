import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { ArticulosService } from './articulos.service';
import { ArticleDto } from 'src/article/dto/article.dto';
import { ArticulosEntity } from './articulos.entity';

export const storage = {
    storage: diskStorage({
    destination: './uploads/articleimages',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
    })

}

@Controller('articulos')
export class ArticulosController {

    constructor(private articulosService: ArticulosService){

    }

    @Get()
    async all(){
        return this.articulosService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.articulosService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: ArticleDto){
        return this.articulosService.create(dto);
    }

    // Post con imagen
    // @Post("/")
    // @UseInterceptors(FileInterceptor('file', storage),('datas'))
    // async create(
    //     @Body() dto: articleDto,
    //     @UploadedFile() file: Observable<Object>
    //     ){
    //     console.log(file)
    //     return this.articulosService.create(dto,file);
    // }

    // @Get(":name")
    // async getByName(@Param('name') name:string){
    //     return this.articulosService.getByName(name);
    // }

    // @Get("/find")
    // async getByName(@Body() name:string){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return this.articulosService.getByName(name);
    // }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.articulosService.getByName(name);
    }

    // @Put("/edit/:id")
    // async update(
    //     @Param('id',ParseIntPipe) id:number,
    //     @Body('name') name:string,
    //     @Body('precio') precio:number,
    //     ){
    //     return this.articulosService.update(id,{
    //         name,
    //         precio
    //     });
    // }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body() dto: ArticleDto
        ){
        return this.articulosService.update(id,
            dto
        );
    }

    // @Post('upload/:id')
    // // for (var pair of produc.entries()) {
    // //     console.log(pair[0]+ ', ' + pair[1]); 
    // // }
    // @UseInterceptors(FileInterceptor('file', storage))
    // async uploadFile(
    //     @Param('id',ParseIntPipe) id:number,
    //     @UploadedFile() file
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
    //     console.log(file);
    //     // return of({imagePath: file.filename});
    //     return this.articulosService.updateOne(id, file)
    // }


    @Put('upload/:id')
    // for (var pair of produc.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    @UseInterceptors(FileInterceptor('file', storage))
    async uploadFile(
        @Param('id',ParseIntPipe) id:number,
        @UploadedFile() file: Observable<Object>
    ) {
        // id = @Param('id',ParseIntPipe) id:number,
        
        console.log(file);
        // return of({imagePath: file.filename});
        return this.articulosService.updateOne(id, file)
    }

    
        
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     // return this.articulosService.updateOne(id, {profileImage: file.filename})
    //     // return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
    //     //     tap((user: User) => console.log(user)),
    //     //     map((user:User) => ({profileImage: user.profileImage}))
    //     // )
    // }
    //}

    // @Get()
 
    // // async all(@Body() name:any){
    //     {
    //     if (name === null || name === undefined){
    //         return this.articulosService.all();
    //     }else{
    //         console.log(name);
    //         return this.articulosService.getByName(name);
    //     }
    // }

    // @Post('upload')
    // async @UseInterceptors(FileInterceptor('file', storage))
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     return this.articulosService.updateOne(user.id, {profileImage: file.filename})
    //     // return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
    //     //     tap((user: User) => console.log(user)),
    //     //     map((user:User) => ({profileImage: user.profileImage}))
    //     // )
    // }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     console.log(file);
    //     return of({imagePath: file.filename});
    // }

    @Get('article-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/articleimages/' + imagename)));
    }

    @Get("quiz")
    async getAllQuiz(): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<ArticulosEntity> {
        return await this.articulosService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuizSum();
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.articulosService.getAllQuiz(name);
    // }

    // @Get("quiz2")
    // async getAllQuizStock(): Promise<ArticulosEntity[]> {
    //     return await this.articulosService.getAllQuizStock();
    // }

    // @Post("quiz2/find")
    // async getAllQuizStockByName(@Body() name:string): Promise<ArticulosEntity[]> {
    //     return await this.articulosService.getAllQuizStockByName(name);
    // }
    
    // @Post("quiz2/find")
    // async getAllQuizStockByName(@Body() name:string, @Body() statusFilter:number): Promise<ArticulosEntity[]> {
    //     return await this.articulosService.getAllQuizStockByName(name,statusFilter);
    // }
    @Post("quiz2/find")
    async getAllQuizStockByName(
        @Body() name:string,
        @Body() statusFilter:number,
        @Body() id_sucursales:number): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuizStockByName(name,statusFilter,id_sucursales);
    }

    @Post("quiz2")
    async getAllQuizStock(@Body() statusFilter:number,@Body() id_sucursales:number): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuizStock(statusFilter,id_sucursales);
    }

    @Post("quiz3/find")
    async getAllQuizSumByProvider(@Body() name:string): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuizSumByProvider(name);
    }

    @Post("quiz4/find/:id")
    async getAllQuizSelectArtById(@Param('id', ParseIntPipe) id: number): Promise<ArticulosEntity[]> {
        return await this.articulosService.getAllQuizSelectArtById(id);
    }
}
