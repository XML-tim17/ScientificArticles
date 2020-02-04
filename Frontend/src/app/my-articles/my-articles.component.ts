import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AuthorsService} from '../services/authors.service';
import { saveAs as importedSaveAs } from "file-saver";

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  magicalObject;
  mapper =  [
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

  constructor(private sanitizer: DomSanitizer,
              private authorsService: AuthorsService,
              private articlesService: ArticlesService) {
    this.magicalObject = [];
  }

  async ngOnInit() {
    for (const call of this.mapper) {
      const result: any = await this.authorsService.getMyArticles(call.status);
      const returnedData = [];
      for (const htmlid of result.htmls) {
        returnedData.push({id: htmlid.id, html: htmlid.html});
      }
      this.magicalObject.push({status: call.status, label: call.label, data: returnedData});
    }
  }

  withdraw(article) {
    const articleId = article.id.substring(7);
    this.articlesService.withdrawArticle(articleId).then(data => {
      let x, y;
      for(let i in this.magicalObject) {
        for (let j in this.magicalObject[i].data) {
          if (this.magicalObject[i].data[j].id === article.id) {
            x = i;
            y = j;
            break;
          }
        }
        if (x && y) break;
      }
      if (x && y) {
        this.magicalObject[x].data.splice(y, 1);
      }
      
    }, err => {
      alert(err.message);
    })
  }

  getXML(articleId) {
    this.articlesService.getArticleXML(articleId).then(data => {
      const blob = new Blob([data['data']], { type: 'text/xml' });
      importedSaveAs(blob, `article${articleId}.xml`);
      
    })
  }

}
