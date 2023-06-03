import { Column, Entity } from 'typeorm';
import BaseEntity from './config/base.entity';

@Entity('coffees')
export class Coffee extends BaseEntity {
  @Column()
  name: string;

  @Column()
  picture: string;

  @Column()
  description: string;
}
