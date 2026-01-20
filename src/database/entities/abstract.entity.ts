import { BaseEntity, Column, CreateDateColumn, DataSource, UpdateDateColumn } from "typeorm";
import { getOrder, Order } from "../decorators/order.decorator";


export class AbstractEntity extends BaseEntity {

    @Order(9999)
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }) 
    createdAt: Date;

    @Order(9999)
    @Column({
        type: 'varchar',
        length: 36,
    })
    createdBy: string; 

    @Order(9999)
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
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
}