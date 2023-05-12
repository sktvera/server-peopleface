import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { CommentEntity } from './models/comment.entity';
import { UserEntity } from '../auth/models/user.entity';
import { FeedPostEntity } from '../feed/models/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, FeedPostEntity]), // Asegúrate de incluir el FeedPostEntity aquí
    // ... otros módulos importados
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
