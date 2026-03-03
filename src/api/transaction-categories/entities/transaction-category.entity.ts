import { BudgetEntity } from "src/api/budgets/entities/budget.entity";
import { TransactionEntity } from "src/api/transactions/entities/transaction.entity";
import { TransactionCategoryType } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction-categories')
export class TransactionCategoryEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    type: TransactionCategoryType;

    @Column({nullable: true})
    icon?: string;

    @Column({nullable: true})
    color?: string;

    @Column({nullable: true})
    parentId: string;

    @ManyToOne(() => TransactionCategoryEntity, (category) => category.childrens, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'parentId'})
    parent: TransactionCategoryEntity;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.category)
    transactions: TransactionEntity[];

    @OneToMany(() => BudgetEntity, (budget) => budget.category)
    budgets: BudgetEntity[]

    @OneToMany(() => TransactionCategoryEntity, (categories) => categories.parent)
    childrens: TransactionCategoryEntity[];
}
