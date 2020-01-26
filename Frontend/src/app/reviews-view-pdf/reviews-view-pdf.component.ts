import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-reviews-view-pdf',
  templateUrl: './reviews-view-pdf.component.html',
  styleUrls: ['./reviews-view-pdf.component.css']
})
export class ReviewsViewPdfComponent implements OnInit {

  url: SafeResourceUrl;
  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiEndpoint + 'reviews/pdf/' + this.route.snapshot.params.articleId + '/' +
      JSON.parse(localStorage.getItem('currentUser')).token);
  }

}
