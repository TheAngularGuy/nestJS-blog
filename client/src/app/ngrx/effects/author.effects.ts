import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthorService } from 'src/app/providers/author.service';

import { AuthorsActionTypes, LoadAuthorsAction, LoadAuthorsActionKO, LoadAuthorsActionOK } from '../actions/authors.actions';

@Injectable()
export class AuthorEffects {
  constructor(private readonly actions$: Actions, private readonly authorService: AuthorService) {}

  @Effect()
  loadAuthors: Observable<any> = this.actions$.pipe(
    ofType(AuthorsActionTypes.LoadAuthors),
    mergeMap((action: LoadAuthorsAction) => {
      return this.authorService.getAuthors().pipe(
        map(list => {
          return new LoadAuthorsActionOK({
            authors: list,
          });
        }),
        catchError(err => {
          console.error('log: AdminEffects -> loadAuthors -> err', err);
          return of(
            new LoadAuthorsActionKO({
              errorMessage: 'Error while loading the authors',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new LoadAuthorsAction() as any);
  });

  /* End effects */
}
