import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  data;

  constructor(private articleService: ArticlesService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.data = this.sanitizer.bypassSecurityTrustHtml((await this.articleService.getArticle(this.route.snapshot.params.articleId) as any).data);
  }

}
