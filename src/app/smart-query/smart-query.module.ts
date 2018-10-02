import { SmartQueryService } from './smart-query.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartQueryComponent } from './smart-query/smart-query.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SmartQueryComponent],
  exports: [SmartQueryComponent],
  providers: [SmartQueryService]
})
export class SmartQueryModule { }
