import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoverLettersService {

  constructor(private httpClient: HttpClient) { }

  getCoverLetter(articleId: string) {
    return this.httpClient.get(environment.apiEndpoint + 'coverLetters/html/' + articleId).toPromise();
  }
}
