import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ReviewsService} from '../services/reviews.service';

@Component({
  selector: 'app-reviews-view',
  templateUrl: './reviews-view.component.html',
  styleUrls: ['./reviews-view.component.css']
})
export class ReviewsViewComponent implements OnInit {

  data;

  constructor(private reviewsService: ReviewsService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.data = this.sanitizer.bypassSecurityTrustHtml((await this.reviewsService.getReview(this.route.snapshot.params.articleId) as any).data);
  }

}
