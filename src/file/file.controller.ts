import { Controller, Post, UploadedFile, UseInterceptors, Res, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('files')
export class FileController {

  // File upload endpoint
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // The directory where files will be uploaded
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);  // Generate a random file name
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {  // Ensure correct type for file
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
    };
  }

  // File download endpoint
  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../uploads', filename);  // Locate the file in the uploads directory
    if (existsSync(filePath)) {
      return res.download(filePath);  // Download the file if it exists
    } else {
      return res.status(404).json({ message: 'File not found!' });
    }
  }
}
