import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  logOut(): void {
    console.log('logging out...')
  }

  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back()
  }

  test(route) {
    this.router.navigate([route])
    
  }

}
