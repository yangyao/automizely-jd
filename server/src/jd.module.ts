import { Module } from '@nestjs/common';
import { JdController } from './jd.controller';
import { JdService } from './jd.service';

@Module({
  imports: [],
  controllers: [JdController],
  providers: [JdService],
})
export class JdModule {}
