import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaArticleListComponent } from './na-article-list.component';

describe('NaArticleListComponent', () => {
  let component: NaArticleListComponent;
  let fixture: ComponentFixture<NaArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaArticleListComponent]
    });
    fixture = TestBed.createComponent(NaArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
