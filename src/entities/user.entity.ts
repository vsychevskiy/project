import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  passwordHash: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;
}
