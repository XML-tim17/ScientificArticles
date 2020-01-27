import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  private searchForm: FormGroup;
  private articles: any = [];

  constructor(private fb: FormBuilder, private articlesService: ArticlesService) {
    this.searchForm = this.fb.group({
      'abstract': [''],
      'author': [''],
      'headline': [''],
      'keywords': [''],
      'dateCreated': [''],
      'datePublished': [''],
    });
  }

  ngOnInit() {
  }


  doSearch() {
    this.articlesService.advancedSearch(this.searchForm.value).then((articleList) => {
      this.articles = articleList;
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.articles = [];
  }

}
