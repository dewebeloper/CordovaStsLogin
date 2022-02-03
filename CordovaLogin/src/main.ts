import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers: any[] = [];

// setup za web
// platformBrowserDynamic(providers)
//   .bootstrapModule(AppModule)
//     .catch((err: any) => console.error(err));
// // #########################

// setup za cordovu
const onDeviceReady = () => {
  console.log('on device ready');
  platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
};
document.addEventListener('deviceready', onDeviceReady, false);
// ###########

