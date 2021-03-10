import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../entities/product.entity';
import { nanoid } from 'nanoid'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product
  ) { }

  public async findAvailable(): Promise<Array<Product>> {
    return await this.productRepository.findAll<Product>({ where: { enabled: true } });
  }

  public async findAll(): Promise<Array<Product>> {
    return await this.productRepository.findAll<Product>();
  }

  public async findOne(options: Object): Promise<Product> {
    return await this.productRepository.findOne<Product>(options);
  }

  public async create(product: any): Promise<Product> {
    return await this.productRepository.create<Product>({ id: nanoid(), ...product })
  }

  public async findById(id: string): Promise<Product> {
    return await this.productRepository.findOne<Product>({ where: { id: id } });
  }

  public async update(id: string, newValue: any): Promise<Product> {
    let product = await this.findById(id);
    if (!product) {
      throw new NotFoundException('Product with such id not found')
    }
    product = await this._assign(product, newValue);
    return await product.save();
  };

  public async delete(id: string): Promise<any> {
    await this.productRepository.destroy({
      where: { id }
    });
    return {
      message: 'success'
    }
  }

  public async _assign(product: any, newValue: IProduct): Promise<any> {
    for (const key of Object.keys(product.dataValues)) {
      if (product[key] !== newValue[key]) product[key] = newValue[key];
    }

    return product as Product;
  }
}
