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

    @OneToMany(() => TransactionCategoryEntity, (categories) => categories.parent)
    childrens: TransactionCategoryEntity[];
}
