import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  institution: string;
  phoneNumber: string;
  city: string;
  country: string;
  keywords: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.password != this.confirmPassword) {
      alert("Password do not match");
      return;
    }

    this.authenticationService.register({
      email: this.email,
      password: this.password,
      name: this.name,
      institution: this.institution,
      phoneNumber: this.phoneNumber,
      address: {
        city: this.city,
        country: this.country
      },
      keywords: this.keywords
    }).then(result => {
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

}
