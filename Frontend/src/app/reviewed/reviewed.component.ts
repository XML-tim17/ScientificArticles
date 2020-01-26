import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-reviewed',
  templateUrl: './reviewed.component.html',
  styleUrls: ['./reviewed.component.css']
})
export class ReviewedComponent implements OnInit {

  articles: any;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllByStatus('reviewed').then(data => {
      this.articles = data;
    })
  }

  accept(article: any) {
    this.articlesService.setArticleStatus(article.articleId, 'accepted').then(data => {
      this.articlesService.getAllByStatus('reviewed').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }

  reject(article: any) {
    this.articlesService.setArticleStatus(article.articleId, 'rejected').then(data => {
      this.articlesService.getAllByStatus('reviewed').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }

  requestRevision(article: any) {
    this.articlesService.setArticleStatus(article.articleId, 'revisionRequired').then(data => {
      this.articlesService.getAllByStatus('reviewed').then(data => {
        this.articles = data;
      })
    }, err => {
      alert(err.message);
    })
  }
}
