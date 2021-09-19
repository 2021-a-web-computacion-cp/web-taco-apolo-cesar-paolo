import { Module } from '@nestjs/common';
import { CalcuController } from './calcu.controller';

@Module({
  imports: [],
  controllers: [CalcuController],
  providers: [],
  exports: [],
})
export class CalcuModule {}
