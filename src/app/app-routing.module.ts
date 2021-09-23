import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./pages/adition/adition.module').then((m) => m.AditionModule),
  },
  {
    path: 'subtract',
    loadChildren: () =>
      import('./pages/subtraction/subtraction.module').then(
        (m) => m.SubtractionModule
      ),
  },
  {
    path: 'multiply',
    loadChildren: () =>
      import('./pages/multiplication/multiplication.module').then(
        (m) => m.MultiplicationModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
