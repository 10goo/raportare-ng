import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$
  canEdit$
  isAdmin$


  constructor() { }

  loginWithEmailPassword(email: string, password: string) {
    this.isLoggedIn$ = Observable.create((subscriber) => {subscriber.next(true)})
    this.canEdit$ = Observable.create((subscriber) => {subscriber.next(true)})
    this.isAdmin$ = Observable.create((subscriber) => {subscriber.next(true)})
  }
}
