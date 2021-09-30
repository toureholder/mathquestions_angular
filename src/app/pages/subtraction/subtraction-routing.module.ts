import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtractionComponent } from './subtraction.component';

const routes: Routes = [{ path: '', component: SubtractionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtractionRoutingModule {}
