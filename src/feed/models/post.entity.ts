import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../../auth/models/user.entity';
import { CommentEntity } from '../../comment/models/comment.entity';

@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.feedPost, { cascade: true })
  comments: CommentEntity[];
}
