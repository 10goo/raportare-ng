import { Injectable } from '@angular/core';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor() { }

  generateMock() {
    let parsed_json = {}
    for (let i=0;i<7; i++) {
      let key = '2019-01-2' + i
      let t = ['intrari', 'presare', 'finisare', 'ambalare', 'predare'][Math.floor(Math.random()*5)]
      let p = ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'][Math.floor(Math.random()*5)]
      let m = ['stejar', 'fag'][Math.floor(Math.random()*2)]
      let ac: Action = {
          tip: t,
          produs: p,
          material: m,
          cantitate: {
            schimb_1: 100,
            schimb_2: 200,
            schimb_3: 300,
          }
        }        
      
      parsed_json = Object.assign({key: ac}, parsed_json)
    }
  }
}
