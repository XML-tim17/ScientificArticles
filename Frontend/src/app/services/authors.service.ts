import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) { }

  getMyArticles(status: string) {
    return this.httpClient.get(environment.apiEndpoint + 'authors/articles/' + status).toPromise();
  }
}
