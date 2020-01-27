import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  
  addArticle(articleXML: string, coverLetterXML: string) {
    return this.httpClient.post(environment.apiEndpoint + 'articles', { articleXML, coverLetterXML }).toPromise();
  }

  getToReview() {
    return this.httpClient.get(`${environment.apiEndpoint}reviews/toReview`).toPromise();
  }

  postRevision(id: any, articleXML: string, coverLetterXML: string) {
    return this.httpClient.post(`${environment.apiEndpoint}articles/${id}`, { articleXML, coverLetterXML }).toPromise();
  }

  getArticle(articleId: string) {
    return this.httpClient.get(environment.apiEndpoint + 'articles/html/' + articleId).toPromise();
  }

  getAllByStatus(status) {
    return this.httpClient.get(`${environment.apiEndpoint}articles/status/${status}`).toPromise();
  }

  setArticleStatus(articleId, status) {
    return this.httpClient.get(`${environment.apiEndpoint}articles/${articleId.substring(7)}/status/${status}`).toPromise();
  }

  getAll() {
    return this.httpClient.get(`${environment.apiEndpoint}articles`).toPromise();
  }

  quickSearch(queryParam) {
    const params = new HttpParams().set('q', queryParam);
    return this.httpClient.get(`${environment.apiEndpoint}articles/search`, { params }).toPromise();
  }

  advancedSearch(searchParams) {
    return this.httpClient.post(`${environment.apiEndpoint}articles/search`, searchParams).toPromise();
  }

  withdrawArticle(articleId) {
    return this.httpClient.get(`${environment.apiEndpoint}articles/${articleId}/giveUp`).toPromise();
  }
}
