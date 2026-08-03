import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IAccount } from 'libs/interfaces';

@Entity('accounts')
export class AccountEntity implements IAccount {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ default: 'credentials' })
  public registrationType: string;
}
