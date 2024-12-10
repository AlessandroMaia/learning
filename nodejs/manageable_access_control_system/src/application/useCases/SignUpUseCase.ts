import bcrypt from 'bcryptjs';
import { prismaClient } from '../libs/PrismaClient';
import { AccountsAlreadyExists } from '../errors/AccountsAlreadyExists';

interface IInput {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ name, email, password, roleId }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: { email }
    });

    if(emailAlreadyExists)
      throw new AccountsAlreadyExists();

    const hashedPassword = await bcrypt.hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId
      }
    });
  }
}
