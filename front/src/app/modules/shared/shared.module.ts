import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from './ngz.module';
import { UtilitiesService } from './utilities.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroModule],
  providers: [UtilitiesService],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroModule],
})
export class SharedModule {}
