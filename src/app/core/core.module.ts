import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './layout/main/main.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavComponent, MainComponent, FooterComponent],
  imports: [
    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [
    // modules
    BrowserModule,
    BrowserAnimationsModule,

    // components
    MainComponent,
  ],
})
export class CoreModule {}
