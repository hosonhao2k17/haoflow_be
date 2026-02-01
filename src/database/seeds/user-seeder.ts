import { ConfigService } from "@nestjs/config";
import { RoleEntity } from "src/api/roles/entities/role.entity";
import { UserEntity } from "src/api/users/entities/user.entity";
import { Gender, RoleName, SYSTEM } from "src/common/constants/app.constant";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


export class UserSeeder implements Seeder {


    track?: false;



    async  run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const usersRepository = dataSource.getRepository(UserEntity);
        const rolesRepository = dataSource.getRepository(RoleEntity)
        const exists = await usersRepository.findOneBy({
            email: process.env.ADMIN_EMAIL
        })
        if(!exists) {
            const roleAdmin = await rolesRepository.findOneBy({
                name: RoleName.ADMIN
            });
            await usersRepository.save(
                usersRepository.create({
                    fullName: 'Nguyễn Thị Trị Viên',
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                    gender: Gender.MALE,
                    verified: true,
                    avatar: 'https://i.pinimg.com/736x/e5/7b/98/e57b987df5b29f59db3eb669499154ee.jpg',
                    role: {
                        id: roleAdmin?.id
                    },
                
                })
            )
        }
    }
    
}