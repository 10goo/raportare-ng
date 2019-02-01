import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-sec-iris2-detail',
  templateUrl: './sec-iris2-detail.component.html',
  styleUrls: ['./sec-iris2-detail.component.css']
})
export class SecIris2DetailComponent implements OnInit {
  actions;

  constructor(ds: GetDataService) {
    // Populate table
    this.actions = ds.generateMock(7);
  }

  ngOnInit() {
  }

}
