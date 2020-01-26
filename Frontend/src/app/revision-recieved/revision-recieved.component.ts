import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-revision-recieved',
  templateUrl: './revision-recieved.component.html',
  styleUrls: ['./revision-recieved.component.css']
})
export class RevisionRecievedComponent implements OnInit {

  articles: any;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllByStatus('revisionRecieved').then(data => {
      this.articles = data;
    })
  }

  
  accept(article: any) {
    this.articlesService.setArticleStatus(article.id, 'accepted').then(data => {
      this.articlesService.getAllByStatus('reviewed').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }

  reject(article: any) {
    this.articlesService.setArticleStatus(article.id, 'rejected').then(data => {
      this.articlesService.getAllByStatus('reviewed').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }

  requestRevision(article) {
    this.articlesService.setArticleStatus(article.id, 'inReviewProcess').then(data => {
      this.articlesService.getAllByStatus('revisionRecieved').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }

}
