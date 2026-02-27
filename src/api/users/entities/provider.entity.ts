import { Provider } from "src/common/constants/provider.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";



@Entity('providers')
export class ProviderEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: Provider
    })
    provider: Provider;

    @Column()
    providerId: string;

    @Column()
    userId: string;

    @ManyToOne(() => UserEntity, (provider) => provider.providers)
    user: UserEntity;

}