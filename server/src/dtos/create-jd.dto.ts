
import {IsNotEmpty } from 'class-validator';

export class CreateJdDto {
    @IsNotEmpty()
    pt_key: string;
    @IsNotEmpty()
    pt_pin: string;
    sc_key?: string;
  }