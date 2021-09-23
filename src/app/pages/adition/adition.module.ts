import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AditionRoutingModule } from './adition-routing.module';
import { AditionComponent } from './adition.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AditionComponent],
  imports: [CommonModule, AditionRoutingModule, SharedModule],
})
export class AditionModule {}
