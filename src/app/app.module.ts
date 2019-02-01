import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecIris2DetailComponent } from './sec-iris2-detail/sec-iris2-detail.component';
import { SecIris2WeekComponent } from './sec-iris2-week/sec-iris2-week.component';
import { SecIris3WeekComponent } from './sec-iris3-week/sec-iris3-week.component';
import { SecIris3DetailComponent } from './sec-iris3-detail/sec-iris3-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SecIris2DetailComponent,
    SecIris2WeekComponent,
    SecIris3WeekComponent,
    SecIris3DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
