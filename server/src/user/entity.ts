import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import Ticket from '../ticket/entity';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  lastName: string

  @IsString()
  @MinLength(2)
  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:false }) 
  @Exclude({toPlainOnly:true})
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  @OneToMany(_Type => Ticket, ticket => ticket.user, {eager:true})
  tickets: Ticket[];
}