import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionComponent } from './division.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DivisionComponent],
  imports: [CommonModule, DivisionRoutingModule, SharedModule],
})
export class DivisionModule {}
