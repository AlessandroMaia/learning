import { hash } from "bcryptjs";
import { AccountsAlreadyExists } from "../errors/accountsAlreadyExists";
import { prismaClient } from "../lib/prismaClient";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: { email }
    });

    if(emailAlreadyExists)
      throw new AccountsAlreadyExists();

    const hashedPassoword = await hash(password, 10);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassoword
      }
    });
  }
}
