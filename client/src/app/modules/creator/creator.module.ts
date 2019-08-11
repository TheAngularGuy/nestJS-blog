import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CreatorService } from './creator.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { CreatorEffects } from './state/creator.effects';
import * as fromCreator from './state/creator.reducer';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create',
    component: EditorComponent,
  },
  {
    path: 'edit/:id',
    component: EditorComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('creator', fromCreator.reducer),
    EffectsModule.forFeature([CreatorEffects]),
    RouterModule.forChild(routes),
  ],
  providers: [CreatorService],
})
export class CreatorModule {}
