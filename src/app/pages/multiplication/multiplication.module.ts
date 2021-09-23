import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiplicationRoutingModule } from './multiplication-routing.module';
import { MultiplicationComponent } from './multiplication.component';

@NgModule({
  declarations: [MultiplicationComponent],
  imports: [CommonModule, SharedModule, MultiplicationRoutingModule],
})
export class MultiplicationModule {}
