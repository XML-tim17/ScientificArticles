import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-assign-reviewers',
  templateUrl: './assign-reviewers.component.html',
  styleUrls: ['./assign-reviewers.component.css']
})
export class AssignReviewersComponent implements OnInit {

  articleId: any;

  displayedColumns: string[] = ['select', 'email', 'name', 'correspondance'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private reviewsService: ReviewsService,
    private router: Router,
    private authorsService: AuthorsService) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['articleId'];
    this.authorsService.getCorrespondingAuthors(this.articleId).then((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);
    })

  }

  onSubmit() {
    let reviewers = this.selection.selected.map(element => element.email);
    this.reviewsService.assignReviewers(this.articleId, reviewers).then(data => {
      this.router.navigateByUrl('/');
    }, err => {
      alert(err.message);
    })
  }

}
