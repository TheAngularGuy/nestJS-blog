import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayArticleComponent implements OnInit {
  @Input() blocks: any[];
  @Input() compact: boolean;

  constructor() {}

  ngOnInit() {}
}
