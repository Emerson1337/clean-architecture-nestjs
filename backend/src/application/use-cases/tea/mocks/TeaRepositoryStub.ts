import { Tea } from '../../../../domain/entities/tea.entity';
import { CreateProductDto } from '../../../dtos/create-product-dto';
import { TeaRepository } from '../repositories/tea.repository';
import { makeFakeTea } from './factories';

export class TeaRepositoryStub implements TeaRepository {
  tea: CreateProductDto;
  query: any;

  async create(tea: CreateProductDto): Promise<Tea> {
    this.tea = tea;
    const fakeTea = makeFakeTea();

    return new Promise((resolve) => resolve(fakeTea));
  }

  async get(query: any): Promise<Array<Tea>> {
    this.query = query;
    const fakeTea = makeFakeTea();

    return new Promise((resolve) => resolve([fakeTea, fakeTea]));
  }

  async find(query: any): Promise<Tea> {
    this.query = query;

    return new Promise((resolve) => resolve(null));
  }
}
