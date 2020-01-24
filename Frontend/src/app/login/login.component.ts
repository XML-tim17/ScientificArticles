import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.email, this.password).then(result => {
      this.router.navigate(['/'])
    }, err => {
      alert(err);
    })
  }

}
