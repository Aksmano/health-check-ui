import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {AvatarModule} from 'primeng/avatar';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button'
import {MenuModule} from 'primeng/menu';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './redux/index.reducers';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './redux/index.effects';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AdminPanelLayoutComponent} from './layout/admin-panel-layout/admin-panel-layout.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { SharedModule } from './shared/shared.module';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://keycloak/auth',
        realm: 'health-check',
        clientId: 'health-check-ui',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      bearerExcludedUrls: ['/assets']
    });
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ContentLayoutComponent,
    AdminPanelLayoutComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        KeycloakAngularModule,
        AvatarModule,
        SidebarModule,
        ButtonModule,
        MenuModule,
        SharedModule,
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot(effects),
        ToastModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
