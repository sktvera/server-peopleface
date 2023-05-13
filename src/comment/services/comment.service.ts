import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../models/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FeedPostEntity } from '../../feed/models/post.entity';
import { UserEntity } from '../../auth/models/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createComment(feedPostId: number, createCommentDto: CreateCommentDto) {
    const feedPost = await this.feedPostRepository.findOne(feedPostId, { relations: ['comments'] });
    if (!feedPost) {
      throw new NotFoundException('Feed post not found');
    }

    const author = await this.userRepository.findOne(createCommentDto.author);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const comment = new CommentEntity();
    comment.body = createCommentDto.body;
    comment.author = author;

    feedPost.comments.push(comment);
    await this.feedPostRepository.save(feedPost);

    return comment;
  }

  async getAllComments(): Promise<{ body: string, id: number, authorId: number, feedPostId: number }[]> {
    const comments = await this.commentRepository.find({ relations: ['author', 'feedPost'] });

    return comments.map(comment => ({
      body: comment.body,
      id: comment.id,
      authorId: comment.author.id,
      feedPostId: comment.feedPost.id,
    }));
  }
}
