import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithEmailPassword(this.username, this.password).subscribe(el => {
      if (el.isLoggedIn) this.router.navigate(['/iris-week/' + el.sectii[0]])
    })
    this.username = ''
    this.password = ''
  }
}
