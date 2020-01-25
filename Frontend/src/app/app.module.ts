
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponentComponent } from './add-article-component/add-article-component.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddReviewComponent } from './add-review/add-review.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ToReviewComponent } from './to-review/to-review.component';
import { PostRevisionComponent } from './post-revision/post-revision.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { SafePipe } from './pipes/safe.pipe';
import { ArticleViewPdfComponent } from './article-view-pdf/article-view-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponentComponent,
    AddReviewComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ToReviewComponent,
    PostRevisionComponent,
    MyArticlesComponent,
    ArticleViewComponent,
    SafePipe,
    ArticleViewPdfComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
