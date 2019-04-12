export interface ArticleModel {
  id?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
  editedAt?: Date;
  published?: boolean;
  author?: string;
  claps?: number;
  views?: number;
  comments?: any[];
  categories?: any[];
}
