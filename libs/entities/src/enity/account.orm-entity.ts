import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({ default: 'credentials' })
  public registrationType: string;

  @Column({ default: false })
  public isEmailVerified: boolean;
}
