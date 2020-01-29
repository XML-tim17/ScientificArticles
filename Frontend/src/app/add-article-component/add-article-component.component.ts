import { ArticlesService } from './../services/articles.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { XonomyService } from '../services/xonomy/xonomy.service';
declare const Xonomy: any;

@Component({
  selector: 'app-add-article-component',
  templateUrl: './add-article-component.component.html',
  styleUrls: ['./add-article-component.component.css']
})
export class AddArticleComponentComponent implements OnInit {

  constructor(private articlesService: ArticlesService, private xonomyService: XonomyService) { }

  articleXML: string;
  coverLetterXML: string;
  @ViewChild('articleXonomy', { static: false }) articleXonomy;
  @ViewChild('coverLetterXonomy', { static: false }) coverLetterXonomy;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.articleXML = this.xonomyService.getArticleTemplate();
    this.coverLetterXML = this.xonomyService.getCoverLetterTemplate();

    Xonomy.render(this.articleXML, this.articleXonomy.nativeElement, this.xonomyService.getArticleSpec());
    //Xonomy.render(this.coverLetterXML, this.coverLetterXonomy.nativeElement, this.xonomyService.getCoverLetterSpec());
  }

  handleFileInput(event, _placeResult, elemRef) {
    let reader = new FileReader();
    reader.onload = (e) => {
      _placeResult = reader.result as string;
      Xonomy.render(_placeResult, elemRef, this.xonomyService.getArticleSpec());
    }
    reader.readAsText(event.target.files[0]);
  }

  async onSubmit() {
    //   if (!this.articleFile && !this.coverLetterFile) {
    //     alert("Select both article and cover letter please.")
    //     return;
    //   }

    //   let reader = new FileReader();

    //   let reader2 = new FileReader();

    //   reader2.onload = (e) => {
    //     this.articlesService.addArticle(reader.result as string, reader2.result as string);
    //     // add toaster
    //   }

    //   reader.onload = (e) => {
    //     reader2.readAsText(this.coverLetterFile);
    //   }

    //   reader.readAsText(this.articleFile)

  }

}
