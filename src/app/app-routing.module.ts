import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecIris2WeekComponent } from './sec-iris2-week/sec-iris2-week.component';
import { SecIris3WeekComponent } from './sec-iris3-week/sec-iris3-week.component';
import { SecIris2DetailComponent } from './sec-iris2-detail/sec-iris2-detail.component';
import { SecIris3DetailComponent } from './sec-iris3-detail/sec-iris3-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/iris2-week', pathMatch: 'full' },
  { path: 'iris2-week', component: SecIris2WeekComponent },
  { path: 'iris3-week', component: SecIris3WeekComponent },
  { path: 'iris2-detail', component: SecIris2DetailComponent },
  { path: 'iris3-detail', component: SecIris3DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
