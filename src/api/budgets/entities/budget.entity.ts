import { TransactionCategoryEntity } from "src/api/transaction-categories/entities/transaction-category.entity";
import { BudgetPeriod } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {startOfMonth, startOfWeek, startOfYear} from 'date-fns'

@Entity('budgets')
export class BudgetEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal'
    })
    amount: number;

    @Column()
    categoryId: string;

    @ManyToOne(() => TransactionCategoryEntity, (category) => category.budgets)
    category: TransactionCategoryEntity;

    @Column({
        type: 'enum',
        enum: BudgetPeriod,
        default: BudgetPeriod.MONTHLY
    })
    period: BudgetPeriod;

    @Column()
    startDate: Date;

    @Column({
        type: 'int'
    })
    alertThreshold: number;

    @BeforeUpdate()
    @BeforeInsert()
    handleStartDate() {
        switch(this.period) {
            case BudgetPeriod.MONTHLY: 
                this.startDate = startOfMonth(this.startDate);
                break;
            case BudgetPeriod.WEEKLY: 
                this.startDate = startOfWeek(this.startDate, { weekStartsOn: 1 });
                break;
            case BudgetPeriod.YEARLY:
                this.startDate = startOfYear(this.startDate);
                break;
        }
    }
}
