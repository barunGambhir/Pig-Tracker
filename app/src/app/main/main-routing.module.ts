import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { AddComponent } from './add/add.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: "add", component: AddComponent },
  { path: "showMap", component: MapComponent },
  { path: "form", component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
