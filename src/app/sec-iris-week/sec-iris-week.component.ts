import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { GetDataService } from '../get-data.service'
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, reduce, distinct, filter } from 'rxjs/operators';
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
  rows
  weekDays: Array<string> = []
  unique_tip

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
  }

  ngOnDestroy() {
    // console.log('week destroyed')
  }

  buildRows(daysModelData, daysData) {
    /*
       of the week and generates array of row object
    */
   // Build rows with data for all the days in week
    let weekRows = []
    let randamentRows = []
    daysModelData.map(el => {
      let res = []
      // Create row
      res.push(el.merged, el.tip, el.produse, el.um, el.material)
      // Append the quantities in order of dates
      for (let date of this.weekDays){
        let action = this.getCantitateByDate(daysData, date, el.tip, el.produse, el.um, el.material)

        let s1 = action.cantitate.schimb_1 ? action.cantitate.schimb_1 : 0
        let s2 = action.cantitate.schimb_2 ? action.cantitate.schimb_2 : 0
        let s3 = action.cantitate.schimb_3 ? action.cantitate.schimb_3 : 0
        let total = s1 + s2 + s3
        res.push(Math.round(s1 * 100) /100, Math.round(s2 * 100) /100, Math.round(s3 * 100) /100, Math.round(total * 100) /100)
      }
      // Calculating week total
      let ts1= 0, ts2 = 0, ts3 = 0, tt = 0
      for (let i = 5; res[i]; i+=4) {ts1 += res[i] }
      for (let i = 6; res[i]; i+=4) {ts2 += res[i] }
      for (let i = 7; res[i]; i+=4) {ts3 += res[i] }
      for (let i = 8; res[i]; i+=4) {tt += res[i] }
      res = [...res, Math.round(ts1*100)/100, Math.round(ts2*100)/100, Math.round(ts3*100)/100, Math.round(tt*100)/100]
      
      el.r_in ? res.push(el.r_in) : res.push(0)
      el.r_out ? res.push(el.r_out) : res.push(0)

      weekRows.push(res)

    })
    randamentRows = _.cloneDeep(weekRows).filter(el=> {
      // console.log(el[34] != 0)
      return el[33] != 0
    }).map(el2 => { 
      el2[1] = 'Randament'
      return el2
    })

    randamentRows.map(el => {
      randamentRows.reduce((acc, val) => {
        console.log(el[33], val[33])
        if (val[33] == el[33]) {
          for (let i=5; i<val.length; i++) {
            acc[i] += val[i]
          }
          return acc
        }
      })


      // Remove elements which are already added
      // _.remove(randamentRows, (x) => {
      //   return x[33] == el[33]
      // })
    })

    console.log(randamentRows) 

    return [...weekRows, ...randamentRows]
    // _.sortBy(weekRows, [0, 1]) // Sort result array by tip(primary criteria) and produs(secondary criteria)  
  }
  
  // findRows() {
  //   /*
  //     Finds all the unique action models of the week
  //   */
  //   //Get data for weekdays
  //   this.rows$ = this.ds.getdataForWeek(
  //     this.weekDays[0],
  //     this.route.snapshot.paramMap.get('sectie')
  //   )
  //     .pipe(
  //       map((el: Array<any>) => {
  //         el = el.map(x => {
  //           if (x[0]){
  //             return JSON.parse(x[0])
  //           } else {
  //             return []
  //           }
  //         })
  //         // Convert actions to ac_models
  //         let ac_models = []
  //         let days = []
  //         for (let day of el) {
  //           day.map(x => {
  //             days.push(_.cloneDeep(x))
  //             delete x.cantitate
  //             delete x.date                
  //             return x
  //           })
  //           ac_models.push(day)
  //         }
    
  //         // Flatten arrays ac_models and this.daysData
  //         ac_models = ac_models.reduce((acc, cur) => {
  //           return acc.concat(cur)
  //         })
  //         // Eliminate duplicate objects
  //         let unique_ac_models = _.uniqWith(ac_models, _.isEqual)
  //         // Get unique values for categorization
  //         let unique_tip = new Set(unique_ac_models.map(item => item.tip))
    
  //         this.daysData = days
  //         this.daysModelData = unique_ac_models

  //         // Build rows
  //         return this.buildRows(unique_ac_models, days)
  //       })
  //     )

  //     // Create tip category headers
  //     this.rows$.subscribe(el => {
  //       this.unique_tip = new Set(el.map(x=> x[1]))
  //     })
  // }

  findRows() {
    /*
      Finds all the unique action models of the week
    */
    //Get data for weekdays
    this.ds.getdataForWeek(
      this.weekDays[0],
      this.route.snapshot.paramMap.get('sectie')
    )
      .pipe(
        map((el: Array<any>) => {
          el = el.map(x => {
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
          // Get unique values for categorization
          let unique_tip = new Set(unique_ac_models.map(item => item.tip))
    
          this.daysData = days
          this.daysModelData = unique_ac_models

          // Build rows
          return this.buildRows(unique_ac_models, days)
        })
      ).subscribe(el => {
        this.rows = el
        // Create tip category headers
        this.unique_tip = new Set(el.map(x=> x[1]))
      })

  }

  getCantitateByDate(daysData, date, tip, produs, um, material) {
    /*
      Returns cantitate array for specified action
    */
    let res = _.find(daysData, {date: date, tip: tip, produse: produs, um: um, material: material})
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

  rowsByTip(tip) {
    return this.rows.filter(el => el[1] === tip)
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
