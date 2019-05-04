import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';

import { AddCategorieAction, LoadCategoriesAction } from '../state/admin.actions';
import { categoriesSelector } from '../state/admin.selectors';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  categories$: Observable<CategoryModel[]>;
  categoryForm: FormGroup;

  constructor(private readonly store: Store<any>, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.setForm();
    this.getData();
  }

  getData() {
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.store.dispatch(new LoadCategoriesAction());
  }

  setForm() {
    this.categoryForm = this.fb.group({
      title: [null, [Validators.required]],
      body: [null, []],
    });
  }

  formFieldStatus(field: string) {
    return !this.categoryForm.get(field).valid && this.categoryForm.get(field).touched
      ? 'error'
      : 'null';
  }

  addCategory() {
    if (!this.categoryForm.valid || this.categoryForm.pristine) {
      return;
    }
    this.store.dispatch(
      new AddCategorieAction({
        category: this.categoryForm.value,
      }),
    );
  }
}
