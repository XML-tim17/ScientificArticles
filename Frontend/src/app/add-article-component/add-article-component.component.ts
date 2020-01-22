import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-article-component',
  templateUrl: './add-article-component.component.html',
  styleUrls: ['./add-article-component.component.css']
})
export class AddArticleComponentComponent implements OnInit {

  constructor(private articlesService: ArticlesService) { }

  file: File;

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  onSubmit() {
    
    let reader = new FileReader;
    let xmlString = '';

    reader.onload = (e) => {
      xmlString = reader.result as string;
    }

    reader.readAsText(this.file);
    
    this.articlesService.addArticle(xmlString);
  }

}
