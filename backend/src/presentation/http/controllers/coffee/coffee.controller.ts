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
import { Request, Response } from 'express';
import { handleError, ok } from '../../../helpers/http.helper';
import { FileAdapter } from '../../../../infra/adapters/fileAdapter/file.adapter';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', new FileAdapter().saveFile()))
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      const coffee = Object.assign(request.body, {
        picture: request.file.path,
      });

      return response
        .status(201)
        .send(ok(await this.coffeeService.create(coffee)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response.status(200).send(ok(await this.coffeeService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
