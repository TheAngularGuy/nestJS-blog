import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class UtilitiesService {
  constructor(private readonly message: NzMessageService) {}

  toastSuccess(msg: string) {
    this.message.success(msg, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }

  toastError(msg: string) {
    this.message.error(msg, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }

  toastInfo(msg: string) {
    this.message.info(msg, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }

  scrollToTop() {
    document.getElementById('content').scroll(0, 0);
  }
}
