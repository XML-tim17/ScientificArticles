import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable(); 
  }

  register(user: any) {
    return this.http.post<any>(`${environment.apiEndpoint}users/register`, user).toPromise();
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiEndpoint}users/login`, { email, password })
        .pipe(map(response => {
            // login successful if there's a jwt token in the response
            let user;
            if (response && response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user = jwt_decode(response.token);
                user.token = response.token;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }
            return null;
        })).toPromise();
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
  
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
}
