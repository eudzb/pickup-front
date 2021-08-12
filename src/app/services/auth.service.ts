import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://locahost:3000';

  constructor(private http: HttpClient) {
  }

  signIn(user) {
    return this.http.post(`${this.url}/signin`, user);
  }

  signUp(user) {
    return this.http.post(`${this.url}/signup`, user);
  }
}
