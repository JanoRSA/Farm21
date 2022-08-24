import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $loggedIn = new BehaviorSubject(false); 

  constructor(private api: ApiService) { }

  login() {
    this.api.post('login', {email: 'assessment@farm21.com', password: '8aCdG2f!*LH#'}).subscribe(data => {
      if (data && data.token) {
        this.setToken(data.token);
        this.$loggedIn.next(true);
      }
    });
  }

  setToken(token: string) {
    const tokenString: string = JSON.stringify(token);
    localStorage.setItem('token', tokenString);
  }

  getAuthorizationToken(): string | null {
    let token = localStorage.getItem('token');
    if (token != null) {
      token = JSON.parse(token);
    }
    return token;
  }
}
