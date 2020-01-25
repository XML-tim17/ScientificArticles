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

  getToReview() {
    return this.httpClient.get(`${environment.apiEndpoint}reviews/toReview`).toPromise();
  }

  postRevision(id, xmlString: string) {
    return this.httpClient.post(`${environment.apiEndpoint}articles/${id}`, { data: xmlString }).toPromise();
  }
  
  getArticle(articleId: string) {
    return this.httpClient.get(environment.apiEndpoint + 'articles/html/' + articleId).toPromise();
  }
}
