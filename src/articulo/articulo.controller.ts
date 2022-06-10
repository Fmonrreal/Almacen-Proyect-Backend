// import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
// import { string } from 'joi';
// import { ArticuloDto } from './dto/articulo.dto';
// import { ArticuloService } from './articulo.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import path = require('path');
// import { join } from 'path';
// import { Observable, of } from 'rxjs';
// import { Express } from 'express';

// export const storage = {
//     storage: diskStorage({
//     destination: './uploads/articuloimages',
//     filename: (req, file, cb) => {
//         const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//         const extension: string = path.parse(file.originalname).ext;

//         cb(null, `${filename}${extension}`)
//     }
//     })

// }


// @Controller('articulos')
// export class ArticuloController {

//     constructor(private articuloService: ArticuloService){

//     }

//     @Get()
//     async all(){
//         return this.articuloService.all();
//     }

//     @Get(":id")
//     async getOne(@Param('id',ParseIntPipe) id:number){
//         return this.articuloService.getOne(id);
//     }

//     // @Post("/")
//     async create(@Body() dto: ArticuloDto){
//         return this.articuloService.create(dto);
//     }

//     // Post con imagen
//     // @Post("/")
//     // @UseInterceptors(FileInterceptor('file', storage),('datas'))
//     // async create(
//     //     @Body() dto: articuloDto,
//     //     @UploadedFile() file: Observable<Object>
//     //     ){
//     //     console.log(file)
//     //     return this.articuloService.create(dto,file);
//     // }

//     // @Get(":name")
//     // async getByName(@Param('name') name:string){
//     //     return this.articuloService.getByName(name);
//     // }

//     // @Get("/find")
//     // async getByName(@Body() name:string){
//     //     // console.log(`${obj.name}`);
//     //     // const nameB:{name:string} =name
//     //     return this.articuloService.getByName(name);
//     // }

//     @Post("/find")
//     async getByName(@Body() name:string){
//         // console.log(`${obj.name}`);
//         // const nameB:{name:string} =name
//         return this.articuloService.getByName(name);
//     }

//     @Put("/edit/:id")
//     async update(
//         @Param('id',ParseIntPipe) id:number,
//         @Body('name') name:string,
//         @Body('precio') precio:number,
//         ){
//         return this.articuloService.update(id,{
//             name,
//             precio
//         });
//     }

//     // @Post('upload/:id')
//     // // for (var pair of produc.entries()) {
//     // //     console.log(pair[0]+ ', ' + pair[1]); 
//     // // }
//     // @UseInterceptors(FileInterceptor('file', storage))
//     // async uploadFile(
//     //     @Param('id',ParseIntPipe) id:number,
//     //     @UploadedFile() file
//     // ) {
//     //     // id = @Param('id',ParseIntPipe) id:number,
//     //     console.log(file);
//     //     // return of({imagePath: file.filename});
//     //     return this.articuloService.updateOne(id, file)
//     // }


//     @Put('upload/:id')
//     // for (var pair of produc.entries()) {
//     //     console.log(pair[0]+ ', ' + pair[1]); 
//     // }
//     @UseInterceptors(FileInterceptor('file', storage))
//     async uploadFile(
//         @Param('id',ParseIntPipe) id:number,
//         @UploadedFile() file: Observable<Object>
//     ) {
//         // id = @Param('id',ParseIntPipe) id:number,
        
//         console.log(file);
//         // return of({imagePath: file.filename});
//         return this.articuloService.updateOne(id, file)
//     }

    
        
//     // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
//     // // uploadFile(@UploadedFile() file): Observable<Object> {
//     //     // console.log(file);
//     //     // return of({imagePath: file.filename});
//     //     // const @Body() name:string = req.user;

//     //     // return this.articuloService.updateOne(id, {profileImage: file.filename})
//     //     // return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
//     //     //     tap((user: User) => console.log(user)),
//     //     //     map((user:User) => ({profileImage: user.profileImage}))
//     //     // )
//     // }
//     //}

//     // @Get()
 
//     // // async all(@Body() name:any){
//     //     {
//     //     if (name === null || name === undefined){
//     //         return this.articuloService.all();
//     //     }else{
//     //         console.log(name);
//     //         return this.articuloService.getByName(name);
//     //     }
//     // }

//     // @Post('upload')
//     // async @UseInterceptors(FileInterceptor('file', storage))
//     // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
//     // uploadFile(@UploadedFile() file): Observable<Object> {
//     //     // console.log(file);
//     //     // return of({imagePath: file.filename});
//     //     // const @Body() name:string = req.user;

//     //     return this.articuloService.updateOne(user.id, {profileImage: file.filename})
//     //     // return this.userService.updateOne(user.id, {profileImage: file.filename}).pipe(
//     //     //     tap((user: User) => console.log(user)),
//     //     //     map((user:User) => ({profileImage: user.profileImage}))
//     //     // )
//     // }

//     // @Post('upload')
//     // @UseInterceptors(FileInterceptor('file', storage))
//     // uploadFile(@UploadedFile() file): Observable<Object> {
//     //     console.log(file);
//     //     return of({imagePath: file.filename});
//     // }

//     @Get('articulo-image/:imagename')
//     findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
//         return of(res.sendFile(join(process.cwd(), 'uploads/articuloimages/' + imagename)));
//     }
// }
