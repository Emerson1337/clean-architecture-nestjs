import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CoffeeService } from '../../../../application/use-cases/coffee/coffee.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { handleError, ok } from '../../../helpers/http.helper';
import { extname } from 'path';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      const coffee = Object.assign(request.body, {
        picture: request.file.path,
      });

      return response
        .status(201)
        .send(ok(await this.coffeeService.createCoffee(coffee)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.coffeeService.listCoffees()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
