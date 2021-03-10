import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  stock: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  enabled: boolean;
}