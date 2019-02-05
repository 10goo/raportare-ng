import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecIris2DetailComponent } from './sec-iris2-detail/sec-iris2-detail.component';
import { SecIris2WeekComponent } from './sec-iris2-week/sec-iris2-week.component';
import { SecIris3WeekComponent } from './sec-iris3-week/sec-iris3-week.component';
import { SecIris3DetailComponent } from './sec-iris3-detail/sec-iris3-detail.component';
import { EditTableComponent } from './edit-table/edit-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SecIris2DetailComponent,
    SecIris2WeekComponent,
    SecIris3WeekComponent,
    SecIris3DetailComponent,
    EditTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
