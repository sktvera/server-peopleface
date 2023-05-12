import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../auth/models/user.entity';
import { FeedPostEntity } from '../../feed/models/post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
  author: UserEntity;

  @ManyToOne(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.comments)
  feedPost: FeedPostEntity;
}
