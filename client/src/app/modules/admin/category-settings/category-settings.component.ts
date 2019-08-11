import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/category.model';
import {
  AddCategorieAction,
  CategoryActionTypes,
  DeleteCategorieAction,
  DeleteCategorieActionOK,
  EditCategorieAction,
  EditCategorieActionOK,
} from 'src/app/ngrx/actions/category.actions';
import { categoriesSimpleSelector } from 'src/app/ngrx/selectors/category.selectors';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  categories$: Observable<CategoryModel[]>;
  categoryForm: FormGroup;
  editing: CategoryModel[];

  constructor(
    private readonly store: Store<any>,
    private readonly fb: FormBuilder,
    private readonly actions: Actions,
  ) {}

  ngOnInit() {
    this.setForm();
    this.getData();
    this.editing = [];
  }

  getData() {
    this.categories$ = this.store.pipe(select(categoriesSimpleSelector));
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

  startEditingCategory(c: CategoryModel) {
    if (!c && !c.id) {
      return console.error('invalid');
    }
    this.editing[c.id] = c;
  }

  stopEditingCategory(c: CategoryModel) {
    if (!c && !c.id) {
      return console.error('invalid');
    }
    this.editing[c.id] = undefined;
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
    this.actions
      .pipe(
        ofType(CategoryActionTypes.EditCategorieOK),
        first(),
        tap((action: EditCategorieActionOK) => {
          if (action.payload.category.id == c.id) {
            this.editing[c.id] = undefined;
          }
        }),
      )
      .subscribe();
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
    this.actions
      .pipe(
        ofType(CategoryActionTypes.AddCategorieOK),
        first(),
        tap((action: DeleteCategorieActionOK) => {
          this.setForm();
        }),
      )
      .subscribe();
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
