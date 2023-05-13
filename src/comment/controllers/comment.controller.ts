import { Controller, Post,Get, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('feed-post/:id/comment')
  async createComment(@Param('id') feedPostId: number, @Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.createComment(feedPostId, createCommentDto);
    return comment;
  }

  @Get()
  async getAllComments() {
    return this.commentService.getAllComments();
  }
}
