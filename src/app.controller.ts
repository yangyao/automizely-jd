import { Controller, Get, Res, Req, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
