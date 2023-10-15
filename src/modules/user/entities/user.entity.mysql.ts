import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '@/modules/role/entities/role.entity.mysql';

@Entity({
  name: 'user',
})
export default class UserEntity {
  @PrimaryGeneratedColumn({
    comment: '用户ID',
  })
  id: number;
  @Column({
    comment: '用户名',
  })
  username: string;
  @Column({
    comment: '密码',
  })
  password: string;
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
  @Column({
    comment: '用户头像',
    default: '21212',
  })
  avator: string;
  // 标识多对多关系，并指定中间表名
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[];
}
