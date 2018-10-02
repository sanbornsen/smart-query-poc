import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartQueryModule } from './smart-query/smart-query.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SmartQueryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
