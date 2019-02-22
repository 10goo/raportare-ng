import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sectii
  
  logOut(): void {
    console.log('logging out...')
  }

  constructor(private location: Location, private router: Router, private ds: GetDataService) {
  }

  ngOnInit() {
    // Get sectii and ids
    this.ds.dlData().subscribe((el: {sectie}) => {
      this.sectii = Object.keys(el.sectie).map(x => {
        return {name: el.sectie[x], id: x}
      })
    })
   }

   navigate(id) {
     console.log(id)
     this.router.navigate(['iris-week/'+id])
   }

  goBack(): void {
    this.location.back()
  }

}
