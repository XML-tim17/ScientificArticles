import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-revision',
  templateUrl: './post-revision.component.html',
  styleUrls: ['./post-revision.component.css']
})
export class PostRevisionComponent implements OnInit {

  articleId: any;
  
  articleFile: File;
  coverLetterFile: File;


  constructor(private articlesService: ArticlesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
  }

  handleFileInput(event) {
    this.articleFile = event.target.files[0]
  }
  
  handleFileInput2(event) {
    this.coverLetterFile = event.target.files[0]
  }


  onSubmit() {
    let reader = new FileReader();
    
    let reader2 = new FileReader();


    reader2.onload = (e) => {
      this.articlesService.postRevision(this.articleId, reader.result as string, reader2.result as string).then(data => {
        console.log(data);
      }, err => {
        alert(err);
      })
    }

    
    reader.onload = (e) => {
      reader2.readAsText(this.coverLetterFile);
    }

    reader.readAsText(this.articleFile)
  }

}
