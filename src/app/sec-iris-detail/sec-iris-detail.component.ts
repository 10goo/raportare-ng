import { Component, OnInit } from '@angular/core'
import { GetDataService } from '../get-data.service'
import { ActivatedRoute } from '@angular/router'
import {Location} from '@angular/common';

@Component({
  selector: 'app-sec-iris-detail',
  templateUrl: './sec-iris-detail.component.html',
  styleUrls: ['./sec-iris-detail.component.css']
})
export class SecIrisDetailComponent implements OnInit {
  actions
  unique_tip
  date: string
  sectie
  name

  constructor(private ds: GetDataService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    // Get date and sectie id
    this.date = this.route.snapshot.paramMap.get('data')
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    // Get sectie name
    this.ds.getData().subscribe(el=> {
      this.name = el.sectie[this.sectie]
    })
    // Update the date in the service
    this.ds.setDate(this.date)
    // Populate table
    this.ds.getdataForDate(this.date, this.sectie).subscribe((el) => {
      // Remove backslashes from string
      el = el.replace(/\\/g, "")
      this.actions = JSON.parse(el)
      // If no data is available for the date, build empty rows from template
      if (this.actions.length < 1){
        this.ds.getCurrentTemplate(this.sectie).subscribe(x => {
          x = x.replace(/\\/g, "")
          this.actions = JSON.parse(x).map(y => {
            y['date'] = this.date
            y['cantitate'] = {
              schimb_1: 0,
              schimb_2: 0,
              schimb_3: 0
            }
            return y
          })
          // Get unique values for categorization
          this.unique_tip = new Set(this.actions.map(item => item.tip))
        })
      }
      // Get unique values for categorization
      this.unique_tip = new Set(this.actions.map(item => item.tip))
    })
  }

  saveTable(): void {    
    this.ds.saveTable(this.sectie, this.date, this.actions)
    this.location.back()
  }

  getAcByTip(tip: string) {
    return this.actions.filter(el => el.tip == tip)
  }

  recalculate(ac): void {
    console.log('changed: ' + ac.cantitate.schimb_1)
  }

}
