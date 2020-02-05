import { ReviewsService } from './../services/reviews.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { XonomyService } from '../services/xonomy/xonomy.service';
import { ArticlesService } from '../services/articles.service';
declare const Xonomy: any;

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private reviewsService: ReviewsService, private xonomyService: XonomyService,
    private snackBar: MatSnackBar, private route: ActivatedRoute, private articlesService: ArticlesService) { }

  articleId;
  reviewXML: string;
  @ViewChild('reviewXonomy', { static: false }) reviewXonomy;
  @ViewChild('reviewHTML', { static: false }) reviewHTML;

  ngOnInit() {
    this.articleId = this.route.snapshot.params['articleId'];
  }

  async ngAfterViewInit() {
    this.reviewXML = this.xonomyService.getReviewTemplate(this.articleId);
    this.reviewXML = this.xonomyService.addArticleInReviewXML(this.reviewXML, await this.articlesService.getArticleXML(this.articleId).then(result => result['data']));
    this.renderReview();
  }


  handleFileInputReview(event) {
    let reader = new FileReader();
    reader.onload = async (e) => {
      this.reviewXML = reader.result as string;
      this.reviewXML = this.xonomyService.addArticleInReviewXML(this.reviewXML, await this.articlesService.getArticleXML(this.articleId).then(result => result['data']));
      this.renderReview();
    }
    reader.readAsText(event.target.files[0]);
  }

  onReviewChange() {
    this.reviewXML = Xonomy.harvest();
    this.reviewHTML.nativeElement.innerHTML = this.xonomyService.convertReviewXSLT(this.xonomyService.removeArticleFromReview(this.reviewXML));
  }

  renderReview() {
    Xonomy.render(this.reviewXML, this.reviewXonomy.nativeElement, {
      allowModeSwitching: true,
      elements: this.xonomyService.getReviewElements(),
      onchange: () => { this.onReviewChange() }
    });
    console.log(this.xonomyService.removeArticleFromReview(this.reviewXML));
    this.reviewHTML.nativeElement.innerHTML = this.xonomyService.convertReviewXSLT(this.xonomyService.removeArticleFromReview(this.reviewXML));
  }

  async onSubmit() {
    let result: any = await this.reviewsService.addReview(this.xonomyService.removeXMLSpaceAttribute(this.xonomyService.removeArticleFromReview(this.reviewXML)));
    this.snackBar.open(result.status ? result.status : result.message, '', {
      duration: 20000,
    });
  }
}
