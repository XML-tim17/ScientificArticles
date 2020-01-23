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

  handleFileInput(event) {
    this.file = event.target.files[0]
  }

  async onSubmit() {
    console.log(this.file)

    
    let reader = new FileReader;

    reader.onload = (e) => {
      this.articlesService.addArticle(reader.result as string);
    }

    reader.readAsText(this.file)
    
  }

}
