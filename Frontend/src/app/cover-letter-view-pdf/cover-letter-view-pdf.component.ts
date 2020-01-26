import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cover-letter-view-pdf',
  templateUrl: './cover-letter-view-pdf.component.html',
  styleUrls: ['./cover-letter-view-pdf.component.css']
})
export class CoverLetterViewPdfComponent implements OnInit {

  url: SafeResourceUrl;
  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiEndpoint + 'coverLetters/pdf/' + this.route.snapshot.params.articleId + '/' +
      JSON.parse(localStorage.getItem('currentUser')).token);
  }

}
