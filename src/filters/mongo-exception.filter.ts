import { ArgumentsHost,Catch, ConflictException, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch(exception.code) {
      case 11000:
        throw new HttpException("Some of the fields already exists", HttpStatus.PARTIAL_CONTENT);
        break;
      default:
        console.log("elooo",exception, host);
    }
  }
}