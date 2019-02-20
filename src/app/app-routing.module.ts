import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecIrisWeekComponent } from './sec-iris-week/sec-iris-week.component';
import { SecIrisDetailComponent } from './sec-iris-detail/sec-iris-detail.component';
import { EditTableComponent } from './edit-table/edit-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/iris-week/1', pathMatch: 'full' },
  { path: 'iris-week/:sectie', component: SecIrisWeekComponent },
  { path: 'iris-detail/:sectie/:data', component: SecIrisDetailComponent },
  { path: 'edit-table/:sectie', component: EditTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
