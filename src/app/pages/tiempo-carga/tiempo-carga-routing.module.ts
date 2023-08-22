import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiempoCargaPage } from './tiempo-carga.page';

const routes: Routes = [
  {
    path: '',
    component: TiempoCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiempoCargaPageRoutingModule {}
