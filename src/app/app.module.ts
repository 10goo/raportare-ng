import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel
import { HttpClientModule } from '@angular/common/http'

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatToolbarModule, MatTableModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecIrisDetailComponent } from './sec-iris-detail/sec-iris-detail.component';
import { SecIrisWeekComponent } from './sec-iris-week/sec-iris-week.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SecIrisDetailComponent,
    SecIrisWeekComponent,
    EditTableComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //Angular Material
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    DragDropModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule, 
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
