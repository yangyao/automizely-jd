import { Controller, Body, Get, Res, Req, Next, Param, Post, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JdService } from './jd.service';
import {CreateJdDto} from './dtos/create-jd.dto'

@Controller('/jd')
export class JdController {
  constructor(private readonly jdService: JdService) {}
  @Post()
  async create(@Body() createJdDto: CreateJdDto, @Res() res: Response) {
    await this.jdService.create(createJdDto);
    res.status(HttpStatus.CREATED).send({
      meta: {
        code : 200,
        message : "add jd job successfully"
      },
      data: createJdDto
    });
  }
  @Get()
  async all(@Res() res: Response) {
    const jdList = await this.jdService.all();
    res.status(HttpStatus.OK).send({
      meta: {
        code : 200,
        message : "get all jd job successfully"
      },
      data: jdList
    });
  }
}
