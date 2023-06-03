import { CoffeeService } from './coffee.service';
import { CreateProductDto } from '../../dtos/create-product-dto';
import { Coffee } from '../../../domain/entities/coffee.entity';
import { CoffeeRepository } from './repositories/coffee.repository';
import {
  InvalidParamError,
  MissingParamError,
} from '../../../presentation/errors';
import { Validator } from '../../../domain/validators/validator.interface';
import { ProductValidator } from '../../../domain/validators/product.validator';

interface SutTypes {
  sut: CoffeeService;
  coffeeRepositoryStub: CoffeeRepository;
  productValidator: Validator;
}

const makeFakeCoffeeRepository = (): CoffeeRepository => {
  class CoffeeRepositoryStub implements CoffeeRepository {
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

  return new CoffeeRepositoryStub();
};

const makeSut = (): SutTypes => {
  const coffeeRepositoryStub = makeFakeCoffeeRepository();
  const productValidator = new ProductValidator();
  const sut = new CoffeeService(coffeeRepositoryStub, productValidator);
  return {
    sut,
    coffeeRepositoryStub,
    productValidator,
  };
};

const makeFakeCoffee = (): Coffee => ({
  id: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  picture: 'valid_picture',
  created_at: new Date('2023-06-03T03:43:54.555Z'),
  updated_at: new Date('2023-06-03T03:43:54.555Z'),
});

describe('SignUp controller', () => {
  test('Should not be able to create coffee if no picture is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: '',
      description: 'valid_description',
    };

    const coffeeResponse = async () => await sut.createCoffee(coffeeRequest);

    expect(coffeeResponse).rejects.toThrow(new MissingParamError('picture'));
  });

  test('Should not be able to create coffee if empty description is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: '',
    };

    const coffeeResponse = async () => await sut.createCoffee(coffeeRequest);
    expect(coffeeResponse).rejects.toThrow(
      new MissingParamError('description'),
    );
  });

  test('Should not be able to create coffee if empty name is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: '',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    const coffeeResponse = async () => await sut.createCoffee(coffeeRequest);
    expect(coffeeResponse).rejects.toThrow(new MissingParamError('name'));
  });

  test('Should not be able to create coffee if name already registered is provided', async () => {
    const { sut, coffeeRepositoryStub } = makeSut();
    const coffeeRequest = {
      name: 'duplicated_name',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    jest
      .spyOn(coffeeRepositoryStub, 'find')
      .mockReturnValueOnce(Promise.resolve(makeFakeCoffee()));

    const coffeeResponse = async () => await sut.createCoffee(coffeeRequest);

    expect(coffeeResponse).rejects.toThrow(
      new InvalidParamError('name', 'This name already exists!'),
    );
  });

  test('Should not be able to create coffee if empty short description is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: 'val',
    };

    const coffeeResponse = async () => await sut.createCoffee(coffeeRequest);
    expect(coffeeResponse).rejects.toThrow(
      new InvalidParamError('description', 'Field too short!'),
    );
  });

  test('Should return a coffee created if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.createCoffee({
      name: 'Coffee',
      picture: 'coffe.png',
      description: 'desc',
    });

    expect(httpResponse).toEqual(makeFakeCoffee());
  });

  test('Should return all coffees created', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.listCoffees();

    expect(httpResponse).toEqual([makeFakeCoffee(), makeFakeCoffee()]);
  });
});
