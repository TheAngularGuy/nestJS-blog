import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisplayArticleComponent } from './display-article/display-article.component';
import { NgZorroModule } from './ngz.module';
import { UtilitiesService } from './utilities.service';

@NgModule({
  declarations: [DisplayArticleComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroModule],
  providers: [UtilitiesService],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroModule, DisplayArticleComponent],
})
export class SharedModule {}
