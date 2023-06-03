import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { TeaService } from '../../../../application/use-cases/tea/tea.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { handleError, ok } from '../../../helpers/http.helper';

@Controller('teas')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

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
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      const tea = Object.assign(request.body, {
        picture: request.file.path,
      });

      return response
        .status(201)
        .send(ok(await this.teaService.createTea(tea)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response.status(200).send(ok(await this.teaService.listTeas()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
