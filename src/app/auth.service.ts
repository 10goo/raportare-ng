import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true
  canEdit = true
  isAdmin = true
  level = 3
  sectii = ['1','2','3','4','5','6','7','8','9']
  // isLoggedIn = false
  // canEdit = false
  // isAdmin = false
  // level = 0
  // sectii = []

  constructor(private http: HttpClient, private router: Router) { }

  loginWithEmailPassword(email: string, password: string): Observable<any> {
    const url = 'http://192.168.0.1:8181/login'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const d = {email: email, password: password}

    return this.http.post(url, JSON.stringify(d), httpOptions)
      .pipe(
        map((el: Array<any>) => {
        // Set auth service properties
        if (el.length > 0) {
          if (el[0].access >= 1) this.isLoggedIn = true
          if (el[0].access >= 2) this.canEdit = true
          if (el[0].access >= 3) this.isAdmin = true
          this.sectii = el[0].sectie.split(",")
          this.level = el[0].access
        }
        // Return properties for login
        return {
          isLoggedIn: this.isLoggedIn,
          canEdit: this.canEdit,
          isAdmin: this.isAdmin,
          sectii: this.sectii
        }
      })
      )
    
  }

  logOut() {
    // Reset properties to initial values
    this.isLoggedIn = false
    this.canEdit = false
    this.isAdmin = false
    this.sectii = []
    this.level = 0
    // Navigate to login page
    this.router.navigate(['login'])
  }
}
