import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(body: CreateUserDto) {
    const currentUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email: body.email }, { username: body.username }],
      },
    });

    if (currentUser)
      throw new HttpException(
        'Email atau username sudah digunakan',
        HttpStatus.BAD_REQUEST,
      );

    const newuser = await this.userModel.create(body);
    return newuser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id: id } });
  }

  async update(id: number, newBody: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // validasi email dan username tidak boleh sama dengan user lain

    // validasi email
    if (newBody.email != user.email) {
      const isEmailExist = await this.userModel.findOne({
        where: { email: newBody.email },
      });

      if (isEmailExist)
        throw new HttpException(
          'email sudah digunakan',
          HttpStatus.BAD_REQUEST,
        );
    }

    // validasi username
    if (newBody.username != user.username) {
      const isUsernameExist = await this.userModel.findOne({
        where: { username: newBody.username },
      });

      if (isUsernameExist)
        throw new HttpException(
          'username sudah digunakan',
          HttpStatus.BAD_REQUEST,
        );
    }

    // cara lain
    // user.username = newBody.username;
    // user.save();

    const newUser = await user.update(newBody);

    return newUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await user.destroy();

    return { message: `user ${id} berhasil dihapus` };
  }
}
