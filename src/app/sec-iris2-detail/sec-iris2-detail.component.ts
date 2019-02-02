import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-sec-iris2-detail',
  templateUrl: './sec-iris2-detail.component.html',
  styleUrls: ['./sec-iris2-detail.component.css']
})
export class SecIris2DetailComponent implements OnInit {
  actions;
  date;

  constructor(ds: GetDataService) {
    // Populate table
    this.actions = ds.generateMock(7);
    this.date = this.actions[0].data
  }

  ngOnInit() {
  }

  saveTable(): void {
    console.log('saving table...')
  }
  recalculate(ac): void {
    console.log('changed: ' + ac.cantitate.schimb_1)
  }
}
