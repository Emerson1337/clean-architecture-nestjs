import { TeaService } from './tea.service';
import { CreateProductDto } from '../../dtos/create-product-dto';
import { Tea } from '../../../domain/entities/tea.entity';
import { TeaRepository } from './repositories/tea.repository';
import {
  InvalidParamError,
  MissingParamError,
} from '../../../presentation/errors';
import { Validator } from '../../../domain/validators/validator.interface';
import { ProductValidator } from '../../../domain/validators/product.validator';

interface SutTypes {
  sut: TeaService;
  teaRepositoryStub: TeaRepository;
  productValidator: Validator;
}

const makeFakeTeaRepository = (): TeaRepository => {
  class TeaRepositoryStub implements TeaRepository {
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

  return new TeaRepositoryStub();
};

const makeSut = (): SutTypes => {
  const teaRepositoryStub = makeFakeTeaRepository();
  const productValidator = new ProductValidator();
  const sut = new TeaService(teaRepositoryStub, productValidator);
  return {
    sut,
    teaRepositoryStub,
    productValidator,
  };
};

const makeFakeTea = (): Tea => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  picture: 'valid_picture',
  created_at: new Date('2023-06-03T03:43:54.555Z'),
  updated_at: new Date('2023-06-03T03:43:54.555Z'),
});

describe('Tea service', () => {
  test('Should not be able to create tea if no picture is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: '',
      description: 'valid_description',
    };

    const teaResponse = async () => await sut.createTea(teaRequest);

    expect(teaResponse).rejects.toThrow(new MissingParamError('picture'));
  });

  test('Should not be able to create tea if empty description is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: '',
    };

    const teaResponse = async () => await sut.createTea(teaRequest);
    expect(teaResponse).rejects.toThrow(new MissingParamError('description'));
  });

  test('Should not be able to create tea if empty name is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: '',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    const teaResponse = async () => await sut.createTea(teaRequest);
    expect(teaResponse).rejects.toThrow(new MissingParamError('name'));
  });

  test('Should not be able to create tea if name already registered is provided', async () => {
    const { sut, teaRepositoryStub } = makeSut();
    const teaRequest = {
      name: 'duplicated_name',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    jest
      .spyOn(teaRepositoryStub, 'find')
      .mockReturnValueOnce(Promise.resolve(makeFakeTea()));

    const teaResponse = async () => await sut.createTea(teaRequest);

    expect(teaResponse).rejects.toThrow(
      new InvalidParamError('name', 'This name already exists!'),
    );
  });

  test('Should not be able to create tea if empty short description is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: 'val',
    };

    const teaResponse = async () => await sut.createTea(teaRequest);
    expect(teaResponse).rejects.toThrow(
      new InvalidParamError('description', 'Field too short!'),
    );
  });

  test('Should return a tea created if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.createTea({
      name: 'Tea',
      picture: 'coffe.png',
      description: 'desc',
    });

    expect(httpResponse).toEqual(makeFakeTea());
  });

  test('Should return all teas created', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.listTeas();

    expect(httpResponse).toEqual([makeFakeTea(), makeFakeTea()]);
  });
});