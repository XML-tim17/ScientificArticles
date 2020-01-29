import { Injectable } from '@angular/core';
import { articleTempalte } from './articleTemplate';
import { coverLetterTemplate } from './coverLetterTemplate';
declare const Xonomy: any;



@Injectable({
  providedIn: 'root'
})
export class XonomyService {

  getCoverLetterTemplate(): string {
    return coverLetterTemplate;

  }
  getArticleTemplate(): string {
    return articleTempalte;
  }
  getArticleSpec(): any {
    return {
      elements: {
        "ns1:article": {
          menu: [{
            caption: "Dodaj id",
            action: Xonomy.newElementChild,
            actionParameter: "<ns1:id></ns1:id>"
          }]
        }
      }

    };
  }
  getCoverLetterSpec(): any {
    return {};
  }
  constructor() { }
}
