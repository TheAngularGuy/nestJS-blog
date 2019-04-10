import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ConexionComponent } from './conexion.component';


const routes: Routes = [{
  path: '',
  component: ConexionComponent,
}];

@NgModule({
  declarations: [
    ConexionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ConexionModule { }
