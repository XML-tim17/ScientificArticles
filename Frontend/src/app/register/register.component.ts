import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

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
      }
    }).then(result => {
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }

}
