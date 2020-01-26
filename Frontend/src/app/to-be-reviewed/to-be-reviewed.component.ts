import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-be-reviewed',
  templateUrl: './to-be-reviewed.component.html',
  styleUrls: ['./to-be-reviewed.component.css']
})
export class ToBeReviewedComponent implements OnInit {

  articles: any;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllByStatus('toBeReviewed').then(data => {
      this.articles = data;
    })
  }

}
