import { Component, OnInit } from '@angular/core';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthBaseService } from '../AuthBaseService ';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  configuration!: OpenIdConfiguration;
  userDataChanged$!: Observable<OidcClientNotification<any>>;
  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;
  modal!: Window;

  constructor(public oidcSecurityService: OidcSecurityService, private authBaseService: AuthBaseService,) {}



  ngOnInit() {
    this.configuration = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
    });
  }

  login() {

    this.authBaseService.doLogin();

    //this.oidcSecurityService.authorize();

    // const authOptions = {
    //   customParams: {
    //     some: 'params',
    //   },
    //   urlHandler: (authUrl : string) => {
    //     this.modal = window.open(authUrl, '_blank')!;

    //     console.log(this.modal);

    //   }
    // };

    // console.log('login');


    // this.oidcSecurityService
    // .authorizeWithPopUp(authOptions)
    // .subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
    //   // ...use data

    //   console.log(this.modal);
    // });
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }
}
