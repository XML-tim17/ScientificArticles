import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponentComponent } from './add-article-component/add-article-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponentComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
