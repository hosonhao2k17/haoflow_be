import { TransactionCategoryEntity } from "src/api/transaction-categories/entities/transaction-category.entity";
import { BudgetPeriod } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('budgets')
export class BudgetEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal'
    })
    amount: number;

    @ManyToOne(() => TransactionCategoryEntity, (category) => category.budgets)
    category: TransactionCategoryEntity;

    @Column({
        type: 'enum',
        enum: BudgetPeriod,
        default: BudgetPeriod.MONTHLY
    })
    period: BudgetPeriod;

    @Column()
    month: Date;

    @Column({
        type: 'int'
    })
    alertThreshold: number;
}
