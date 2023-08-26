import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSkinsPageRoutingModule } from './admin-skins-routing.module';

import { AdminSkinsPage } from './admin-skins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminSkinsPageRoutingModule
  ],
  declarations: [AdminSkinsPage]
})
export class AdminSkinsPageModule {}
