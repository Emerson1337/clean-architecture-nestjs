import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export class FileAdapter {
  saveFile(): MulterOptions {
    return {
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
    };
  }
}
