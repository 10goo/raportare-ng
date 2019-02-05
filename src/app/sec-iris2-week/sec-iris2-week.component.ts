import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sec-iris2-week',
  templateUrl: './sec-iris2-week.component.html',
  styleUrls: ['./sec-iris2-week.component.css']
})
export class SecIris2WeekComponent implements OnInit {
  now = moment()
  weekDays = []

  constructor() { }

  ngOnInit() {
    this.calculateWeekDays()
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
