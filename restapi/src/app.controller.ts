import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:key')
  testGetMethod(@Param() params): string {
    return this.appService.testGetMethod(params.key);
  }

  @Post('test/post')
  testPost(@Res() res, @Body() obj: any) {
    res.status(HttpStatus.CREATED).send(this.appService.testPostMetod(obj));
  }

  @Put('test/post')
  testPut(@Res() res, @Body() obj: any) {
    res.status(HttpStatus.OK).send(this.appService.testPostMetod(obj));
  }

  @Delete('/:key')
  testDelete(@Param() params) {
    this.appService.testDeleteMetod(params.key);
  }

}
