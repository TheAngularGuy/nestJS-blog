import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';


const routes: Routes = [{
  path: '',
  loadChildren: './pages/layout/layout.module#LayoutModule',
}, {
  path: 'login',
  loadChildren: './pages/conexion/conexion.module#ConexionModule',
}, {
  path: 'signin',
  loadChildren: './pages/register/register.module#RegisterModule',
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
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
