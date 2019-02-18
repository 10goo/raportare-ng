import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { AcModel } from '../ac-model';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  sectie: string
  keys
  newActionTemplate = new AcModel()
  currentTemplates = []

  constructor(private route: ActivatedRoute, private ds: GetDataService) { }

  ngOnInit() {
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    this.getKeys()//this.keys = this.ds.getTemplateData()
    this.currentTemplates = this.ds.getCurrentTemplate('TODOsectie')
  }

  getKeys() {
    this.keys = this.ds.getTemplateData()
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
    this.currentTemplates.splice(i,1)
  }

  saveTemplate(): void {
    /*
      Send Template to Getdataservice forsaving   
    */
    this.ds.saveCurrentTemplate(this.sectie, this.currentTemplates)
  }

  test() {
    console.log(this.newActionTemplate)
  }

}
