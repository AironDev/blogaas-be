import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  store(@Req() req: Request, @Res() res: Response) {
    const { hostname } = req;
    res.status(200).json({ hostname });
  }

  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    const posts = [
      {
        title: 'The Hinges Award ',
        body: 'Lorem ipsum body of the posts',
        createdAt: '2020-09-12',
        updatedAt: null,
        categories: [
          {
            name: 'journals',
          },
        ],
        author: {
          id: 1,
          name: 'John Doe',
        },
        blog: {
          name: 'Hoffman Epistles',
          id: 12,
        },
      },
      {
        title: 'The Lamns misfled ',
        body: 'Lorem ipsum body of the posts',
        createdAt: '2020-09-12',
        updatedAt: null,
        categories: [
          {
            name: 'journals',
          },
        ],
        author: {
          id: 1,
          name: 'John Doe',
        },
        blog: {
          name: 'Hoffman Epistles',
          id: 12,
        },
      },
    ];

    const { count, page, blogId } = req.query;
    if (!blogId) {
      res.status(400).send({ message: 'Missing blog id' });
    }
    res.status(200).json({
      status: 'ok',
      message: 'Posts retrieved successfully',
      data: posts,
    });
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
