import { Module } from '@nestjs/common';
import { CoffeeController } from './controllers/coffee/coffee.controller';
import { CoffeeService } from '../../application/use-cases/coffee/coffee.service';
import { DatabaseModule } from '../../infra/database/database.module';
import { ValidatorsModule } from '../../domain/validators/validator.module';

@Module({
  imports: [DatabaseModule, ValidatorsModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class HttpModule {}
