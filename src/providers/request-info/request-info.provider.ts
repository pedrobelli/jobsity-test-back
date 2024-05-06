import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { jwtDecode } from 'jwt-decode';
import { Request } from 'express';

interface TokenInfo {
  email: string;
  id: number;
}

@Injectable({ scope: Scope.REQUEST })
export class RequestInfoProvider {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  private get token() { return String(this.req.headers['authorization']).replace('Bearer ', '') }

  private get tokenInfo(): TokenInfo {
    const obj = jwtDecode<TokenInfo>(this.token);

    return obj;
  }

  get accountId(): number {
    return this.tokenInfo.id;
  }

  get email(): string {
    return this.tokenInfo.email;
  }
}
