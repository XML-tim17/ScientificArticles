import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {CoverLettersService} from '../services/cover-letters.service';

@Component({
  selector: 'app-cover-letter-view',
  templateUrl: './cover-letter-view.component.html',
  styleUrls: ['./cover-letter-view.component.css']
})
export class CoverLetterViewComponent implements OnInit {

  data;

  constructor(private coverLetterService: CoverLettersService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.data = this.sanitizer.bypassSecurityTrustHtml((await this.coverLetterService.getCoverLetter(this.route.snapshot.params.articleId) as any).data);
  }
}
