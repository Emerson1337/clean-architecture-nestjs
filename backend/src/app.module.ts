import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeChallengeController } from './code-challenge/code-challenge.controller';
import { CodeChallengeModule } from './code-challenge/code-challenge.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true, //turn it false on production
    }),
    CodeChallengeModule,
  ],
  controllers: [CodeChallengeController],
  providers: [],
})
export class AppModule {}
