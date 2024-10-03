import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestPro',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Set to true for development only
    }),
    UserModule, // Import user module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
