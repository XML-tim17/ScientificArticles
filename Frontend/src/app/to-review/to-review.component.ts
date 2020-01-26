import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-review',
  templateUrl: './to-review.component.html',
  styleUrls: ['./to-review.component.css']
})
export class ToReviewComponent implements OnInit {

  articles: any;

  constructor(private articlesService: ArticlesService) { }

  async ngOnInit() {
    this.articles = [];
    const result: any = await this.articlesService.getToReview();
    for (const htmlid of result.htmls) {
      this.articles.push({id: htmlid.id, html: htmlid.html});
    }
  }

}
