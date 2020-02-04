import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { MatSnackBar } from '@angular/material';
import { saveAs as importedSaveAs } from "file-saver";
import beautify from "json-beautify";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: any;

  searchTerm: string;
  searched: boolean;

  constructor(private articlesService: ArticlesService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searched = false;

    this.articlesService.getAll().then(data => {
      this.articles = data;
    });
  }

  doSearch() {
    this.articlesService.quickSearch(this.searchTerm).then((articleList) => {
      this.searched = true;
      this.articles = articleList;
    });
  }

  clearSearch() {
    this.articlesService.getAll().then(data => {
      this.articles = data;
      this.searched = false;
      this.searchTerm = '';
    });
  }

  copyMessage(article) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = article.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBar.open(`Reference copied to clipboard: ${article.id}`, '', {
      duration: 20000,
    });
  }

  getMetadata(articleId) {
    this.articlesService.getMetadata(articleId).then(data => {
      const blob = new Blob([beautify(data, null, 2, 100)], { type: 'text/json' });
      importedSaveAs(blob, 'metadata.json');
    });
  }

}
