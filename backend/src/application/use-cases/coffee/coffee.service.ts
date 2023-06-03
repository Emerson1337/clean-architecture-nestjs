import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dtos/create-product-dto';
import { CoffeeRepository } from './repositories/coffee.repository';
import { Coffee } from '../../../domain/entities/coffee.entity';
import { ProductValidator } from '../../../domain/validators/product.validator';
import { InvalidParamError } from '../../../presentation/errors';

@Injectable()
export class CoffeeService {
  constructor(
    private coffeeRepository: CoffeeRepository,
    private productValidator: ProductValidator,
  ) {}

  async createCoffee(coffee: CreateProductDto): Promise<Coffee | Error> {
    this.productValidator.validateProductFields(coffee);

    const coffeeCreated = await this.coffeeRepository.find({
      name: coffee.name,
    });

    if (coffeeCreated)
      throw new InvalidParamError('name', 'This name already exists!');

    return await this.coffeeRepository.create(coffee);
  }

  async listCoffees(): Promise<Array<Coffee> | Error> {
    return await this.coffeeRepository.get();
  }
}
