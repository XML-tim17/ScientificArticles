
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

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponentComponent,
    AddReviewComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ToReviewComponent,
    PostRevisionComponent
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
