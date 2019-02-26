import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { GetDataService } from '../get-data.service'
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sec-iris-week',
  templateUrl: './sec-iris-week.component.html',
  styleUrls: ['./sec-iris-week.component.css']
})
export class SecIrisWeekComponent implements OnInit {
  now
  sectie$: Observable<any>
  name$
  daysModelData
  daysData
  rows = []
  weekDays: Array<string> = []

  constructor(private ds: GetDataService, private route: ActivatedRoute) {
    this.now = moment(this.ds.getDate(), 'DD-MM-YYYY')
   }

  ngOnInit() {
    this.calculateWeekDays()
    this.sectie$ = this.route.paramMap.pipe(map(el => el.get('sectie')))
    this.name$ = this.route.paramMap.pipe(switchMap(params =>{
      return this.ds.getData().pipe(map(x => {
        return x.sectie[params.get('sectie')]
      }))
    }))
    this.findRows()
    // this.buildRows()
    // this.ds.getData().subscribe(el=> {
    //   this.name = el.sectie[this.sectie]
    // })
    // this.name = this.ds.getSectieById(this.sectie)
    
  }

  buildRows(): void {
    /*
       of the week and generates array of row object
    */
   // Build rows with data for all the days in week
    let weekRow = []
    this.daysModelData.map(el => {
      let res = []
      // Create row 
      res.push(el.merged, el.tip, el.produse, el.um, el.material)
      // Append the quantities in order of dates
      for (let date of this.weekDays){
        let action = this.getCantitateByDate(date, el.tip, el.produse, el.um, el.material)
        // console.log('params: ', date, el.tip, el.produse, el.um, el.material)
        // console.log('action: ', action)
        // console.log('find :', _.find(this.daysData, {data: date, tip: el.tip, produse: el.produse, material: el.material, um: el.um,}))

        let s1 = action.cantitate.schimb_1 ? action.cantitate.schimb_1 : 0
        let s2 = action.cantitate.schimb_2 ? action.cantitate.schimb_2 : 0
        let s3 = action.cantitate.schimb_3 ? action.cantitate.schimb_3 : 0
        let total = s1 + s2 + s3
        res.push(s1, s2, s3, total)
      }
      // Calculating week total
      let ts1= 0, ts2 = 0, ts3 = 0, tt = 0
      for (let i = 5; res[i]; i+=4) {ts1 += res[i] }
      for (let i = 6; res[i]; i+=4) {ts2 += res[i] }
      for (let i = 7; res[i]; i+=4) {ts3 += res[i] }
      for (let i = 8; res[i]; i+=4) {tt += res[i] }
      res = [...res, ts1, ts2, ts3, tt]
      
      weekRow.push(res)
    })
    
    this.rows = weekRow
    console.log(weekRow)
  }
  
  findRows() {
    /*
      Finds all the unique action models of the week
    */
    //Get data for weekdays
    this.daysData = this.ds.getdataForWeek(
      this.weekDays[0],
      this.route.snapshot.paramMap.get('sectie')
    )
    .subscribe((el: Array<any>)=> {
      el = el.map(x=> {
        if (x[0]){
          return JSON.parse(x[0])
        } else {
          return []
        }
      })
      // Convert actions to ac_models
      let ac_models = []
      let days = []
      for (let day of el) {
        day.map(x => {
          days.push(_.cloneDeep(x))
          delete x.cantitate
          delete x.date                
          return x
        })
        ac_models.push(day)
      }

      // Flatten arrays ac_models and this.daysData
      ac_models = ac_models.reduce((acc, cur) => {
        return acc.concat(cur)
      })
      // Eliminate duplicate objects
      let unique_ac_models = _.uniqWith(ac_models, _.isEqual)

      this.daysData = days
      this.daysModelData = unique_ac_models
      this.buildRows()
    })
    
  }

  // findRows() {
  //   /*
  //     Finds all the unique action models of the week
  //   */
  //   let ac_models = []
  //   //Get data for weekdays
  //   for (let day of this.weekDays){
  //     let data = this.ds.generateMock("01-01-2000", 5)
  //     // Append clone to daysData
  //     this.daysData.push(_.cloneDeep(data))
  //     // Convert actions to ac_models
  //     let dayModelData = data.map(el => {
  //       delete el.cantitate
  //       delete el.data                
  //       return el
  //     })
  //     ac_models.push(dayModelData)
  //   }
  //   // Flatten arrays ac_models and this.daysData
  //   ac_models = ac_models.reduce((acc, cur) => {
  //     return acc.concat(cur)
  //   })
  //   this.daysData = this.daysData.reduce((acc, cur) => {
  //     return acc.concat(cur)
  //   })
  //   // Eliminate duplicate objects
  //   let unique_ac_models = _.uniqWith(ac_models, _.isEqual)

  //   this.daysModelData = _.orderBy(unique_ac_models, ['tip'], ['asc'])
  //   console.log(this.daysModelData)
  // }

  getCantitateByDate(date, tip, produs, um, material) {
    /*
      Returns cantitate array for specified action
    */
    let res = _.find(this.daysData, {date: date, tip: tip, produse: produs, um: um, material: material})
    if (res){
      return res
    } else {
      return {date: date, tip: tip, produse: produs, um: um, material: material, cantitate: {
        schimb_1: 0,
        schimb_2: 0,
        schimb_3: 0,
      }}
    }
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
    this.ngOnInit()
  }
  
  forwardOneWeek() {
    this.now.add(7, 'days')
    this.calculateWeekDays()
    this.ngOnInit()
  }

}
