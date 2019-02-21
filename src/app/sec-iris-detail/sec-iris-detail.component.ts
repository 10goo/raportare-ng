import { Component, OnInit } from '@angular/core'
import { GetDataService } from '../get-data.service'
import { ActivatedRoute } from '@angular/router'

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

  constructor(private ds: GetDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get date and sectie id
    this.date = this.route.snapshot.paramMap.get('data')
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    // Update the date in the service
    this.ds.setDate(this.date)
    // Populate table
    this.ds.getdataForDate(this.date, '1').subscribe((el: {productie: Array<any>}) => {
      this.actions = []
      el.productie.map(x => this.actions.push((JSON.parse(x))))
      this.unique_tip = new Set(this.actions.map(item => item.tip))
      console.log("el: "  + el)
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
