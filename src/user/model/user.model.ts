import {
  Table,
  Model,
  Unique,
  AllowNull,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface UserAttributes {
  readonly id?: number;
  username: string;
  password: string;
  email: string;
  readonly created_at: string;
  readonly updated_at: string;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'created_at' | 'updated_at'
>;

@Table({})
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @CreatedAt
  created_at: string;

  @UpdatedAt
  updated_at: string;
}
