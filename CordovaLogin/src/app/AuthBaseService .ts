import { Injectable } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { DeviceDetectorService } from "ngx-device-detector";
import { of } from "rxjs";


export function authFactory(
  deviceService: DeviceDetectorService,
  oidcSecurityService: OidcSecurityService
) {
  return deviceService.isMobile()
    ? new MobileAuthService(oidcSecurityService)
    : new WebAuthService(oidcSecurityService);
}

@Injectable({
  providedIn: 'root',
  useFactory: authFactory,
  deps: [DeviceDetectorService, OidcSecurityService],
})
export abstract class AuthBaseService {
  modal!: Window | null;

  constructor(public oidcSecurityService: OidcSecurityService) { }

  checkAuth(url?: string) {
    console.log('modal', this.modal);

    if (this.modal) {
      this.modal!.close();
    }

    return this.oidcSecurityService.checkAuth(url).subscribe(({ isAuthenticated, userData, accessToken }) => {
      console.log('app authenticated', isAuthenticated);
      console.log(`Current access token is '${accessToken}'`);

      if (this.modal) {
        this.modal!.close();
        console.log(this.modal!.document.title);
      }
    });
    //return of(this.oidcSecurityService.checkAuth(url));
  }

  abstract doLogin(): any;
}

export class MobileAuthService extends AuthBaseService {
  doLogin() {

    const authOptions = {
      customParams: {
        some: 'params',
      },
      urlHandler: (authUrl: string) => {
        console.log('authUrl', authUrl);
        this.modal = window.open(authUrl, '_blank');
        console.log(this.modal!.document.title);

      }
    };

    return of(this.oidcSecurityService.authorize(undefined, authOptions));
    //return of(this.oidcSecurityService.authorizeWithPopUp(authOptions));
  }
}

export class WebAuthService extends AuthBaseService {
  doLogin() {
    return of(this.oidcSecurityService.authorize());
  }
}
