import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AuthorsService} from '../services/authors.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  magicalObject;

  constructor(private sanitizer: DomSanitizer,
              private authorsService: AuthorsService) {
    this.magicalObject = [];
  }

  async ngOnInit() {
    const mapper = [
      {
        status: 'accepted',
        label: 'Accepted'
      },
      {
        status: 'rejected',
        label: 'Rejected'
      },
      {
        status: 'revisionRequired',
        label: 'Revision required'
      },
      {
        status: 'inReviewProcess',
        label: 'In review process'
      },
      {
        status: 'toBeReviewed',
        label: 'Waiting to be passed to reviewers'
      },
      {
        status: 'reviewed',
        label: 'Waiting for publisher to process the reviews'
      },
      {
        status: 'revisionRecieved',
        label: 'Waiting for publisher to process the revision'
      },
    ];

    for (const call of mapper) {
      const result: any = await this.authorsService.getMyArticles(call.status);
      const returnedData = [];
      for (const htmlid of result.htmls) {
        returnedData.push({id: htmlid.id, html: htmlid.html});
      }
      this.magicalObject.push({status: call.status, label: call.label, data: returnedData});
    }
  }

}
