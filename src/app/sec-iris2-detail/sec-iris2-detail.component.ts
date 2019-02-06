import { Component, OnInit } from '@angular/core'
import { GetDataService } from '../get-data.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-sec-iris2-detail',
  templateUrl: './sec-iris2-detail.component.html',
  styleUrls: ['./sec-iris2-detail.component.css']
})
export class SecIris2DetailComponent implements OnInit {
  actions
  date: string

  constructor(private ds: GetDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get date/id
    this.date = this.route.snapshot.paramMap.get('data')
    // Update the date in the service
    this.ds.setDate(this.date)
    // Populate table
    this.actions = this.ds.getdataForDate(this.date)
  }

  saveTable(): void {    
    console.log('saving table...')
  }
  

  recalculate(ac): void {
    console.log('changed: ' + ac.cantitate.schimb_1)
  }
}
