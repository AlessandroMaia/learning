import { prismaClient } from '../libs/PrismaClient';

interface IInput {
  roleId: string;
}

interface IOutput {
  permissionsCodes: string[];
}

export class GetRolePermissonsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true }
    });

    const permissionsCodes = rolePermissions.map(rolePermission => rolePermission.permissionCode);

    return { permissionsCodes };
  }
}
