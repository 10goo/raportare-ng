import { Injectable } from '@angular/core'
import { Action } from './action'
import * as moment from 'moment'
import { AcModel } from './ac-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { provideRoutes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private date = moment().format('DD-MM-YYYY')
  private sectii;

  constructor(private http: HttpClient) { }

  dlSectii() {
    this.http.get('http://192.168.0.1:8181/data_get/', {responseType: 'json'})
      .subscribe((el: {sectie}) => {
        this.sectii = Object.keys(el.sectie).map(el2 => 
          {
            let x = {
              name: el.sectie[el2],
              id: el2
            }
            return x
          }
        ) 
      })
  }

  getSectii() {
    // Object.keys(this.sectii).find(key => this.sectii[key] === name)
    return this.sectii
  }

  getSectieById(id): string {
    return this.sectii.filter((el) => {
      return el.id == id
    })
  } 

  generateMock(date, s: number) {
    /*
      Returns a mock array of actions for prototyping
      
      Input: 
        date: date string formatted like 'DD-MM-YYY'
        s: number of actions in the array
      Output: Array with elements of type Action
    */
    let td = {
      tip: ['intrari', 'presare', 'finisare', 'ambalare', 'predare'],
      produse: ['proppmatt', 'alvaret', 'torsklint', 'listerby', 'burfjord'],
      um: ['mc', 'ml', 'mp', 'buc', 'set'],
      material: ['stejar', 'fag', 'rasinos', 'altele'],
    }
    let parsed_json = []
    for (let i=0;i<s; i++) {
      let t = td.tip[Math.floor(Math.random()*td.tip.length)]
      let p = td.produse[Math.floor(Math.random()*td.produse.length)]
      let m = td.material[Math.floor(Math.random()*td.material.length)]
      let u = td.um[Math.floor(Math.random()*td.um.length)]
      let ac: Action = {
        data: date,
        tip: t,
        produse: p,
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

  getdataForDate(date: string, id_sectie: string) {
    /*
      TODO: Get real data instead of mock
    */
   // Convert date string from DD-MM-YYYY template to YYYYMMDD
   let a = date.split("-")
   date = a[2] + a[1] + a[0]
   // Send request and return Observable
   return this.http.get(
    'http://192.168.0.1:8181/productie_json/' + date + "/" + id_sectie, 
    {responseType: 'json'}
    )
    // return this.generateMock(date, 5)
  }

  getCurrentTemplate(id_sectie: string) {
    /*
      Get the current template for the given factory

      Input:
        id_sectie: string
      Output:
        Observable with template object
    */
  
   return this.http.get(
    'http://192.168.0.1:8181/template/' + id_sectie, 
    {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
      responseType: 'json'}
    )
  }

  saveCurrentTemplate(sectie, data): void {
    /*
      Save template to database
  
      Input:
        sectie: string
        data: data to be saved
    */
    console.log(sectie, data)
    
  }

  getTemplateData() {
    /*
      Get all the options for creating selects for AcModel parameters
    
      Input:
        none
      Output:
        Observable of templates object
        
    */
   return this.http.get(
    'http://192.168.0.1:8181/data_get', 
    {responseType: 'json'}
    )
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

  test(id_sectie) {
    return this.http.get(
      'http://192.168.0.1:8181/template/1', 
      {responseType: 'json'}
      )
  }
}
