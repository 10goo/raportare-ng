import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true
  canEdit = true
  isAdmin
  sectii = ['1', '2', '7']


  constructor() { }

  loginWithEmailPassword(email: string, password: string): Observable<any> {
    let obs$ =  Observable.create((subscriber) => {subscriber.next({
      isLoggedIn: true,
      canEdit: true,
      isAdmin: true,
      sectii: ['1', '2', '7']
    })})
    console.log(typeof(obs$))
    
    return obs$

    
  }
}
