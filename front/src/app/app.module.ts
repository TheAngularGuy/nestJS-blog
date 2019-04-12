import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { metaReducers, reducers } from './ngrx/reducers';
import { CustomRouteSerializer } from './ngrx/serializers/custom-oute-serializer';

const routes: Routes = [{
  path: 'auth',
  loadChildren: './pages/auth/auth.module#AuthModule',
},
{
  path: '',
  loadChildren: './pages/layout/layout.module#LayoutModule',
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot({ router: routerReducer, ...reducers }, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', serializer: CustomRouteSerializer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
