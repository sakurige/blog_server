import UserEntity from '@/modules/user/entities/user.entity.mysql';

export type CreateUserDto = Pick<UserEntity, 'username' | 'password'>;
export type UpdateUserDto = Pick<
  UserEntity,
  'username' | 'password' | 'avator' | 'roles'
>;
