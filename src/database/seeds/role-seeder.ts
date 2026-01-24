import { title } from "process";
import { RoleEntity } from "src/api/roles/entities/role.entity";
import { RoleName, SYSTEM } from "src/common/constants/app.constant";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";



export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(RoleEntity);

    const roles = [
      {
        name: RoleName.ADMIN,
        title: 'Administrator',
        description: 'Admin',
        createdBy: SYSTEM,
      },
      {
        name: RoleName.USER,
        title: 'User',
        description: 'User',
        createdBy: SYSTEM,
      },
    ];

    await repo.upsert(roles,['name']);
  }
}
