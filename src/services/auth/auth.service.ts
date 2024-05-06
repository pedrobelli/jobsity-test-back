import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { AccountService } from '../account/account.service';
import { validPassword } from '../../shared/handlers/cryptography-handler';
import { SignInDto } from '../../shared/dto/sign-in.dto';
import { LoginDto } from '../../shared/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
  ) { }

  async signIn(signIn: SignInDto): Promise<LoginDto> {
    const account = await this.accountService.getByEmail(signIn.email);

    if (!account || !validPassword(account.password, signIn.password)) {
      throw new HttpException('Invalid info.', HttpStatus.FORBIDDEN);
    }

    const opts: any = {};
    opts.expiresIn = process.env.AUTH_TOKEN_EXPIRES_IN;
    const secret = process.env.AUTH_SECRET_KEY;

    const token = jwt.sign({
      id: account.id,
      email: signIn.email,
    }, secret, opts);

    return {
      token,
      email: account.email,
    };
  }
}
