import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-article-view-pdf',
  templateUrl: './article-view-pdf.component.html',
  styleUrls: ['./article-view-pdf.component.css']
})
export class ArticleViewPdfComponent implements OnInit {

  url: SafeResourceUrl;
  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiEndpoint + 'articles/pdf/' + this.route.snapshot.params.articleId + '/' +
      JSON.parse(localStorage.getItem('currentUser')).token);
  }

}
