import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioAdminPage } from './usuario-admin.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioAdminPageRoutingModule {}
