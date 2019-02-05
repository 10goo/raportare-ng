import { Injectable } from '@angular/core';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor() { }

  generateMock(date, s: number) {
    let parsed_json = []
    for (let i=0;i<s; i++) {
      let t = ['intrari', 'presare', 'finisare', 'ambalare', 'predare'][Math.floor(Math.random()*5)]
      let p = ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'][Math.floor(Math.random()*5)]
      let m = ['stejar', 'fag'][Math.floor(Math.random()*2)]
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

  getdataForDate(date: string) {
    return this.generateMock(date, 6)
  }

  getCurrentTemplate(sectie: string): Array<Action> {
    
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
