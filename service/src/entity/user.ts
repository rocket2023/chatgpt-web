import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    userName: string

  @Column()
    nick: string

  @Column()
    avatar: string

  @Column()
    email: string

  @Column()
    uuid: string

  @Column()
    password: string

  @Column({ type: 'datetime' })
  createdAt

  @Column({ type: 'datetime' })
  updatedAt
}
