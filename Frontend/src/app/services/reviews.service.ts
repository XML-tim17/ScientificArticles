import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient: HttpClient) { }

  addReview(xmlString: string) {
    return this.httpClient.post(environment.apiEndpoint + 'reviews', { data: xmlString }).toPromise();
  }

  getReview(articleId: string) {
    return this.httpClient.get(environment.apiEndpoint + 'reviews/html/' + articleId).toPromise();
  }
  
  assignReviewers(articleId, reviewers) {
    return this.httpClient.post(`${environment.apiEndpoint}reviews/assign/article/${articleId}`, { reviewers }).toPromise();
  }
}
