import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { CoffeeService } from '../../../../application/use-cases/coffee/coffee.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  create(@Req() request: Request) {
    const coffee = Object.assign(request.body, {
      picture: request.file.path,
    });

    return this.coffeeService.createCoffee(coffee);
  }
}
