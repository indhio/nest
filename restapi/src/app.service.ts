import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  logger = new Logger('AppService');

  getHello(): string {
    return 'Hello World!';
  }

  testGetMethod(key: string): string {
    this.logger.log('GET test ok');
    return key;
  }

  testPostMetod(obj: any): any {
    this.logger.log('POST test ok');
    return obj;
  }

  testPutMetod(obj: any): any {
    this.logger.log('PUT test ok');
    return obj;
  }

  testDeleteMetod(key: string): void {
    this.logger.log('DELETE test ok');
    this.logger.log(`deleting ${key}...`);
  }

}
