import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecIrisWeekComponent } from './sec-iris-week/sec-iris-week.component';
import { SecIrisDetailComponent } from './sec-iris-detail/sec-iris-detail.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'iris-week/:sectie', component: SecIrisWeekComponent, canActivate: [AuthGuardService], data: {expectedLevel: '1'} },
  { path: 'iris-detail/:sectie/:data', component: SecIrisDetailComponent, canActivate: [AuthGuardService], data: {expectedLevel: '1'} },
  { path: 'edit-table/:sectie', component: EditTableComponent, canActivate: [AuthGuardService], data: {expectedLevel: '3'} },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent },
];

const childRoutes: Routes = [
  { path: 'iris-week/:sectie', component: SecIrisWeekComponent, canActivate: [AuthGuardService], data: {expectedLevel: '1'} },
  { path: 'iris-detail/:sectie/:data', component: SecIrisDetailComponent, canActivate: [AuthGuardService], data: {expectedLevel: '1'} },
  { path: 'edit-table/:sectie', component: EditTableComponent, canActivate: [AuthGuardService], data: {expectedLevel: '3'} },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    // RouterModule.forChild(childRoutes),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
