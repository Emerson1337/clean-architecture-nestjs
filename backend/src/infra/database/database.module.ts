import { Module } from '@nestjs/common';
import { CoffeeRepository } from 'src/application/use-cases/coffee/repositories/coffee.repository';
import { TypeOrmCoffeeRepository } from './typeorm/repositories/coffee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from '../../domain/entities/coffee.entity';
import { ConfigModule } from '@nestjs/config';

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
      entities: [__dirname + '/../../**/*.entity{.js,.ts}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Coffee]),
  ],
  providers: [
    {
      provide: CoffeeRepository,
      useClass: TypeOrmCoffeeRepository,
    },
  ],
  exports: [CoffeeRepository],
})
export class DatabaseModule {}
