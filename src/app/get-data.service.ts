import { Injectable } from '@angular/core'
import { Action } from './action'
import * as moment from 'moment'
import { AcModel } from './ac-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private date = moment().format('DD-MM-YYYY')
  private template;

  constructor(private http: HttpClient) { }

  generateMock(date, s: number) {
    /*
      Returns a mock array of actions for prototyping
      
      Input: 
        date: date string formatted like 'DD-MM-YYY'
        s: number of actions in the array
      Output: Array with elements of type Action
    */
    let td = this.getTemplateData();
    let parsed_json = []
    for (let i=0;i<s; i++) {
      let t = td.tip[Math.floor(Math.random()*td.tip.length)]
      let p = td.produs[Math.floor(Math.random()*td.produs.length)]
      let m = td.material[Math.floor(Math.random()*td.material.length)]
      let u = td.um[Math.floor(Math.random()*td.um.length)]
      let ac: Action = {
        data: date,
        tip: t,
        produs: p,
        material: m,
        um: 'mc',
        cantitate: {
          schimb_1: 100,
          schimb_2: 200,
          schimb_3: 300,
        },
        coeficient: 0.5
      }
    parsed_json.push(ac)
  }
  // Sort by sort object from getListOrder()
  let order = this.getListOrder()
  let ordered_json = parsed_json.map(el => {
    el['order'] = order[el.tip]
    return el
  })
  ordered_json.sort((a,b) => {return (a.order >= b.order) ? 1 : - 1})

  return ordered_json
  }

  getDate(): string {
    return this.date;
  }

  setDate(date: string): void {
    this.date = date;
  }

  getdataForDate(date: string) {
    /*
      TODO: Get real data instead of mock
    */
    return this.generateMock(date, 5)
  }

  getCurrentTemplate(sectie: string): Array<AcModel> {
    /*
      TODO: Get real data instead of mock
    */
   console.log(this.template)
   
   let res
   if (!this.template) {
     res = this.generateMock('01-01-2019', 6).map((el) => {
       delete el.cantitate
       delete el.data
       return el
     })
   } else {
     res = this.template
   }
    return res
  }

  saveCurrentTemplate(sectie, data): void {
    /*
      Save template to database
  
      Input:
        sectie: string
        data: data to be saved
    */
    this.template = data
    
  }

  getTemplateData() {
    /*
      TODO: get real data
    
      Input:
        
    */
    
    let res = {
      tip: ['intrari', 'presare', 'finisare', 'ambalare', 'predare'],
      produs: ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'],
      um: ['mc', 'ml', 'mp', 'buc', 'set'],
      material: ['stejar', 'fag', 'rasinos', 'altele'],
    }
    return res
  }

  getListOrder() {
    /*
      Key-value pairs for ordering list
  
      Output:
        returns array of objects with {key: number} format
    */
    return {
      intrari: 1,
      presare: 2,
      finisare: 3,
      ambalare: 4,
      predare: 5
    }
  }

  test() {    

    return (this.http.get(
      'http://192.168.0.1:8181/data_get', 
      {responseType: 'json'}))
      .pipe(
        map(el => {
          Object.keys(el)
        })
      )
      
  //   return this.http.post(
  //     'http://192.168.0.1:8181/items',
  //     {'name': 'korte', 'price': 120}, 
  //     {
  //       headers: new HttpHeaders({'Content-Type':  'application/json',}),
  //       responseType: 'text'
  //     }
  //   )
  }
}
