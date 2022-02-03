import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { LocalStorage } from './custom-storage';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        storage: new LocalStorage(),
        authority: 'http://192.168.1.5:5000',
        redirectUrl: 'be.veilbalie://callback', //window.location.origin, //'be.veilbalie://callback',
        postLogoutRedirectUri: 'be.veilbalie://callback', //'be.veilbalie://callback', //'be.veilbalie://callback', //window.location.origin,
        clientId: 'AuctionSPAMobile',
        scope: 'openid profile email roles offline_access public blue_bid_api',
        responseType: 'code',
        // autoUserInfo: true,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
        renewTimeBeforeTokenExpiresInSeconds: 30
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule { }
