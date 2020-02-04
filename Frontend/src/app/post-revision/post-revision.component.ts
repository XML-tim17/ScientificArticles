import { ArticlesService } from './../services/articles.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XonomyService } from '../services/xonomy/xonomy.service';
import { MatSnackBar } from '@angular/material';
declare const Xonomy: any;

@Component({
  selector: 'app-post-revision',
  templateUrl: './post-revision.component.html',
  styleUrls: ['./post-revision.component.css']
})
export class PostRevisionComponent implements OnInit {


  constructor(private articlesService: ArticlesService, private xonomyService: XonomyService, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  articleId: any;
  articleXML: string;
  coverLetterXML: string;
  @ViewChild('articleXonomy', { static: false }) articleXonomy;
  @ViewChild('coverLetterXonomy', { static: false }) coverLetterXonomy;
  @ViewChild('articleHTML', { static: false }) articleHTML;
  @ViewChild('coverLetterHTML', { static: false }) coverLetterHTML;

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
  }

  ngAfterViewInit() {
    this.articleXML = this.xonomyService.getArticleTemplate();
    this.coverLetterXML = this.xonomyService.getCoverLetterTemplate();
    this.renderArticle();
  }

  onTabChanged($event) {
    switch ($event.index) {
      case (0):
        this.coverLetterXonomy.nativeElement.innerHTML = '';
        this.renderArticle();
        break;
      case (1):
        this.articleXonomy.nativeElement.innerHTML = '';
        this.renderCoverLetter();
        break;
    }
  }

  handleFileInputArticle(event) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.articleXML = reader.result as string;
      this.articleXML = this.xonomyService.storeImagesArticle(this.articleXML);
      this.renderArticle();
    }
    reader.readAsText(event.target.files[0]);
  }

  handleFileInputCoverLetter(event) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.coverLetterXML = reader.result as string;
      this.coverLetterXML = this.xonomyService.storeImagesCoverLetter(this.coverLetterXML);
      this.renderCoverLetter();
    }
    reader.readAsText(event.target.files[0]);
  }

  onArticleChange() {
    this.articleXML = Xonomy.harvest();
    this.articleHTML.nativeElement.innerHTML = this.xonomyService.convertArticleXSLT(this.articleXML);
  }

  renderArticle() {
    Xonomy.render(this.articleXML, this.articleXonomy.nativeElement, {
      allowModeSwitching: true,
      elements: this.xonomyService.getArticleElements(),
      onchange: () => { this.onArticleChange() }
    });
    this.articleHTML.nativeElement.innerHTML = this.xonomyService.convertArticleXSLT(this.articleXML);
  }

  onCoverLetterChange() {
    this.coverLetterXML = Xonomy.harvest();
    this.coverLetterHTML.nativeElement.innerHTML = this.xonomyService.convertCoverLetterXSLT(this.coverLetterXML);
  }

  renderCoverLetter() {
    Xonomy.render(this.coverLetterXML, this.coverLetterXonomy.nativeElement, {
      elements: this.xonomyService.getCoverLetterElements(),
      onchange: () => { this.onCoverLetterChange() }
    });
    this.coverLetterHTML.nativeElement.innerHTML = this.xonomyService.convertCoverLetterXSLT(this.coverLetterXML);
  }

  async onSubmit() {
    let result: any = await this.articlesService.postRevision(this.articleId, this.xonomyService.importArticleImages(this.articleXML),
      this.xonomyService.importCoverLetterImages(this.coverLetterXML));
    this.snackBar.open(result.status ? result.status : result.message, '', {
      duration: 20000,
    });
  }

}
