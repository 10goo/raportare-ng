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
  currentTemplates

  constructor(private route: ActivatedRoute, private ds: GetDataService) { 
    
  }
  
  ngOnInit() {
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    this.getKeys()
    this.getCurrentTemplate(1)
  }

  getKeys() {
    this.ds.getTemplateData().subscribe((el) => {
      this.keys = el

    })
  }

  getCurrentTemplate(id_sectie){
    this.ds.getCurrentTemplate(id_sectie).subscribe((el: {template: Array<any>}) => {
      this.currentTemplates = JSON.parse(el.template[0])
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
