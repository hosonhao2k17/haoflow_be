import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DataSource, UpdateDateColumn } from "typeorm";
import { getOrder, Order } from "../decorators/order.decorator";
import { requestContext } from "src/common/context/request.context";
import { SYSTEM } from "src/common/constants/app.constant";


export abstract class AbstractEntity extends BaseEntity {

    @Order(9999)
    @CreateDateColumn({
        type: 'timestamp',
    }) 
    createdAt: Date;

    @Order(9999)
    @Column({
        type: 'varchar',
        length: 36,
        nullable: true
    })
    createdBy: string; 

    @Order(9999)
    @Column({
        type: 'varchar',
        length: 36,
        nullable: true
    })
    updatedBy: string; 

    @Order(9999)
    @UpdateDateColumn({
        type: 'timestamp',
    }) 
    updatedAt: Date;

    static useDataSource(dataSource: DataSource) {
        BaseEntity.useDataSource.call(this, dataSource);
        const meta = dataSource.entityMetadatasMap.get(this);
        if (meta != null) {
            meta.columns = [...meta.columns].sort((x, y) => {
                const orderX = getOrder((x.target as any)?.prototype, x.propertyName);
                const orderY = getOrder((y.target as any)?.prototype, y.propertyName);
                return orderX - orderY;
            });
        }
    }

    @BeforeInsert()
    handleCreate() {
        const ctx = requestContext.getStore();
        this.createdBy = ctx?.userId ?? SYSTEM
        this.updatedBy = ctx?.userId ?? SYSTEM
    }

    @BeforeUpdate()
    handleUpdate() {
        const ctx = requestContext.getStore();
        this.updatedBy = ctx?.userId ?? SYSTEM;
    }

}