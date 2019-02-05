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
  keys;
  newActionTemplate = new AcModel();

  constructor(private route: ActivatedRoute, private data: GetDataService) { }

  ngOnInit() {
    this.sectie = this.route.snapshot.paramMap.get('sectie')
    this.keys = this.data.getTemplateData()
  }

  test() {
    console.log(this.newActionTemplate)
  }

}
