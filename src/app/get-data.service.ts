import { Injectable } from '@angular/core'
import { Action } from './action'
import * as moment from 'moment'
import { AcModel } from './ac-model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private date = moment().format('DD-MM-YYYY')
  private data: Observable<any>

  constructor(private http: HttpClient) { }

  dlData() {
    this.data = this.http.get('http://192.168.0.1:8181/data_get', {responseType: 'json'})
    return this.data
  }

  getData() {
    // Object.keys(this.sectii).find(key => this.sectii[key] === name)
    return this.data
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
        coeficient: 0.5,
        merged: false
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

  reverseDateString(date): string {
    return date.split("-").reverse().join("")
  }

  getdataForDate(date: string, id_sectie: string) {
    /*
      TODO: Get real data instead of mock
    */
   // Convert date string from DD-MM-YYYY template to YYYYMMDD
    date = this.reverseDateString(date)
   // Send request and return Observable
   return this.http.get(
    'http://192.168.0.1:8181/productie_json/' + date + "/" + id_sectie,
    {responseType: 'text'}
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
      responseType: 'text'}
    )
  }

  saveCurrentTemplate(sectie, data): void {
    /*
      Save template to database
  
      Input:
        sectie: string
        data: data to be saved
    */
   const url = 'http://192.168.0.1:8181/template'
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'text',
        'Content-Type':  'application/json',
        // 'responseType': 'text'
      })
    };
    const d = {id: sectie, template: JSON.stringify(data)}

    this.http.post(url, JSON.stringify(d), httpOptions).
    subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    )
  }

  saveTable(sectie, date, data): void {
    /*
      Save template to database
  
      Input:
        sectie: string
        data: data to be saved
    */
   const url = 'http://192.168.0.1:8181/productie_json'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'responseType': 'text'
      })
    };
    const d = {id_sectie: sectie, data: this.reverseDateString(date), productie_json: JSON.stringify(data)}

    this.http.post(url, JSON.stringify(d), httpOptions).
    subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    )
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
      'http://192.168.0.1:8181/data_get', 
      {responseType: 'json'}
      )
  }
}
