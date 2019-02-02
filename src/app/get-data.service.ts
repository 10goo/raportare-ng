import { Injectable } from '@angular/core';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor() { }

  generateMock(s: number) {
    let parsed_json = []
    for (let i=0;i<s; i++) {
      let date = '29-01-2019'
      let t = ['intrari', 'presare', 'finisare', 'ambalare', 'predare'][Math.floor(Math.random()*5)]
      let p = ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'][Math.floor(Math.random()*5)]
      let m = ['stejar', 'fag'][Math.floor(Math.random()*2)]
      let ac: Action = {
          data: date,
          tip: t,
          produs: p,
          material: m,
          cantitate: {
            schimb_1: 100,
            schimb_2: 200,
            schimb_3: 300,
          }
        }
        
        parsed_json.push(ac)
      }
  // Sort by tip
  parsed_json.sort((a,b) => {return (a.tip <= b.tip) ? 1 : - 1})    

  return parsed_json
  }
}
