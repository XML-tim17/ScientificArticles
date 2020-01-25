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
  
  file: File;

  constructor(private articlesService: ArticlesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
  }

  handleFileInput(event) {
    this.file = event.target.files[0]
  }

  onSubmit() {
    let reader = new FileReader;

    reader.onload = (e) => {
      this.articlesService.postRevision(this.articleId, reader.result as string).then(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
    }

    reader.readAsText(this.file)
  }

}
