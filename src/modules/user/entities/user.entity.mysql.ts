import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export default class UserEntity {
  @PrimaryGeneratedColumn({
    comment: '用户ID',
  })
  uid: number;
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
}
