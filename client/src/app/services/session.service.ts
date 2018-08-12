import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private http: Http) {}

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`/signup`, user).pipe(map(res => res.json()));
  }

  login(user) {
    return this.http.post(`/login`, user).pipe(map(res => res.json()));
  }

  logout() {
    return this.http.post(`/logout`, {}).pipe(map(res => res.json()));
  }

  isLoggedIn() {
    return this.http.get(`/loggedin`).pipe(map(res => res.json()));
  }

  getPrivateData() {
    return this.http.get(`/private`).pipe(map(res => res.json()));
  }
}
