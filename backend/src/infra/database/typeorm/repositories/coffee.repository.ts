import { EntityRepository, Repository } from 'typeorm';

import { Coffee } from '../../../../domain/entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeRepository } from '../../../../application/use-cases/coffee/repositories/coffee.repository';

@EntityRepository(Coffee)
export class TypeOrmCoffeeRepository implements CoffeeRepository {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async create(coffee: Coffee): Promise<Coffee> {
    const createdCoffee = this.coffeeRepository.create(coffee);
    return await this.coffeeRepository.save(createdCoffee);
  }

  async get(query: any): Promise<Array<Coffee>> {
    return await this.coffeeRepository.find(query);
  }

  async find(query: any): Promise<Coffee> {
    return await this.coffeeRepository.findOne(query);
  }
}
