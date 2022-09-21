import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { stringify } from 'querystring';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  const reqMock = {
    query: { count: 3 },
  } as unknown as Request;

  interface jsonResInterface {
    data: Array<any>;
    status: string;
    message: string;
  }

  const jsonResMock = {
    data: [],
    status: 'ok',
    message: 'ok',
  } as jsonResInterface;

  const resStatusMock = {
    send: jest.fn((z) => z),
    json: jest.fn((k) => jsonResMock),
  };

  const resMock = {
    status: jest.fn((x) => resStatusMock),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Post controller index', () => {
    it('should return a status of 400 if query params are missing two', () => {
      controller.index(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });

    it('should return data array for success ', () => {
      reqMock.query = {
        count: '10',
        page: '3',
        blogId: '72364732498',
      };
      controller.index(reqMock, resMock);
      expect(resStatusMock.json).toHaveBeenCalledWith({
        status: 'ok',
        message: expect.stringContaining('Posts retrieved successfully'),
        data: expect.anything(),
      });
    });
  });
});
