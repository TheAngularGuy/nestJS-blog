import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSingleComponent } from './article-single.component';

describe('ArticleSingleComponent', () => {
  let component: ArticleSingleComponent;
  let fixture: ComponentFixture<ArticleSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
