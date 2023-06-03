import { Coffee } from '../../../../domain/entities/coffee.entity';
import { CreateProductDto } from '../../../dtos/create-product-dto';

export abstract class CoffeeRepository {
  abstract create(coffee: CreateProductDto): Promise<Coffee>;
  abstract get(query?: any): Promise<Array<Coffee>>;
  abstract find(query?: any): Promise<Coffee>;
}
