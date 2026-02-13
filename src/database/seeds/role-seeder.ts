import { PermissionEntity } from "src/api/roles/entities/permission.entity";
import { RoleEntity } from "src/api/roles/entities/role.entity";
import { RoleName, } from "src/common/constants/app.constant";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";



export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const roleRepo = dataSource.getRepository(RoleEntity);
    const permissionRepo = dataSource.getRepository(PermissionEntity);

    const permissions = await permissionRepo.find();

    let adminRole = await roleRepo.findOne({
      where: { name: RoleName.ADMIN },
      relations: ['permissions'],
    });

    if (!adminRole) {
      adminRole = roleRepo.create({
        name: RoleName.ADMIN,
        title: 'Administrator',
        description: 'Admin',
      });
    }

    adminRole.permissions = permissions;
    await roleRepo.save(adminRole);

    let userRole = await roleRepo.findOne({
      where: { name: RoleName.USER },
    });

    if (!userRole) {
      userRole = roleRepo.create({
        name: RoleName.USER,
        title: 'User',
        description: 'User',
      });

      await roleRepo.save(userRole);
    }
  }
}

