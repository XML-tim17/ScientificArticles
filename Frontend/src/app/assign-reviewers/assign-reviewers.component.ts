import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-assign-reviewers',
  templateUrl: './assign-reviewers.component.html',
  styleUrls: ['./assign-reviewers.component.css']
})
export class AssignReviewersComponent implements OnInit {

  articleId: any;

  displayedColumns: string[] = ['select', 'email', 'name'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private reviewsService: ReviewsService,
    private router: Router) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['articleId'];
    this.userService.getAll().then((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.users);
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
