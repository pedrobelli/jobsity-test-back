import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from '../../shared/dto/create-account.dto';
import { encryptPassword } from '../../shared/handlers/cryptography-handler';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
      private readonly accountRepository: Repository<Account>,
  ) { }

  async validateAccount(account: Account) {
    if (!account.email || !account.password) {
      throw new HttpException('This data is not valid.', HttpStatus.BAD_REQUEST);
    }

    const tempAccount = await this.getByEmail(account.email);

    if (tempAccount) {
      throw new HttpException('An account with this email already exists.', HttpStatus.BAD_REQUEST);
    }
  }

  async getByEmail(email: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        email: email
      },
    });
  }

  async create(accountDto: CreateAccountDto) {
    const account = new Account();
    account.email = accountDto.email;
    account.password = await encryptPassword(accountDto.password);
    account.updatedAt = new Date();

    await this.validateAccount(account);

    await this.accountRepository.save(account);
  }
}
