import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-article-component',
  templateUrl: './add-article-component.component.html',
  styleUrls: ['./add-article-component.component.css']
})
export class AddArticleComponentComponent implements OnInit {

  constructor(private articlesService: ArticlesService) { }

  articleFile: File;
  coverLetterFile: File;

  ngOnInit() {
  }

  handleFileInput(event) {
    this.articleFile = event.target.files[0]
  }
  
  handleFileInput2(event) {
    this.coverLetterFile = event.target.files[0]
  }

  async onSubmit() {
    if (!this.articleFile && !this.coverLetterFile) {
      alert("Select both article and cover letter please.")
      return;
    }

    
    let reader = new FileReader();
    
    let reader2 = new FileReader();


    reader2.onload = (e) => {
      this.articlesService.addArticle(reader.result as string, reader2.result as string);
      // add toaster
    }

    reader.onload = (e) => {
      reader2.readAsText(this.coverLetterFile);
    }

    reader.readAsText(this.articleFile)
    
  }

}
