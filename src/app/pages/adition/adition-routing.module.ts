import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AditionComponent } from './adition.component';

const routes: Routes = [{ path: '', component: AditionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AditionRoutingModule {}
