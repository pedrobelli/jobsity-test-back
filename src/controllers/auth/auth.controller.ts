import { Body, Controller, Post } from '@nestjs/common';

import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from '../../shared/dto/create-account.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() accountDto: CreateAccountDto) {
    return this.authService.signIn(accountDto);
  }
  @Post('sign-up')
  async create(@Body() accountDto: CreateAccountDto) {
    return this.accountService.create(accountDto);
  }
}
