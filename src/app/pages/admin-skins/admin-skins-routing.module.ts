import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSkinsPage } from './admin-skins.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSkinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSkinsPageRoutingModule {}
