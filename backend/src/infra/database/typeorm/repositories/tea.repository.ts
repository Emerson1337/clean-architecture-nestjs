import { EntityRepository, Repository } from 'typeorm';
import { Tea } from '../../../../domain/entities/tea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeaRepository } from '../../../../application/use-cases/tea/repositories/tea.repository';

@EntityRepository(Tea)
export class TypeOrmTeaRepository implements TeaRepository {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
  ) {}

  async create(tea: Tea): Promise<Tea> {
    const createdTea = this.teaRepository.create(tea);
    return await this.teaRepository.save(createdTea);
  }

  async get(query: any): Promise<Array<Tea>> {
    return await this.teaRepository.find(query);
  }

  async find(query: any): Promise<Tea> {
    return await this.teaRepository.findOne(query);
  }
}
