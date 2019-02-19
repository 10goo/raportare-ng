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
  unique_tip
  date: string

  constructor(private ds: GetDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get date/id
    this.date = this.route.snapshot.paramMap.get('data')
    // Update the date in the service
    this.ds.setDate(this.date)
    // Populate table
    this.ds.getdataForDate(this.date, '1').subscribe((el: {productie: Array<any>}) => {
      this.actions = []
      el.productie.map(x => this.actions.push((x)))
      this.unique_tip = new Set(this.actions.map(item => item.tip))
      console.log(this.actions)
      
    })
    //this.actions = this.ds.getdataForDate(this.date, "1")
    // Get unique values for categorization
  }

  saveTable(): void {    
    console.log('saving ...')
  }

  getAcByTip(tip: string) {
    return this.actions.filter(el => el.tip == tip)
  }

  recalculate(ac): void {
    console.log('changed: ' + ac.cantitate.schimb_1)
  }
}
