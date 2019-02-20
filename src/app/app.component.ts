import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sectii
  
  logOut(): void {
    console.log('logging out...')
  }

  constructor(private location: Location, private router: Router, private ds: GetDataService) {
    this.test()
    // Get sectii and ids
    this.ds.dlSectii()
    this.sectii = this.ds.getSectii()
   }

  goBack(): void {
    this.location.back()
  }

  test() {
    this.ds.test(1).subscribe(el => {
      console.log(typeof(el), el)
    })
  }

}
