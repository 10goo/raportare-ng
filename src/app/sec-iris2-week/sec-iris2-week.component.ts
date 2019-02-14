import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { GetDataService } from '../get-data.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-sec-iris2-week',
  templateUrl: './sec-iris2-week.component.html',
  styleUrls: ['./sec-iris2-week.component.css']
})
export class SecIris2WeekComponent implements OnInit {
  now
  daysData
  rows
  weekDays: Array<string> = []

  constructor(private ds: GetDataService) { }

  ngOnInit() {
    this.now = moment(this.ds.getDate(), 'DD-MM-YYYY')
    this.calculateWeekDays()
    this.findRows()
  }

  buildRows(): void {
    /*
       of the week and generates array of row object
  
      Input:
        none
    */
   // Build rows with data for all the days in week
    this.rows = this.findRows().map(el => {
      
    })
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
      this.daysData = this.ds.getdataForDate(day)
      // Convert actions to ac_models
      let dayModelData = this.daysData.map(el => {
        delete el.cantitate
        delete el.data                
        return el
      })
      ac_models.push(dayModelData)
    }
    // Flatten array
    ac_models = ac_models.reduce((acc, cur) => {
      return acc.concat(cur)
    })
    // Eliminate duplicate objects
    let unique_ac_models = _.uniqWith(ac_models, _.isEqual)
    console.log(_.sortBy(unique_ac_models, ['tip', 'produs']))
    return unique_ac_models
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
