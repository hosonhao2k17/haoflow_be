import { AccountEntity } from "src/api/accounts/entities/account.entity";
import { ReceiptEntity } from "src/api/transactions/entities/receipt.entity";
import { TransactionCategoryEntity } from "src/api/transaction-categories/entities/transaction-category.entity";
import { TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class TransactionEntity extends AbstractEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    categoryId?: string;

    @ManyToOne(() => TransactionCategoryEntity, (category) => category.transactions, {
        onDelete: 'SET NULL',
        nullable: true
    } )
    @JoinColumn({name: 'categoryId'})
    category?: TransactionCategoryEntity;

    @Column()
    accountId: string

    @ManyToOne(() => AccountEntity, (account) => account.transactions)
    @JoinColumn({name: 'accountId'})
    account: AccountEntity;

    @Column({
        type: 'enum',
        enum: TransactionType
    })
    type: TransactionType;

    @Column({
        type: 'decimal'
    })
    amount: number;

    @Column({
        nullable: true
    })
    description?: string;

    @Column({
        nullable: true
    })
    merchant?: string;

    @Column()
    transactionDate: Date;

    @Column({
        type: 'enum',
        enum: TransactionSource,
        default: TransactionSource.MANUAL
    })
    source: TransactionSource;

    @Column({
        type: 'bool',
        default: false
    })
    isRecurring: boolean

    @Column({nullable: true})
    receiptId?: string;

    @OneToOne(() => ReceiptEntity,{nullable: true})
    receipt?: ReceiptEntity;
}
