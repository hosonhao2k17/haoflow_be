import { PermissionEntity } from "src/api/roles/entities/permission.entity";
import { RoleEntity } from "src/api/roles/entities/role.entity";
import { RoleName } from "src/common/constants/app.constant";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PERMISSIONS } from "./data/permission-data";



export default class PermissionSeeder implements Seeder {
    track?: boolean | undefined;
    

    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        const repositoriesPermission = dataSource.getRepository(PermissionEntity);
        for(const item of PERMISSIONS) {
            const isExists = await repositoriesPermission.findOneBy({
                action: item.action,
                subject: item.subject
            })
            if(!isExists) {
                await repositoriesPermission.save(item)
            }
        }

        
    }
    
}