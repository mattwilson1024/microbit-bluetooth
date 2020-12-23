import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MicrobitComponent } from './microbit/microbit.component';

const routes: Routes = [
  {
    path: '',
    component: MicrobitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
