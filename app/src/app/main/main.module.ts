import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FormComponent } from './form/form.component';
import { PopComponent } from './add/pop/pop.component';


@NgModule({
  declarations: [
    FormComponent,
    PopComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
