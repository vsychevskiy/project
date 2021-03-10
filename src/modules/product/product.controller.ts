import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from '../../guard/admin-auth.guard';
import { UserAuthGuard } from '../../guard/user-auth.guard';
import { IProduct } from '../../interfaces';
import { ProductDto } from './dto/create-product.dto';
import { ProductService } from './services/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @UseGuards(AdminAuthGuard)
  @Post('create')
  public async createProduct(
    @Body() body: ProductDto,
  ): Promise<IProduct> {
    return await this.productService.create(body);
  }

  @UseGuards(AdminAuthGuard)
  @Get('all')
  public async getAll(
  ): Promise<IProduct[]> {
    return await this.productService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @Get('available')
  public async getAvailable(
  ): Promise<IProduct[]> {
    return await this.productService.findAvailable();
  }

  @UseGuards(AdminAuthGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() body: ProductDto,
  ): Promise<IProduct> {
    return await this.productService.update(id, body);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('delete/:id')
  public async delete(
    @Param('id') id: string,
  ): Promise<IProduct> {
    return await this.productService.delete(id);
  }
}
