import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table
export class AccessToken extends Model {
  @Column({ type: DataType.DATE })
  validToDate: Date;

  @Column({ type: DataType.DATE })
  created: Date;

  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  user: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isVerified: boolean;

}