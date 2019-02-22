import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { AcModel } from '../ac-model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  sectie: string
  keys
  newActionTemplate = new AcModel()
  currentTemplates

  constructor(private route: ActivatedRoute, private ds: GetDataService, private location: Location) { 
    
  }
  
  ngOnInit() {
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    this.getKeys()
    this.getCurrentTemplate(parseInt(this.sectie))
  }

  getKeys() {
    this.ds.getTemplateData().subscribe((el) => {
      this.keys = el

    })
  }

  getCurrentTemplate(id_sectie){
    this.ds.getCurrentTemplate(id_sectie).subscribe(el => {
      el = el.replace(/\\/g, "")
      this.currentTemplates = JSON.parse(el)
      console.log(el)
    })
  }

  addAc(): void {
    /*
      Adds new action into current templates array
    */
    this.currentTemplates.push(this.newActionTemplate)
    // Reset newActionTemplate
    this.newActionTemplate = new AcModel()
  }

  removeAc(i: number): void {
    /*
      Removes action with index number i from currentTemplates
    
      Input:
        i: number
    */
   console.log(i)
    this.currentTemplates.splice(i,1)
  }

  saveTemplate(): void {
    /*
      Send Template to Getdataservice forsaving   
    */
    this.ds.saveCurrentTemplate(this.sectie, this.currentTemplates)
    this.location.back()
  }

  test() {
    console.log(this.newActionTemplate)
  }

}
