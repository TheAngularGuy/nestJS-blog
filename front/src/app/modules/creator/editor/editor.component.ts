import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Checklist from '@editorjs/checklist';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';

import { layoutCategoriesSelector } from '../../layout/state/layout.selectors';

const NEW_NOTE_INIT = {
  time: Date.now(),
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: 'New article here...',
      },
    },
  ],
  version: '2.12.4',
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  categories$: Observable<CategoryModel[]>;
  editor: EditorJS;
  articleForm: FormGroup;

  constructor(
    private readonly store: Store<any>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.setForm();
    this.categories$ = this.store.select(layoutCategoriesSelector);

    setTimeout(() => {
      this.editor =
        this.editor ||
        new EditorJS({
          onReady: () => this.formChanged(),
          onChange: () => this.formChanged(),
          holder: 'editor',
          autofocus: true,
          data: NEW_NOTE_INIT,
          tools: {
            header: Header,
            list: List,
            checklist: Checklist,
            quote: Quote,
            image: SimpleImage,
          },
        });
    }, 250);
  }

  setForm() {
    this.articleForm = this.fb.group({
      title: [null, [Validators.required]],
      categories: [[], [Validators.required]],
    });
  }

  formChanged() {}

  formFieldStatus(field: string) {
    return !this.articleForm.get(field).valid && this.articleForm.get(field).touched ? 'error' : 'null';
  }

  async save() {
    const ob = {
      title: this.articleForm.value.title,
      categoryIds: this.articleForm.value.categories,
      body: await this.editor.saver.save(),
    };
    console.log('Debbug log: EditorComponent -> save -> ob', ob);
  }

  onBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }
}
