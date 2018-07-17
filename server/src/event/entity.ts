import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator'
import Ticket from '../ticket/entity';


@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @MinLength(5)
  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:false})
  pictureUrl: string

  @Column('date', {nullable:false})
  startDate: Date

  @Column('date', {nullable:false})
  endDate: Date

  @OneToMany(_type => Ticket, ticket => ticket.event)
  tickets: Ticket[];
}




