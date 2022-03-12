import { Component, NgZone, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthBaseService } from './AuthBaseService ';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'CordovaLogin';
  constructor(public oidcSecurityService: OidcSecurityService,
    private zone: NgZone,
    private authBaseService: AuthBaseService,
    private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    console.log('app init');

    this.checkAuth();

    // console.log(this.deviceService.device);

    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
    //   console.log('app authenticated', isAuthenticated);
    //   console.log(`Current access token is '${accessToken}'`);
    // });

    // (window as any).handleOpenURL = (url: string) => {

    //   console.log(url);
    //   this.zone.run(() => {
    //     this.oidcSecurityService.checkAuth(url).subscribe(({ isAuthenticated, userData, accessToken }) => {
    //       console.log('app authenticated', isAuthenticated);
    //       console.log(`Current access token is '${accessToken}'`);
    //     });
    //   });
    // };
  }

  checkAuth(url?: string) {
    console.log(url);

    if (!this.deviceService.isMobile()) {
      this.authBaseService.checkAuth();
    }

    (window as any).handleOpenURL = (url: string) => {
      this.zone.run(() => {
        this.authBaseService.checkAuth(url);
      });
    };
  }

}
