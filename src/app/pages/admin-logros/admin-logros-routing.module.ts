import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLogrosPage } from './admin-logros.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLogrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLogrosPageRoutingModule {}
