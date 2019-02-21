import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { GetDataService } from '../get-data.service'
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sec-iris-week',
  templateUrl: './sec-iris-week.component.html',
  styleUrls: ['./sec-iris-week.component.css']
})
export class SecIrisWeekComponent implements OnInit {
  now
  sectie
  name
  daysModelData
  daysData = []
  rows = []
  weekDays: Array<string> = []

  constructor(private ds: GetDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.now = moment(this.ds.getDate(), 'DD-MM-YYYY')
    this.calculateWeekDays()
    this.findRows()
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    this.ds.getData().subscribe(el=> {
      this.name = el.sectie[this.sectie]
    })
    // this.name = this.ds.getSectieById(this.sectie)
    //this.buildRows()
    
  }

  buildRows(): void {
    /*
       of the week and generates array of row object
  
      Input:
        none
    */
   // Build rows with data for all the days in week
    let  weekRow = []
    this.daysModelData.map(el => {
      let res = []
      // Create row 
      res.push(el.tip, el.produse, el.um, el.material)
      // Append the quantities in order of dates
      for (let i of this.weekDays){
        let action = this.getCantitateByDate(i, el.tip, el.produse, el.um, el.material)
        let s1 = action.cantitate.schimb_1 ? action.cantitate.schimb_1 : 0
        let s2 = action.cantitate.schimb_2 ? action.cantitate.schimb_2 : 0
        let s3 = action.cantitate.schimb_3 ? action.cantitate.schimb_3 : 0
        let total = s1 + s2 + s3
        res.push(s1, s2, s3, total)
      }
      // Calculating week total
      let ts1= 0, ts2 = 0, ts3 = 0, tt = 0
      for (let i = 4; res[i]; i+=4) {ts1 += res[i] }
      for (let i = 5; res[i]; i+=4) {ts2 += res[i] }
      for (let i = 6; res[i]; i+=4) {ts3 += res[i] }
      for (let i = 7; res[i]; i+=4) {tt += res[i] }
      res = [...res, ts1, ts2, ts3, tt]

      weekRow.push(res)
    })

    this.rows = weekRow
  }

  getCantitateByDate(date, tip, produse, um, material) {
    /*
      Returns cantitate array for specified action
  
      Input:
        date, tip, produse, um, material: string
        
      Output:
        object of type {schimb_1: number, schimb_2: number, schimb_3: number}
        
    */

  //  console.log(this.daysData)
   
    let res = _.find(this.daysData, {data: date})

    return res
  }

  findRows() {
    /*
      Finds all the unique action models of the week
  
      Input:
        none
    */
    let ac_models = []
    //Get data for weekdays
    for (let day of this.weekDays){
      let data = this.ds.generateMock("01-01-2000", 5)
      // Append clone to daysData
      this.daysData.push(_.cloneDeep(data))
      // Convert actions to ac_models
      let dayModelData = data.map(el => {
        delete el.cantitate
        delete el.data                
        return el
      })
      ac_models.push(dayModelData)
    }
    // Flatten arrays ac_models and this.daysData
    ac_models = ac_models.reduce((acc, cur) => {
      return acc.concat(cur)
    })
    this.daysData = this.daysData.reduce((acc, cur) => {
      return acc.concat(cur)
    })
    // Eliminate duplicate objects
    let unique_ac_models = _.uniqWith(ac_models, _.isEqual)

    this.daysModelData = _.orderBy(unique_ac_models, ['tip'], ['asc'])
  }

  // Calendar functions

  calculateWeekDays() {
    let days = []
    // Clone this.now
    let day = moment(this.now).day(0)
    for (let i=0; i<6; i++){
      day.add(1, 'day')
      days.push(day.format('DD-MM-YYYY').slice(0,10))
    }
    this.weekDays = days
  }

  backOneWeek() {
    this.now.subtract(7, 'days')
    this.calculateWeekDays()
  }
  
  forwardOneWeek() {
    this.now.add(7, 'days')
    this.calculateWeekDays()
  }

}
