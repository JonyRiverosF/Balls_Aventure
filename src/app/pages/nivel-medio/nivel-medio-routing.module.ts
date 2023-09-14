import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelMedioPage } from './nivel-medio.page';

const routes: Routes = [
  {
    path: '',
    component: NivelMedioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelMedioPageRoutingModule {}
