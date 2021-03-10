import {
  Module,
  forwardRef,
} from '@nestjs/common';
import { AppModule } from '../../app.module';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { Product } from '../../entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    forwardRef(() => AppModule),
    SequelizeModule.forFeature([Product])
  ],
  controllers: [ProductController],
  providers: [
    ProductService
  ],
  exports: [
    ProductService
  ],
})
export class ProductModule {
}

