import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiplicationComponent } from './multiplication.component';

const routes: Routes = [{ path: '', component: MultiplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiplicationRoutingModule {}
