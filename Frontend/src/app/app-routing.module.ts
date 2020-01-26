import { RevisionRecievedComponent } from './revision-recieved/revision-recieved.component';
import { ReviewedComponent } from './reviewed/reviewed.component';
import { ToBeReviewedComponent } from './to-be-reviewed/to-be-reviewed.component';
import { AssignReviewersComponent } from './assign-reviewers/assign-reviewers.component';
import { PostRevisionComponent } from './post-revision/post-revision.component';
import { ToReviewComponent } from './to-review/to-review.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddArticleComponentComponent } from './add-article-component/add-article-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyArticlesComponent} from './my-articles/my-articles.component';
import {ArticleViewComponent} from './article-view/article-view.component';
import {ArticleViewPdfComponent} from './article-view-pdf/article-view-pdf.component';
import {ReviewsViewPdfComponent} from './reviews-view-pdf/reviews-view-pdf.component';
import {ReviewsViewComponent} from './reviews-view/reviews-view.component';
import {ForNedimovicComponent} from './for-nedimovic/for-nedimovic.component';
import {HomeComponent} from './home/home.component';
import {CoverLetterViewComponent} from './cover-letter-view/cover-letter-view.component';
import {CoverLetterViewPdfComponent} from './cover-letter-view-pdf/cover-letter-view-pdf.component';


const routes: Routes = [
  { path: 'addArticle', component: AddArticleComponentComponent},
  { path: 'addReview/:articleId', component: AddReviewComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'toReview', component: ToReviewComponent},
  { path: 'postRevision/:id', component: PostRevisionComponent},
  { path: 'myArticles', component: MyArticlesComponent},
  { path: 'article/:articleId', component: ArticleViewComponent},
  { path: 'articlePdf/:articleId', component: ArticleViewPdfComponent},
  { path: 'coverLetter/:articleId', component: CoverLetterViewComponent},
  { path: 'coverLetterPdf/:articleId', component: CoverLetterViewPdfComponent},
  { path: 'reviewPdf/:articleId', component: ReviewsViewPdfComponent},
  { path: 'review/:articleId', component: ReviewsViewComponent},
  { path: 'waitingForNedimovic', component: ForNedimovicComponent},
  { path: 'toBeReviewed', component: ToBeReviewedComponent},
  { path: 'assignReviewers/:articleId', component: AssignReviewersComponent},
  { path: 'reviewed', component: ReviewedComponent},
  { path: 'revisionRecieved', component: RevisionRecievedComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
