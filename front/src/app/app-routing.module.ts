import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConexionComponent } from './components/conexion/conexion.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
}, {
  path: 'login',
  component: ConexionComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
