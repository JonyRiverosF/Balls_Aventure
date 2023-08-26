import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminLogrosPageRoutingModule } from './admin-logros-routing.module';

import { AdminLogrosPage } from './admin-logros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminLogrosPageRoutingModule
  ],
  declarations: [AdminLogrosPage]
})
export class AdminLogrosPageModule {}
