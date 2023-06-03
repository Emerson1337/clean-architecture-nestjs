import { Tea } from '../../../../domain/entities/tea.entity';
import { CreateProductDto } from '../../../dtos/create-product-dto';

export abstract class TeaRepository {
  abstract create(coffee: CreateProductDto): Promise<Tea>;
  abstract get(query?: any): Promise<Array<Tea>>;
  abstract find(query: any): Promise<Tea>;
}
