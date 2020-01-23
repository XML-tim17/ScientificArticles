import { ReviewsService } from './../services/reviews.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private reviewsService: ReviewsService) { }

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
      this.reviewsService.addReview(reader.result as string);
    }

    reader.readAsText(this.file)
    
  }

}
