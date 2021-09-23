import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubtractionRoutingModule } from './subtraction-routing.module';
import { SubtractionComponent } from './subtraction.component';

@NgModule({
  declarations: [SubtractionComponent],
  imports: [CommonModule, SharedModule, SubtractionRoutingModule],
})
export class SubtractionModule {}
