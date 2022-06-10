import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put,UseInterceptors,UploadedFile, Request, Res,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,FileFieldsInterceptor,AnyFilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { Articulos_provedoresService } from './articulos_provedores.service';
import { Articulos_provedoresEntity } from './articulos_provedores.entity';
import { Articulos_provedoresDto } from './dto/articulos_provedores.dto';

export const storage = {
    storage: diskStorage({
    destination: './uploads/articleprovimages',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
    })

}

@Controller('articulos_provedores')
export class Articulos_provedoresController {
    constructor(private articulos_provedoresService: Articulos_provedoresService){

    }

    @Get()
    async all(){
        return this.articulos_provedoresService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.articulos_provedoresService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: Articulos_provedoresDto){
        return this.articulos_provedoresService.create(dto);
    }

    // Post con imagen
    // @Post("/")
    // @UseInterceptors(FileInterceptor('file', storage),('datas'))
    // async create(
    //     @Body() dto: articleprovDto,
    //     @UploadedFile() file: Observable<Object>
    //     ){
    //     console.log(file)
    //     return this.articulos_provedoresService.create(dto,file);
    // }

    // @Get(":name")
    // async getByName(@Param('name') name:string){
    //     return this.articulos_provedoresService.getByName(name);
    // }

    // @Get("/find")
    // async getByName(@Body() name:string){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return this.articulos_provedoresService.getByName(name);
    // }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.articulos_provedoresService.getByName(name);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body() dto: Articulos_provedoresDto
        ){
        return this.articulos_provedoresService.update(id,dto);
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
    //     return this.articulos_provedoresService.updateOne(id, file)
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
        return this.articulos_provedoresService.updateOne(id, file)
    }

    // @Get()
    // index(
    //     @Query('name') name:string
    // )
    // // async all(@Body() name:any){
    //     {
    //     if (name === null || name === undefined){
    //         return this.articulos_provedoresService.all();
    //     }else{
    //         console.log(name);
    //         return this.articulos_provedoresService.getByName(name);
    //     }
    // }

    // @Post('upload')
    // async @UseInterceptors(FileInterceptor('file', storage))
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     return this.articulos_provedoresService.updateOne(user.id, {profileImage: file.filename})
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

    @Get('articleprov-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/articleprovimages/' + imagename)));
    }


    // @Post('upload2')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile2(
    //     @UploadedFile() file: Express.Multer.File
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
        
    //     console.log(file);
    //     // return of({imagePath: file.filename});
    //     return this.articulos_provedoresService.uplopeOneImage(file)
    // }

    // @Post('upload2')
    // // @Bind(UploadedFiles())
    // @UseInterceptors(FileFieldsInterceptor([{ name: 'file'},{ name: 'upload_preset'},{ name: 'file2'}]))
    // async uploadFile2(
    //     @UploadedFiles() files: { file?: Express.Multer.File[], upload_preset?: string,file2?: Express.Multer.File[] }
    //     // @UploadedFiles() files:  Express.Multer.File[]
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
        
    //     // console.log(Array.from(files));
    //     // return of({imagePath: file.filename});
    //     return this.articulos_provedoresService.uplopeOneImage(files)
    // }


    @Post('upload2')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile2(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body);
    const obj = JSON.parse(JSON.stringify(body));
    const filex = [file,obj]
    console.log(filex);
    return this.articulos_provedoresService.uplopeOneImage(filex)
    }

    // @Post('upload2')
    // @UseInterceptors(AnyFilesInterceptor)
    // async uploadFile2(
    //     @UploadedFiles() files: Array<Express.Multer.File>
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
    //     console.log("Hi 1");
    //     console.log(files);
    //     // return of({imagePath: file.filename});
    //     return this.articulos_provedoresService.uplopeOneImage(files);
    // }


    // @Post('upload2')
    // // @Bind(UploadedFiles())
    // @UseInterceptors(FileFieldsInterceptor([{ name: 'file'}]))
    // async uploadFile2(
    //     @UploadedFiles() files: { file?: Express.Multer.File[], @Body() body }
    //     // @UploadedFiles() files:  Express.Multer.File[]
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
        
    //     // console.log(Array.from(files));
    //     // return of({imagePath: file.filename});
    //     return this.articulos_provedoresService.uplopeOneImage(filex)
    // }
    @Get("quiz")
    async getAllQuiz(): Promise<Articulos_provedoresEntity[]> {
        return await this.articulos_provedoresService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Articulos_provedoresEntity> {
        return await this.articulos_provedoresService.getQuizById(id);
    }

    //Pendiente
    // @Post("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return await this.articulos_provedoresService.getAllQuizByName(name);
    // }

    @Post("quiz3/find")
    async getQuizByProvider(@Body() id_supplier:number){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return await this.articulos_provedoresService.getQuizByProvider(id_supplier);
    }

    @Get("quiz2")
    async getAllQuizStock(): Promise<Articulos_provedoresEntity[]> {
        return await this.articulos_provedoresService.getAllQuizStock();
    }

    @Post("quiz2/find")
    async getAllQuizStockByName(@Body() name:string): Promise<Articulos_provedoresEntity[]> {
        return await this.articulos_provedoresService.getAllQuizStockByName(name);
    }

    // @Get("quiz/find/:id")
    // async getAllQuizById(@Param('id', ParseIntPipe) id: number): Promise<Articulos_provedoresEntity> {
    //     return await this.articulos_provedoresService.getAllQuizById(id);
    // }

    @Post("quiz/find")
    async getAllQuizById(
        @Body() id_articleprov:number,
        @Body() id_sucursales:number): Promise<Articulos_provedoresEntity> {
        return await this.articulos_provedoresService.getAllQuizById(id_articleprov,id_sucursales);
    }

    // @Post("quiz4/find")
    // async getAllQuizByNameAndProvider(
    //     @Body() name:string,
    //     @Body() id_supplier:number
    //     ){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return await this.articulos_provedoresService.getAllQuizByNameAndProvider(name,id_supplier);
    // }

    @Post("quiz4/find")
    async getAllQuizByNameAndProvider(
        @Body() name:string,
        @Body() id_supplier:number,
        @Body() id_sucursales:number
        ){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return await this.articulos_provedoresService.getAllQuizByNameAndProvider(name,id_supplier,id_sucursales);
    }

    @Get("quiz5/find/:id")
    async getAllQuizById2(@Param('id', ParseIntPipe) id: number): Promise<Articulos_provedoresEntity[]> {
        return await this.articulos_provedoresService.getAllQuizById2(id);
    }

    @Post("quiz/provider")
    async getProvidersByProduct(
        @Body() id_article:number
        ){
        return await this.articulos_provedoresService.getProvidersByProduct(id_article);
    }
}
