import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecIrisWeekComponent } from './sec-iris-week/sec-iris-week.component';
import { SecIrisDetailComponent } from './sec-iris-detail/sec-iris-detail.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'iris-week/:sectie', component: SecIrisWeekComponent },
  { path: 'iris-detail/:sectie/:data', component: SecIrisDetailComponent },
  { path: 'edit-table/:sectie', component: EditTableComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
