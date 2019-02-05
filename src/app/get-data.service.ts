import { Injectable } from '@angular/core'
import { Action } from './action'
import * as moment from 'moment'
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private date = moment().format('DD-MM-YYYY')

  constructor() { }

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
          coeficient: 0
        }
        
        parsed_json.push(ac)
      }
  // Sort by tip
  parsed_json.sort((a,b) => {return (a.tip <= b.tip) ? 1 : - 1})

  return parsed_json
  }

  getDate(): string {
    return this.date;
  }

  setDate(date: string): void {
    this.date = date;
  }

  getdataForDate(date: string) {
    /*
      TODO: Recieve real data instead of mock
    */
    return this.generateMock(date, 6)
  }

  getCurrentTemplate(sectie: string): Array<Action> {
    /*
      TODO: Recieve real data instead of mock
    */

    
    return []
  }

  getTemplateData() {
    let res = {
      tip: ['intrari', 'presare', 'finisare', 'ambalare', 'predare'],
      produs: ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'],
      um: ['mc', 'ml', 'mp', 'buc', 'set'],
      material: ['stejar', 'fag', 'rasinos', 'altele'],
    }
    return res
  }
}
