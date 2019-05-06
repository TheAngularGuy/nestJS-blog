import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { AddCategorieAction, DeleteCategorieAction, EditCategorieAction } from 'src/app/ngrx/actions/category.actions';
import { categoriesSelector } from 'src/app/ngrx/selectors/category.selectors';

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
      return console.error('invalid');
    }
    this.store.dispatch(
      new AddCategorieAction({
        category: this.categoryForm.value,
      }),
    );
  }

  editCategory(c: CategoryModel) {
    if (!c && !c.id) {
      return console.error('invalid');
    }
    this.store.dispatch(
      new EditCategorieAction({
        category: c,
      }),
    );
  }

  deleteCategory(c: CategoryModel) {
    if (!c && !c.id) {
      return console.error('invalid');
    }
    this.store.dispatch(
      new DeleteCategorieAction({
        category: c,
      }),
    );
  }
}
