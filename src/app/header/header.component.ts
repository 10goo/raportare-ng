import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sectii
  
  
  constructor(private location: Location, private router: Router, private ds: GetDataService, public auth: AuthService) {
  }
  
  ngOnInit() {
    this.generateSectiiMenu()
  }

  generateSectiiMenu() {
    // Get sectii and ids
    this.ds.dlData().subscribe((el: {sectie}) => {
      let sectii_all = Object.keys(el.sectie).map(x => {
        return {name: el.sectie[x], id: x}
      })
      this.sectii = sectii_all.filter(el => {
        return this.auth.sectii.find(x => {
          return el.id == x
        })
      })
    })
  }

  logOut(): void {
    this.auth.logOut()
  }

  sectieNav(route) {
    // Routing hack to force refresh component
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
        this.router.navigate([route]))
  }
}
