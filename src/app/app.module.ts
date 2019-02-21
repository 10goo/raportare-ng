import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecIrisDetailComponent } from './sec-iris-detail/sec-iris-detail.component';
import { SecIrisWeekComponent } from './sec-iris-week/sec-iris-week.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SecIrisDetailComponent,
    SecIrisWeekComponent,
    EditTableComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
