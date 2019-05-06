import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
