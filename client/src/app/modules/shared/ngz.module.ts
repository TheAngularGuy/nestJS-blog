import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { en_US, NgZorroAntdModule, NZ_I18N, NzI18nService } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [],
  imports: [NgZorroAntdModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }, NzI18nService],
  exports: [NgZorroAntdModule],
})
export class NgZorroModule {}
