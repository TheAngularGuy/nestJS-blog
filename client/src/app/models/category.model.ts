import { ArticleModel } from './article.model';

export interface CategoryModel {
  id: number;
  title: string;
  body: string;
  articles?: ArticleModel[];
}
