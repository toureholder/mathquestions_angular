import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
})
export class ConfigModule {}
