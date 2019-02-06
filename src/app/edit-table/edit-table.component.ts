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
    this.keys = this.ds.getTemplateData()
    this.currentTemplates = this.ds.getCurrentTemplate('TODOsectie')
  }

  test() {
    console.log(this.newActionTemplate)
  }

}
