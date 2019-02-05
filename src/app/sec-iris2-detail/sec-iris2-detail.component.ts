import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sec-iris2-detail',
  templateUrl: './sec-iris2-detail.component.html',
  styleUrls: ['./sec-iris2-detail.component.css']
})
export class SecIris2DetailComponent implements OnInit {
  actions;
  date: string;

  constructor(private ds: GetDataService, private route: ActivatedRoute) {
    // Get date/id
    this.date = route.snapshot.paramMap.get('date')
    // Populate table
    this.actions = ds.getdataForDate(this.date);
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
