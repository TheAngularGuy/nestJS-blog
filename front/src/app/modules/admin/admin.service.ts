import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {
  constructor(private readonly httpClient: HttpClient) {}
}
