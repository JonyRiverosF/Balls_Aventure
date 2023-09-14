import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelDificilPage } from './nivel-dificil.page';

const routes: Routes = [
  {
    path: '',
    component: NivelDificilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelDificilPageRoutingModule {}
