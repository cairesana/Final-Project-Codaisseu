import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length } from 'class-validator';
import Ticket from '../ticket/entity';


@Entity()
export default class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Length(2, 200)
    @Column('text', {nullable:false})
    content: string

    @IsString()
    @Column('text', {nullable:false})
    author: string

    @ManyToOne(_type => Ticket, ticket => ticket.comment)
    ticket: Ticket 
}

