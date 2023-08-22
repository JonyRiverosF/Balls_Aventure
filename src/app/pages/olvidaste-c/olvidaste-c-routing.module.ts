import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidasteCPage } from './olvidaste-c.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidasteCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidasteCPageRoutingModule {}
