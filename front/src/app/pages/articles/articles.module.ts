import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ArticlesComponent } from './articles.component';


const routes: Routes = [{
  path: '',
  component: ArticlesComponent,
}];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticlesModule { }
