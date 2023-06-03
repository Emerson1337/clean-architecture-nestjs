import { Coffee } from '../../../../domain/entities/coffee.entity';
import { CreateProductDto } from '../../../dtos/create-product-dto';
import { CoffeeRepository } from '../repositories/coffee.repository';
import { makeFakeCoffee } from './factories';

export class CoffeeRepositoryStub implements CoffeeRepository {
  coffee: CreateProductDto;
  query: any;

  async create(coffee: CreateProductDto): Promise<Coffee> {
    this.coffee = coffee;
    const fakeCoffee = makeFakeCoffee();

    return new Promise((resolve) => resolve(fakeCoffee));
  }

  async get(query: any): Promise<Array<Coffee>> {
    this.query = query;
    const fakeCoffee = makeFakeCoffee();

    return new Promise((resolve) => resolve([fakeCoffee, fakeCoffee]));
  }

  async find(query: any): Promise<Coffee> {
    this.query = query;

    return new Promise((resolve) => resolve(null));
  }
}
