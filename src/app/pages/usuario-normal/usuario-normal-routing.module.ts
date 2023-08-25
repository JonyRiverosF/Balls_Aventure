import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioNormalPage } from './usuario-normal.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioNormalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioNormalPageRoutingModule {}
