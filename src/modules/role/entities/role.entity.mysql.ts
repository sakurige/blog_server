import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Permission } from '@/modules/permission/entities/permission.entity.mysql';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
  // 标识多对多关系，并指定中间表名
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: Permission[];
}
