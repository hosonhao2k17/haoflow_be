import { AccountStatus, AccountType } from "src/common/constants/account.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('accounts')
export class AccountEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: AccountType
    })
    type: AccountType;

    @Column()
    balance: number;

    @Column({nullable: true})
    color?: string;

    @Column({nullable: true})
    icon?: string;

    @Column({
        default: AccountStatus.ACTIVE,
        type: 'enum',
        enum: AccountStatus
    })
    status: AccountStatus;


}
