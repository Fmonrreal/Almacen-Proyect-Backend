import { Body,Controller,Get,Post,Param, ParseIntPipe,Put,UseInterceptors,UploadedFile, Request, Res } from '@nestjs/common';
import { string } from 'joi';
import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { Express } from 'express';
import { ArticleEntity } from './article.entity';

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


@Controller('articles')
export class ArticleController {

    constructor(private articleService: ArticleService){

    }

    @Get()
    async all(){
        return this.articleService.all();
    }

    // @Get(":id")
    // async getOne(@Param('id',ParseIntPipe) id:number){
    //     return this.articleService.getOne(id);
    // }

    @Post("/")
    async create(@Body() dto: ArticleDto){
        return this.articleService.create(dto);
    }

    // Post con imagen
    // @Post("/")
    // @UseInterceptors(FileInterceptor('file', storage),('datas'))
    // async create(
    //     @Body() dto: articleDto,
    //     @UploadedFile() file: Observable<Object>
    //     ){
    //     console.log(file)
    //     return this.articleService.create(dto,file);
    // }

    // @Get(":name")
    // async getByName(@Param('name') name:string){
    //     return this.articleService.getByName(name);
    // }

    // @Get("/find")
    // async getByName(@Body() name:string){
    //     // console.log(`${obj.name}`);
    //     // const nameB:{name:string} =name
    //     return this.articleService.getByName(name);
    // }

    @Post("/find")
    async getByName(@Body() name:string){
        // console.log(`${obj.name}`);
        // const nameB:{name:string} =name
        return this.articleService.getByName(name);
    }

    // @Put("/edit/:id")
    // async update(
    //     @Param('id',ParseIntPipe) id:number,
    //     @Body('name') name:string,
    //     @Body('precio') precio:number,
    //     ){
    //     return this.articleService.update(id,{
    //         name,
    //         precio
    //     });
    // }

    @Put("/edit/:id")
    async update(
        @Param('id',ParseIntPipe) id:number,
        @Body() dto: ArticleDto
        ){
        return this.articleService.update(id,
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
    //     return this.articleService.updateOne(id, file)
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
        return this.articleService.updateOne(id, file)
    }

    
        
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     // return this.articleService.updateOne(id, {profileImage: file.filename})
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
    //         return this.articleService.all();
    //     }else{
    //         console.log(name);
    //         return this.articleService.getByName(name);
    //     }
    // }

    // @Post('upload')
    // async @UseInterceptors(FileInterceptor('file', storage))
    // // uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     // console.log(file);
    //     // return of({imagePath: file.filename});
    //     // const @Body() name:string = req.user;

    //     return this.articleService.updateOne(user.id, {profileImage: file.filename})
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
    async getAllQuiz(): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuiz();
    }

    @Get('quiz/:id')
    async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
        return await this.articleService.getQuizById(id);
    }

    @Get("quiz/sum")
    async getAllQuizSum(): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuizSum();
    }

    // @Get("quiz/find")
    // async getAllQuizByName(@Body() name:string){
    //     return this.articleService.getAllQuiz(name);
    // }

    // @Get("quiz2")
    // async getAllQuizStock(): Promise<ArticleEntity[]> {
    //     return await this.articleService.getAllQuizStock();
    // }

    // @Post("quiz2/find")
    // async getAllQuizStockByName(@Body() name:string): Promise<ArticleEntity[]> {
    //     return await this.articleService.getAllQuizStockByName(name);
    // }
    
    // @Post("quiz2/find")
    // async getAllQuizStockByName(@Body() name:string, @Body() statusFilter:number): Promise<ArticleEntity[]> {
    //     return await this.articleService.getAllQuizStockByName(name,statusFilter);
    // }
    @Post("quiz2/find")
    async getAllQuizStockByName(
        @Body() name:string,
        @Body() statusFilter:number,
        @Body() id_sucursal:number): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuizStockByName(name,statusFilter,id_sucursal);
    }

    @Post("quiz2")
    async getAllQuizStock(@Body() statusFilter:number,@Body() id_sucursal:number): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuizStock(statusFilter,id_sucursal);
    }

    @Post("quiz3/find")
    async getAllQuizSumByProvider(@Body() name:string): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuizSumByProvider(name);
    }

    @Post("quiz4/find/:id")
    async getAllQuizSelectArtById(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity[]> {
        return await this.articleService.getAllQuizSelectArtById(id);
    }
}
