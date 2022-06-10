import { Body,Controller,Get,Post,Param, ParseIntPipe,Query,Put,UseInterceptors,UploadedFile, Request, Res,UploadedFiles } from '@nestjs/common';
import { string } from 'joi';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor,FilesInterceptor,FileFieldsInterceptor,AnyFilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';

export const storage = {
    storage: diskStorage({
    destination: './uploads/productimages',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
    })

}


@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){

    }

    @Get()
    async all(){
        return this.productService.all();
    }

    @Get(":id")
    async getOne(@Param('id',ParseIntPipe) id:number){
        return this.productService.getOne(id);
    }

    @Post("/")
    async create(@Body() dto: ProductDto){
        return this.productService.create(dto);
    }

    // Post con imagen
    // @Post("/")
    // @UseInterceptors(FileInterceptor('file', storage),('datas'))
    // async create(
    //     @Body() dto: ProductDto,
    //     @UploadedFile() file: Observable<Object>
    //     ){
    //     console.log(file)
    //     return this.productService.create(dto,file);
    // }

    // @Get(":name")
    // async getByName(@Param('name') name:string){
    //     return this.productService.getByName(name);
    // }

    // @Get("/find")
    // async getByName(@Body() name:string){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return this.productService.getByName(name);
    // }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.productService.getByName(name);
    }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
        @Body('precio') precio:number,
        ){
        return this.productService.update(id,{
            name,
            precio
        });
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
    //     return this.productService.updateOne(id, file)
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
        return this.productService.updateOne(id, file)
    }

    // @Get()
    // index(
    //     @Query('name') name:string
    // )
    // // async all(@Body() name:any){
    //     {
    //     if (name === null || name === undefined){
    //         return this.productService.all();
    //     }else{
    //         console.log(name);
    //         return this.productService.getByName(name);
    //     }
    // }

    // @Post('upload')
    // async @UseInterceptors(FileInterceptor('file', storage))
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     return this.productService.updateOne(user.id, {profileImage: file.filename})
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

    @Get('product-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/productimages/' + imagename)));
    }


    // @Post('upload2')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile2(
    //     @UploadedFile() file: Express.Multer.File
    // ) {
    //     // id = @Param('id',ParseIntPipe) id:number,
        
    //     console.log(file);
    //     // return of({imagePath: file.filename});
    //     return this.productService.uplopeOneImage(file)
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
    //     return this.productService.uplopeOneImage(files)
    // }


    @Post('upload2')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile2(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body);
    const obj = JSON.parse(JSON.stringify(body));
    const filex = [file,obj]
    console.log(filex);
    return this.productService.uplopeOneImage(filex)
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
    //     return this.productService.uplopeOneImage(files);
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
    //     return this.productService.uplopeOneImage(filex)
    // }
}
