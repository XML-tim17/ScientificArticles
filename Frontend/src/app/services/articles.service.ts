import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  addArticle(xmlString: string) {
    return this.httpClient.post(environment.apiEndpoint + 'articles', { data: xmlString }).toPromise();
  }

  getArticle(articleId: string) {
    return this.httpClient.get(environment.apiEndpoint + 'articles/' + articleId).toPromise();
  }
}
