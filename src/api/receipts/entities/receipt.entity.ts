import { ReceiptStatus } from "src/common/constants/app.constant";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('receipts')
export class ReceiptEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    imageUrl: string;

    @Column({nullable: true, type: 'text'})
    ocrRawText?: string;

    @Column({
        nullable: true,
        type: 'decimal'
    })
    parsedAmount?: number;

    @Column({
        nullable: true
    })
    parsedMerchant?: string;

    @Column({
        nullable: true 
    })
    parsedDate?: Date;

    @Column({
        type: 'enum',
        enum: ReceiptStatus,
        default: ReceiptStatus.PENDING
    })
    status: ReceiptStatus;
}
