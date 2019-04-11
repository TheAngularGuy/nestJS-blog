import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';


registerLocaleData(en);

@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [
    NgZorroAntdModule,
  ]
})
export class NgZorroModule { }
