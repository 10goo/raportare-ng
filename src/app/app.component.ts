import { Component } from '@angular/core';
import { Action } from './action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Iris 2';

  ac: Action = new Action('predare', 'proppmatt', 'fag', {schimb_1: 120} )

  ac2: Action = {
    tip: 'predare',
    produs: '',
    material: '',
    cantitate: {
      schimb_1: 200,
      schimb_2: 20
    }
  }

  constructor() {
    console.log(this.ac)
    console.log(this.ac2)
  }

  selected(target): void {
    console.log(target.value)
  }
}
