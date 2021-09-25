import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemRoutingModule } from './problem-routing.module';
import { ProblemComponent } from './problem.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProblemComponent],
  imports: [CommonModule, SharedModule, ProblemRoutingModule],
})
export class ProblemModule {}
